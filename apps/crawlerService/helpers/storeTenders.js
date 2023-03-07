import { TenderModel } from "../mongoose/schemasModels.js";
import nutsLookup from "./nutsLookup.js";

const extractAdditionalIDs = (tender) => {
  const { items } = tender.tender;
  const additionalIDs = [];
  if (items) {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].additionalClassifications) {
        const { additionalClassifications } = items[i];
        for (let j = 0; j < additionalClassifications.length; j += 1) {
          additionalIDs.push(additionalClassifications[j].id);
        }
      }
    }
  }
  return additionalIDs;
};

const constructLot = async (lot) => {
  let title = "Unavailable";
  let description = "Unavailable";
  let ID = "Unavailable";
  let duration = "Unavailable";
  let value = "Unavailable";
  let deliveryLocations = "Unavailable";

  if (lot.lot.title) {
    title = lot.lot.title;
  }
  if (lot.lot.description) {
    description = lot.lot.description;
  }
  if (lot.lot.id) {
    ID = lot.lot.id;
  }
  if (lot.lot.contractPeriod) {
    duration = `${lot.lot.contractPeriod.durationInDays} days`;
  }
  if (lot.lot.value) {
    console.log('lot is: ', lot);
    console.log('lot.lot.value', lot.lot.value);
    value = `${lot.value.currency} ${lot.value.amount}`;
  }
  if (lot.item.deliveryAddresses) {
    deliveryLocations = Promise.all(lot.item.deliveryAddresses.map(async (address) => {
      const lookup = await nutsLookup(address.region);
      console.log("lookup", lookup);
      return await lookup;
    }));
  }
  const returnValues = await Promise.all([title, description, ID, duration, value, deliveryLocations]);
  [ title, description, ID, duration, value, deliveryLocations ] = returnValues;
  const lotToReturn = {
    title,
    description,
    ID,
    duration,
    value,
    deliveryLocations,
  };
  return lotToReturn;
};

const constructLots = async (lots, items) => {
  const arrayToProcess = [];
  if (lots && items) {
    for (let i = 0; i < lots.length; i += 1) {
      arrayToProcess.push({ lot: lots[i], item: items[i] });
    }
  } else if (lots) {
    for (let i = 0; i < lots.length; i += 1) {
      arrayToProcess.push({ lot: lots[i], item: {} });
    }
  } else if (items) {
    for (let i = 0; i < items.length; i += 1) {
      arrayToProcess.push({ lot: {}, item: items[i] });
    }
  }

  let lotsToReturn = [];

  lotsToReturn = Promise.all(arrayToProcess.map(async (lot) => {
    const lotToReturn = await constructLot(lot);
    return lotToReturn;
  }));
  return lotsToReturn;
};

const tenderFactory = async (tender) => {
  console.log("tenderFactory! - tender", tender);
  const { ocid, id, tag } = tender;
  const date = new Date(tender.date).toLocaleDateString("en-GB");
  const fullDate = tender.date;
  const timestamp = new Date().toLocaleDateString("en-GB");
  const additionalIDs = extractAdditionalIDs(tender);
  const classificationIDs = [tender.tender.classification.id];
  for (let i = 0; i < additionalIDs.length; i += 1) {
    if (!classificationIDs.includes(additionalIDs[i])) {
      classificationIDs.push(additionalIDs[i]);
    }
  }

  let startDate = "";
  let endDate = "";
  if (tender.tender.awardPeriod) {
    startDate = new Date(tender.tender.awardPeriod.startDate).toLocaleString(
      "en-GB"
    );
  }
  if (tender.tender.tenderPeriod) {
    endDate = new Date(tender.tender.tenderPeriod.endDate).toLocaleDateString(
      "en-GB"
    );
  }
  let buyerURL = "Unavailable";
  let buyerProfile = "Unavailable";
  console.log("tender.tender.parties[0] is", tender.parties[0]);
  if (tender.parties[0].details) {
    if (tender.parties[0].details.buyerProfile) {
      buyerProfile = tender.parties[0].details.buyerProfile;
    }
    if (tender.parties[0].details.url) {
      buyerURL = tender.parties[0].details.url;
    }
  }

  const tenderToReturn = {
    ocid,
    id,
    date,
    fullDate,
    tag,
    timestamp,
    classificationIDs,
    tenderDetails: {
      title: tender.tender.title,
      classificationDescription: tender.tender.classification.description,
      tenderId: tender.tender.id,
      tenderStatus: tender.tender.status,
      description: tender.tender.description,
      lots: await constructLots(tender.tender.lots, tender.tender.items),
      startDate,
      endDate,
      submissionMethod: tender.tender.submissionMethod,
      submissionMethodDetails: tender.tender.submissionMethodDetails,
      links: tender.tender.links,
      buyer: {
        name: tender.buyer.name,
        contactPoint: tender.parties[0].contactPoint,
        details: {
          buyerProfile,
          buyerURL,
        },
      },
    },
  };

  if (tender.tender.communication) {
    tenderToReturn.tenderDetails.communication = tender.tender.communication;
  }
  return tenderToReturn;
};

const checkIfTenderExists = async (tenderID, model) => {
  const tenderExists = await model.find({ id: tenderID }).lean();
  console.log("checkIfTenderExists! - tenderExists: ", tenderExists);
  return tenderExists;
};

const storeTender = async (tender) => {
  console.log("storeTender! - tender", tender, "TenderModel", TenderModel);
  const tenderExists = await checkIfTenderExists(tender.id, TenderModel);
  if (tenderExists.length !== 0) {
    if (
      tenderExists &&
      tenderExists[0].tenderDetails.tenderStatus !==
        tender.tenderDetails.tenderStatus
    ) {
      const updatedTender = tenderExists[0];
      updatedTender.tenderDetails.updates.push(tender.tenderDetails);
      await TenderModel.deleteOne({ id: tender.id });
      let updatedTenderModel = new TenderModel(updatedTender);
      updatedTenderModel = await updatedTenderModel.save();
      return updatedTenderModel;
    }
    console.log("storeTender! - tender already exists, not storing");
    return false;
  }
  let model = new TenderModel(tender);
  model = await model.save();
  return model;
};

const storeTenders = async (tenders) => {
  console.log("storeTenders! - tenders", tenders);
  const storedTenders = Promise.all(
    tenders.map(async (tender) => {
      const tenderToStore = await tenderFactory(tender);
      console.log("tentderToStore", tenderToStore);
      const storedTender = await storeTender(tenderToStore);
      return storedTender;
    })
  );
  return await storedTenders;
};

export default storeTenders;

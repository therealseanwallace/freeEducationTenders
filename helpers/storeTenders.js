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

const constructLot = async (lot, item) => {
  let title = "Unavailable";
  let description = "Unavailable";
  let ID = "Unavailable";
  let duration = "Unavailable";
  let value = "Unavailable";
  let deliveryLocations = "Unavailable";
  if (lot.title) {
    title = lot.title;
  }
  if (lot.description) {
    description = lot.description;
  }
  if (lot.id) {
    ID = lot.id;
  }
  if (lot.contractPeriod) {
    duration = `${lot.contractPeriod.durationInDays} days`;
  }
  if (lot.value) {
    value = `${lot.value.currency} ${lot.value.amount}`;
  }
  if (item.deliveryAddresses) {
    deliveryLocations = await Promise.all(
      item.deliveryAddresses.map(async (address) => {
        const lookup = await nutsLookup(address.region);
        console.log("lookup", lookup);
        return lookup;
      })
    );
  }
  return {
    title,
    description,
    ID,
    duration,
    value,
    deliveryLocations,
  };
};

const constructLots = async (lots, items) => {
  const lotsToReturn = await Promise.all(
    lots.map(async (lot, index) => {
      const lotToReturn = await constructLot(lot, items[index]);
      return lotToReturn;
    })
  );

  return lotsToReturn;
};

const tenderFactory = async (tender) => {
  console.log("tenderFactory! - tender", tender);
  const { ocid, id, tag } = tender;
  const date = new Date(tender.date).toLocaleDateString("en-GB");
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
    startDate = new Date(tender.tender.awardPeriod.startDate).toLocaleString("en-GB");
  }
  if (tender.tender.tenderPeriod) {
    endDate = new Date(tender.tender.tenderPeriod.endDate).toLocaleDateString("en-GB");
  }

  const tenderToReturn = {
    ocid,
    id,
    date,
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
        details: tender.parties[0].details,
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
  console.log("storeTender! - tender", tender);
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
      const storedTender = await storeTender(tenderToStore);
      return storedTender;
    })
  );
  return storedTenders;
};

export default storeTenders;

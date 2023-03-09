import { TenderModel } from "../mongoose/schemasModels.js";
import nutsLookup from "./nutsLookup.js";

const extractAdditionalIDs = (tender) => {
  const { items } = tender.tender;
  const additionalIDs = [];
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].additionalClassifications) {
      const { additionalClassifications } = items[i];
      for (let j = 0; j < additionalClassifications.length; j += 1) {
        additionalIDs.push(additionalClassifications[j].id);
      }
    }
  }
  return additionalIDs;
};

const extractDeliveryAddresses = async (tender) => {
  const { items } = tender.tender;
  const deliveryAddresses = [];
  let deliveryLocations;
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].deliveryAddresses) {
      deliveryLocations = Promise.all(
        items[i].deliveryAddresses.map(async (deliveryLocation) => {
          let locationToReturn = {};
          locationToReturn = nutsLookup(deliveryLocation.region);
          return locationToReturn;
        })
      );
    }
  }
  return await deliveryLocations;
};

const tenderFactory = async (tender) => {
  let tenderToReturn;
  let buyer = tender.parties[0];
  const classificationIDs = [tender.tender.classification.id];
  const additionalIDs = extractAdditionalIDs(tender);
  for (let i = 0; i < additionalIDs.length; i += 1) {
    if (!classificationIDs.includes(additionalIDs[i])) {
      classificationIDs.push(additionalIDs[i]);
    }
  }
  const date = new Date(tender.date).toLocaleDateString("en-GB");
  const deliveryAddresses = await extractDeliveryAddresses(tender);
  const description = tender.tender.description;
  let endDate = "";
  if (tender.tender.tenderPeriod.endDate) {
    endDate = new Date(tender.tender.tenderPeriod.endDate).toLocaleDateString(
      "en-GB"
    );
  }
  const fullDate = tender.date;
  const id = tender.id;
  const ocid = tender.ocid;
  const parties = tender.parties;
  const source = tender.source;
  let submissionMethod;
  if (tender.tender.submissionMethodDetails) {
    if (tender.tender.submissionMethodDetails.startsWith("http")) {
      submissionMethod = {
        type: "url",
        value: tender.tender.submissionMethodDetails,
      };
    } else {
      submissionMethod = {
        type: "text",
        value: tender.tender.submissionMethodDetails,
      };
    }
  }
  const tag = tender.tag;
  const tenderId = tender.tender.id;
  const tenderStatus = tender.tender.status;
  const timestampRetrieved = new Date();
  const title = tender.tender.title;
  const value = tender.tender.value.amount + " " + tender.tender.value.currency;
  /*
  const { ocid, id, tag } = tender;
  const date = new Date(tender.date).toLocaleDateString("en-GB");
  const fullDate = tender.date;
  const timestampRetrieved = new Date().toLocaleDateString("en-GB");

  // Get the classifications of this tender and any lots
  const additionalIDs = extractAdditionalIDs(tender);
  const classificationIDs = [tender.tender.classification.id];
  for (let i = 0; i < additionalIDs.length; i += 1) {
    if (!classificationIDs.includes(additionalIDs[i])) {
      classificationIDs.push(additionalIDs[i]);
    }
  }

  // If the end date is available, add it to the tender else
  // add an empty string
  let endDate = "";
  if (tender.tender.tenderPeriod) {
    endDate = new Date(tender.tender.tenderPeriod.endDate).toLocaleDateString(
      "en-GB"
    );
  }
  
  // If the tender includes a submission method, get it and add
  // to the object to be returned
  let submissionMethod = {};
  if (tender.tender.submissionMethodDetails) {
    if (tender.tender.submissionMethodDetails.startsWith("http")) {
      submissionMethod = {
        type: "url",
        value: tender.tender.submissionMethodDetails,
      };
    } else {
      submissionMethod = {
        type: "text",
        value: tender.tender.submissionMethodDetails,
      };
    }
  }

  // If they are available, add the buyer's URL and profile to the
  // object to be returned
  let buyerURL = "";
  let buyerProfile = "";
  if (tender.parties[0].details) {
    if (tender.parties[0].details.buyerProfile) {
      buyerProfile = tender.parties[0].details.buyerProfile;
    }
    if (tender.parties[0].details.url) {
      buyerURL = tender.parties[0].details.url;
    }
  }
*/
  tenderToReturn = {
    buyer,
    classificationIDs,
    date,
    deliveryAddresses,
    description,
    endDate,
    fullDate,
    id,
    ocid,
    parties,
    source,
    submissionMethod,
    tag,
    tenderId,
    tenderStatus,
    timestampRetrieved,
    title,
    value,
  };
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

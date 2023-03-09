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
  const deliveryLocations = await Promise.all(
    items.map(async (item) => {
      console.log('item', item);
      let itemsLocations = [];
      if (item.deliveryAddresses) {
        itemsLocations = await Promise.all(
        item.deliveryAddresses.map(async (deliveryAddress) => {
        const locationToReturn = await nutsLookup(deliveryAddress);
        return locationToReturn;
      }));

      }
      return itemsLocations;
    })
  );
  return deliveryLocations;
};

const tenderFactory = async (tender) => {
  const buyer = tender.parties[0];
  const classificationIDs = [tender.tender.classification.id];
  const additionalIDs = extractAdditionalIDs(tender);
  for (let i = 0; i < additionalIDs.length; i += 1) {
    if (!classificationIDs.includes(additionalIDs[i])) {
      classificationIDs.push(additionalIDs[i]);
    }
  }
  const date = new Date(tender.date).toLocaleDateString("en-GB");
  const deliveryAddresses = await extractDeliveryAddresses(tender);
  const { description } = tender.tender;
  let endDate = "";
  if (tender.tender.tenderPeriod) {
    if (tender.tender.tenderPeriod.endDate) {
      endDate = new Date(tender.tender.tenderPeriod.endDate).toLocaleDateString(
        "en-GB"
      );
    }
    
  }
  const fullDate = tender.date;
  const { id, ocid, parties, source, tag } = tender;
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

  const tenderId = tender.tender.id;
  const tenderStatus = tender.tender.status;
  const timestampRetrieved = new Date();
  const { title } = tender.tender;
  let value = "";
  if (tender.tender.value) {
    value = `${tender.tender.value.amount} ${tender.tender.value.currency}`;
  }
 
  const tenderToReturn = {
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
  return tenderExists;
};

const storeTender = async (tender) => {
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
    return false;
  }
  let model = new TenderModel(tender);
  model = await model.save();
  return model;
};

const storeTenders = async (tenders) => {
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

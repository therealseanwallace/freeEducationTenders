import {
  TenderModel
} from "../mongoose/schemasModels.js";

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
}

const tenderFactory = (tender) => {
  console.log("tenderFactory! - tender", tender);
  const { ocid, id, date, tag, parties, buyer } = tender;
  const tenderId = tender.tender.id;
  const tenderStatus = tender.tender.status;
  const { title, description, lots, items } = tender.tender;
  const classificationIDs = [ tender.tender.classification.id, ...extractAdditionalIDs(tender) ];
  const classificationDescription = tender.tender.classification.description;
  let communication = false;
  const timestamp = Date.now();
  if (tender.tender.communication) {
    communication = tender.tender.communication;
  }
  return {
    ocid,
    id,
    date,
    tag,
    timestamp,
    tenderDetails: {
      tenderId,
      title,
      tenderStatus,
      classificationIDs,
      classificationDescription,
      description,
      lots,
      items,
      communication,
      parties,
      buyer,
    },
  };
};

const checkIfTenderExists = async (tenderID, model) => {
  const tenderExists = await model.find({ id: tenderID }).lean();
  // const tenderExists = await TenderModel.find({ id: tender.id }).lean();
  console.log("checkIfTenderExists! - tenderExists: ", tenderExists);
  if (tenderExists.length > 0) {
    return true;
  }
  return false;
};

const storeTender = async (tender) => {
  console.log("storeTender! - tender", tender);
  const tenderExists = await checkIfTenderExists(tender.id, TenderModel);
  if (tenderExists) {
    console.log("storeTender! - tender already exists, not storing");
    return false;
  }
  let model =  new TenderModel(tender);
  model = await model.save();
  return model
};

const storeTenders = async (tenders) => {
  console.log("storeTenders! - tenders", tenders);
  const storedTenders = [];
  for (let i = 0; i < tenders.length; i += 1) {
    const tender = tenderFactory(tenders[i]);
    // eslint-disable-next-line no-await-in-loop
    const storedTender = await storeTender(tender);
    storedTenders.push(storedTender);
  }
  return storedTenders;
};

export default storeTenders;

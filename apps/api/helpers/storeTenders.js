import {
  AdultModel,
  TrainingModel,
  PrimaryPreModel,
  SecondaryModel,
  HigherModel,
  YouthModel,
  SpecialModel,
  ELearningModel,
  DefenseModel,
  HealthModel,
  OtherModel,
} from "../mongoose/schemasModels.js";

import getModels from "./getModels.js";

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

const returnNewTenderModel = (model, tender) => {
  let newTender;
  switch (model) {
    case AdultModel:
      newTender = new AdultModel(tender);
      break;
    case TrainingModel:
      newTender = new TrainingModel(tender);
      break;
    case PrimaryPreModel:
      newTender = new PrimaryPreModel(tender);
      break;
    case SecondaryModel:
      newTender = new SecondaryModel(tender);
      break;
    case HigherModel:
      newTender = new HigherModel(tender);
      break;
    case YouthModel:
      newTender = new YouthModel(tender);
      break;
    case SpecialModel:
      newTender = new SpecialModel(tender);
      break;
    case ELearningModel:
      newTender = new ELearningModel(tender);
      break;
    case DefenseModel:
      newTender = new DefenseModel(tender);
      break;
    case HealthModel:
      newTender = new HealthModel(tender);
      break;
    case OtherModel:
      newTender = new OtherModel(tender);
      break;
    default:
      newTender = new OtherModel(tender);
      break;
  }
  return newTender;
}

const storeTender = async (tender) => {
  console.log("storeTender! - tender", tender);
  const models = getModels(tender.tenderDetails.classificationIDs);
  const tenderExists = await checkIfTenderExists(tender.id, models[0]);
  if (tenderExists) {
    console.log("storeTender! - tender already exists, not storing");
    return false;
  }
  const results = [];
  for (let i = 0; i < models.length; i += 1) {
    const newTender = returnNewTenderModel(models[i], tender);
    results.push(newTender.save());
  }
  return Promise.all(results);
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

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

import getModel from "./getModel.js";

const tenderFactory = (tender) => {
  console.log("tenderFactory! - tender", tender);
  const { ocid, id, date, tag, parties, buyer } = tender;
  const tenderId = tender.tender.id;
  const tenderStatus = tender.tender.status;
  const { title, description, lots, items } = tender.tender;
  const classificationID = tender.tender.classification.id;
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
      classificationID,
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



const checkIfTenderExists = async (tender, model) => {
  const tenderExists = await model.find({ id: tender.id }).lean();
  // const tenderExists = await TenderModel.find({ id: tender.id }).lean();
  console.log("checkIfTenderExists! - tenderExists: ", tenderExists);
  if (tenderExists.length > 0) {
    return true;
  }
  return false;
};

const storeTender = async (tender) => {
  console.log("storeTender! - tender", tender);
  const model = getModel(tender);
  const tenderExists = await checkIfTenderExists(tender, model);
  if (tenderExists) {
    console.log("storeTender! - tender already exists, not storing");
    return false;
  }
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
  const savedTender = await newTender.save();
  console.log("storeTender! - savedTender", savedTender);
  return savedTender;
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

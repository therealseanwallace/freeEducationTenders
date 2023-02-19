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

const IDsAndModels = {
  80400000: AdultModel,
  80000000: TrainingModel,
  80500000: TrainingModel,
  80100000: PrimaryPreModel,
  80110000: PrimaryPreModel,
  80200000: SecondaryModel,
  80210000: SecondaryModel,
  80211000: SecondaryModel,
  80212000: SecondaryModel,
  80300000: HigherModel,
  80430000: HigherModel,
  80310000: YouthModel,
  80340000: SpecialModel,
  80420000: ELearningModel,
  80600000: DefenseModel,
  80610000: DefenseModel,
  80620000: DefenseModel,
  80630000: DefenseModel,
  80640000: DefenseModel,
  80650000: DefenseModel,
  80660000: DefenseModel,
  80320000: HealthModel,
  80560000: HealthModel,
  80561000: HealthModel,
  80562000: HealthModel,
};

const getModel = (tender) => {
  const { classificationID } = tender.tenderDetails;
  const model = IDsAndModels[classificationID];
  if (!model) {
    return OtherModel;
  }
  return model;
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

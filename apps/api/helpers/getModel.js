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

export default getModel;
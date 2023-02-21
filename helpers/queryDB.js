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

const queryDB = async (category, page) => {
  let pageToUse = page;
  if (!pageToUse) {
    pageToUse = 0;
  }
  const model = getModel(category);
  try {
    const query = model.find({}).skip(page).limit(10);
    const tenders = await query.exec();
    return tenders;
  } catch (error) {
    console.log("queryDB! - error: ", error);
    return [];
  }
  
}

export default queryDB;
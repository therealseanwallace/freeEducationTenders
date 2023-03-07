import { AllTendersModel, AllEducationTendersModel } from "../mongoose/schemasModels.js";

// Takes two parameters - a list of tenders and
// a model to store them with
const storeFullTenders = async function(tenders, model) {
  let modelToUse;
  if (model === "AllTendersModel") {
    modelToUse = AllTendersModel;
  } else {
    modelToUse = AllEducationTendersModel;
  }
  const storedTenders = await modelToUse.insertMany(tenders);
  return storedTenders;
}

export default storeFullTenders;
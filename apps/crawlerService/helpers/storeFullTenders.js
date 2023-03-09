import { AllTendersModel, AllEducationTendersModel } from "../mongoose/schemasModels.js";

async function storeFullTenders(tenders, model) {
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
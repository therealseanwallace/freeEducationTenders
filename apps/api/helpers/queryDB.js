import { TenderModel } from "../mongoose/schemasModels.js";

const queryDB = async (categories, page) => {
  let pageToUse = page;
  if (!pageToUse) {
    pageToUse = 0;
  }
  const model = TenderModel;
  try {
    const promises = [];
    for (let i = 0; i < categories.length; i += 1) {
      const cat = categories[i].toString();
      const query = model.find({
         "classificationIDs": cat
      }
      );
      promises.push(query.exec());
    }
    return Promise.all(promises);
  } catch (error) {
    console.log("queryDB! - error: ", error);
    return [];
  }
};

export default queryDB;

// { "tenderDetails.classificationIDs": { $exists: true } })
import TenderModel from "../mongoose/schemasModels.js";

const queryDB = async (categories, page) => {
  let pageToUse = page;
  if (!pageToUse) {
    pageToUse = 0;
  }

  try {
    const options = {
      page: pageToUse,
      limit: 10,
      sort: { date: -1 },
    };

    const response = TenderModel.paginate({
      "classificationIDs": {
        "$in": categories
      }
    }, options, (err, result) => {
      if (err) {
        console.error("queryDB! - error: ", err);
        return [];
      }
      return result;
    });
    return response;
    
  } catch (error) {
    return [];
  }
};

export default queryDB;

import { TenderModel } from "../mongoose/schemasModels.js";

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

    const query = TenderModel.find({
      $or: [{ category: { $in: categories } }],
    });

    const response = TenderModel.paginate(query, options, (err, result) => {
      if (err) {
        console.log("queryDB! - error: ", err);
        return [];
      }
      return result;
    });
    return response;
  } catch (error) {
    console.log("queryDB! - error: ", error);
    return [];
  }
};

export default queryDB;

import express from "express";
import returnCategoriesArray from "../helpers/returnCategoriesArray.js";
import queryDB from "../helpers/queryDB.js";

const tenderRouter = express.Router();

tenderRouter.get("/category/:category/page/:page", async (req, res) => {
  const { category, page } = req.params;
  const catArray = returnCategoriesArray(category);
  const response = await queryDB(catArray, page);
  return res.json(response);
});

export default tenderRouter;
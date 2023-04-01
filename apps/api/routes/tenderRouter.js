import express from "express";
import returnCategoriesArray from "../helpers/returnCategoriesArray.js";
import queryDB from "../helpers/queryDB.js";

const tenderRouter = express.Router();

tenderRouter.get("/category/:category/page/:page/onlyShowActive/:onlyShowActive", async (req, res) => {
  const { category, page, onlyShowActive } = req.params;
  const catArray = returnCategoriesArray(category);
  const response = await queryDB(catArray, page, onlyShowActive);
  res.set("Cache-Control", "public, max-age=360");
  return res.json(response);
});

export default tenderRouter;
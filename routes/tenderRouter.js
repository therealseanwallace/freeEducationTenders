import express from "express";

const tenderRouter = express.Router();

tenderRouter.get("/category/:category/page/:page", async (req, res) => {
  const { category, page } = req.params;
  
});

export default tenderRouter;
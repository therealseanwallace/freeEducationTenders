import dotenv from "dotenv";
import mongoose from "mongoose";
import APICrawlerService from "./services/APICrawlerService.js";
import getDateTimeString from "./helpers/getDateTimeString.js";

dotenv.config();

const APICrawler = new APICrawlerService();

// Mongoose //

const { MONGO_URL } = process.env;
console.log("MONGO_URL", MONGO_URL);
mongoose.connect(MONGO_URL);
mongoose.connection.on("connected", () =>
  console.log(`${getDateTimeString()} - Connected`)
);
mongoose.connection.on("error", (err) =>
  console.log(`${getDateTimeString} - Mongoose connection failed. Error: `, err)
);

APICrawler.runJobs();

/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pkgSchedule from "node-schedule";
import getDateTimeString from "./helpers/getDateTimeString.js";
import getTenders from "./helpers/getTenders.js";
import storeTenders from "./helpers/storeTenders.js";
import APICrawlerService from "./services/APICrawlerService.js";
import tenderRouter from "./routes/tenderRouter.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/api/tenders/', tenderRouter);

app.use("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const APICrawler = new APICrawlerService();

// Mongoose //

const { MONGO_URL } = process.env;
console.log('MONGO_URL', MONGO_URL);

async function connect() {
  try {
    const connection = await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error.message);
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log('Connected to MongoDB');
    }
  }
}

connect();

// APICrawler.runJobs();
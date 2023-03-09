/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import dotenv from "dotenv";
import mongoose from "mongoose";
import APICrawlerService from "./services/APICrawlerService.js";

dotenv.config();

const APICrawler = new APICrawlerService();

// Mongoose //

const { MONGO_URL } = process.env;
console.log('MONGO_URL', MONGO_URL);
mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

APICrawler.runJobs();

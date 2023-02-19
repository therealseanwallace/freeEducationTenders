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


dotenv.config();

console.log('API Crawler Service:', APICrawlerService);

const APICrawler = new APICrawlerService();


/* **MONGOOSE** */

// Mongoose //

const { MONGO_URL } = process.env;
console.log('MONGO_URL', MONGO_URL);

async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error.message);
  } finally {
    console.log('Connected to MongoDB');
  }
}

connect();


APICrawler.runJobs();
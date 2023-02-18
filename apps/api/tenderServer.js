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
import getTenders from "./services/getTenders.js";
import storeTenders from "./services/storeTenders.js";

dotenv.config();

const runJobs = async () => {
  console.log(`${getDateTimeString()} - Running jobs...`);
  const retrievedTenders = await getTenders();
  console.log('retrievedTenders', retrievedTenders);
  storeTenders(retrievedTenders);

}

const { scheduleJob, RecurrenceRule, Range } = pkgSchedule;

const rule = new RecurrenceRule();
rule.hour = new Range(0, 23, 1);
rule.minute = 41;

// const jobsSchedule = scheduleJob(rule, runJobs);

runJobs();


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
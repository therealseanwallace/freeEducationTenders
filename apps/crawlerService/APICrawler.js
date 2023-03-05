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


/*
import pkgSchedule from "node-schedule";
import getTenders from "./helpers/getTenders.js";
import storeTenders from "./helpers/storeTenders.js";
import sortEducationTenders from "./helpers/sortEducationTenders.js";
import getDateTimeString from "./helpers/getDateTimeString.js";
import markRun from "./helpers/markRun.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Mongoose //

const { MONGO_URL } = process.env;
console.log('MONGO_URL', MONGO_URL);
let connection;

async function connect() {
  try {
    mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error.message);
  } finally {
    if (mongoose.connection.readyState === 1) {
    console.log('Connected to MongoDB. connection is', mongoose.connection.readyState);
    } else {
      console.log('Not connected to MongoDB. connection is', mongoose.connection.readyState);
    }
  }
}

connect();

import {
  AppStatusModel,
  CrawlerQueueModel,
} from "./mongoose/schemasModels.js";

const { scheduleJob, RecurrenceRule, Range } = pkgSchedule;

const rule = new RecurrenceRule();
rule.hour = new Range(0, 23, 1);
rule.minute = new Range(0, 59, 10);

class APICrawlerService {
  constructor() {
    console.log(`${getDateTimeString()} - Instantiating APICrawlerService...`);
    this.getTenders = getTenders.bind(this);
    this.storeTenders = storeTenders.bind(this);
    this.sortEducationTenders = sortEducationTenders.bind(this);
    this.jobsSchedule = scheduleJob(rule, this.runJobs.bind(this));
    this.appStatus = [];
    this.markRun = markRun.bind(this);
  }

  async runJobs() {
    console.log(`${getDateTimeString()} - Running jobs...`);

    // Check to see if this is the first run
    this.appStatus = await AppStatusModel.find({ name: "apiCrawler" }).lean();
    console.log("this.appStatus", this.appStatus);
    if (this.appStatus.length === 0) {
      this.appStatus = [{ firstRun: true }];
    }
    console.log("this.appStatus[0].firstRun", this.appStatus[0].firstRun);

    // If this isn't the first run...
    if (this.appStatus[0].firstRun !== true) {
      const DBCrawlerQueue = await CrawlerQueueModel.findOne({
        ID: "CrawlerQueue",
      }).lean();
      let tenders;
      console.log('DBCrawlerQueue', DBCrawlerQueue);
      if (!DBCrawlerQueue || !DBCrawlerQueue.URL) {
        // if the queue is empty, get the tenders from the last xx hours
        tenders = await this.getTenders();
      } else {
        // if the queue is not empty, get the queued URL
        tenders = await this.getTenders(DBCrawlerQueue.URL);
      }
      // Store the retrieved tenders
      const storedTenders = await this.storeTenders(tenders);
      console.log(
        `${getDateTimeString()} - ${
          tenders.length
        } tenders stored! Tenders are:`,
        storedTenders
      );
    } else {
      // This is the first run...
      await CrawlerQueueModel.create({ID: "CrawlerQueue", URL: null});
      let tenders;
      // This is the first run, so we will get the tenders from the last month
      // This will populate the queue with pages to crawl, depending on the results from the find a tender API
      const urlToUse = `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?updatedFrom=${getDateTimeString(
        true
      )}&updatedTo=${getDateTimeString()}`;
      tenders = await this.getTenders(urlToUse);
      // Store the retrieved tenders
      const storedTenders = await this.storeTenders(tenders);
      console.log(
        `${getDateTimeString()} - ${
          tenders.length
        } tenders stored! Tenders are:`,
        storedTenders
      );
      // Mark the app as having run
      if (this.appStatus[0].firstRun === true) {
        this.appStatus[0].firstRun = false;
        this.markRun();
      }
    }
  }
}

const APICrawler = new APICrawlerService();



APICrawler.runJobs();
*/
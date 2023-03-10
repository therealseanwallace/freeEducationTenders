/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import pkgSchedule from "node-schedule";
import getTenders from "../helpers/getTenders.js";
import storeTenders from "../helpers/storeTenders.js";
import sortEducationTenders from "../helpers/sortEducationTenders.js";
import getDateTimeString from "../helpers/getDateTimeString.js";
import markRun from "../helpers/markRun.js";

import {
  AppStatusModel,
  CrawlerQueueModel,
} from "../mongoose/schemasModels.js";


const { scheduleJob, RecurrenceRule, Range } = pkgSchedule;

const rule = new RecurrenceRule();
rule.hour = new Range(0, 23, 1);
rule.minute = new Range(0, 59, 6);

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
    if (this.appStatus.length === 0) {
      this.appStatus = [{ firstRun: true }];
    }
    console.log("this.appStatus[0].firstRun", this.appStatus[0].firstRun);

    
    let FindTenderServiceQueue;
    let ContractsFinderServiceQueue;
    if (this.appStatus[0].firstRun !== true) {
      // If this isn't the first run...
      FindTenderServiceQueue = await CrawlerQueueModel.findOne({
        ID: "FindTenderServiceQueue",
      }).lean();
      ContractsFinderServiceQueue = await CrawlerQueueModel.findOne({
        ID: "ContractsFinderServiceQueue",
      }).lean();
      let tenders;

      tenders = await this.getTenders(FindTenderServiceQueue.URL, ContractsFinderServiceQueue.URL, this.appStatus[0].lastRan);
      // Store the retrieved tenders
      const storedTenders = await this.storeTenders(tenders);
      console.log(
        `${getDateTimeString()} - ${
          tenders.length
        } tenders stored! Tenders are:`,
        storedTenders
      );
      this.markRun(new Date());
    } else {
      // This is the first run...
      await CrawlerQueueModel.create({
        ID: "FindTenderServiceQueue",
        URL: null,
      });
      await CrawlerQueueModel.create({
        ID: "ContractsFinderServiceQueue",
        URL: null,
      });
      let tenders;
      // This is the first run, so we will get the tenders from the last month
      // This will populate the queue with pages to crawl, depending on the results from the find a tender API
      const findTenderServiceURL = `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?updatedFrom=${getDateTimeString(
        true
      )}&updatedTo=${getDateTimeString()}`;
      const contractsFinderServiceURL = `https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?publishedFrom=${getDateTimeString(
        true
      )}&publishedTo=${getDateTimeString()}`;
      tenders = await this.getTenders(
        findTenderServiceURL,
        contractsFinderServiceURL,
        this.appStatus[0].lastRan
      );
      // Store the retrieved tenders
      const storedTenders = await this.storeTenders(tenders);
      console.log(
        `${getDateTimeString()} - ${
          tenders.length
        } tenders stored!`
      );
      // Mark the app as having run
      if (this.appStatus[0].firstRun === true) {
        this.appStatus[0].firstRun = false;
        const date = new Date();
        this.appStatus[0].lastRan = date;
        this.markRun(date);
      }
    }
  }
}

export default APICrawlerService;

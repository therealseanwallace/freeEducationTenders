import mongoose from "mongoose";

const { Schema } = mongoose;

const TenderSchema = new Schema({
  ocid: String,
  id: String,
  date: String,
  fullDate: String,
  tag: Array,
  timestamp: Date,
  classificationIDs: Array,
  tenderDetails: {
    title: String,
    classificationDescription: String,
    tenderId: String,
    tenderStatus: String,
    description: String,
    lots: Array,
    startDate: String,
    endDate: String,
    SubmissionMethod: Array,
    SubmissionMethodDetails: String,
    links: Array,
    buyer: {
      name: String,
      contactPoint: Object,
      details: Object,
    },
  },
});

const TenderModel = mongoose.model("Tenders", TenderSchema);

const AppStatus = new Schema({
  name: String,
  firstRun: Boolean,
});

const AppStatusModel = mongoose.model("AppStatus", AppStatus);

const CrawlerQueue = new Schema({
  URL: String,
  ID: String,
});

const CrawlerQueueModel = mongoose.model("CrawlerQueue", CrawlerQueue);

export {
  AppStatusModel,
  CrawlerQueueModel,
  TenderModel,
};

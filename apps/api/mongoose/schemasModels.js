import mongoose from "mongoose";

const { Schema } = mongoose;

const TenderSchema = new Schema({
  ocid: String,
  id: String,
  date: String,
  tag: Array,
  initiationType: String,
  timestamp: Date,
  tenderDetails: {
    title: String,
    tenderId: String,
    tenderStatus: String,
    classificationIDs: Array,
    classificationDescription: String,
    description: String,
    lots: Array,
    items: Array,
    communication: Object,
    parties: Array,
    buyer: Object,
  },
});

const TenderModel = mongoose.model("Tenders", TenderSchema);

const AppStatus = new Schema({
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

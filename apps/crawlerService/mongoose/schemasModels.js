import mongoose from "mongoose";

const { Schema } = mongoose;

const TenderSchema = new Schema({
  classificationIDs: Array,
  date: String,
  deliveryAddresses: Array,
  description: String,
  documents: Array,
  endDate: String,
  fullDate: String,
  id: String,
  ocid: String,
  parties: Array,
  source: String,
  submissionMethod: Object,
  tag: Array,
  tenderStatus: String,  
  timestampRetrieved: String,
  title: String,
  value: Object,
});

const TenderModel = mongoose.model("Tenders", TenderSchema);

const AppStatus = new Schema({
  name: String,
  firstRun: Boolean,
  lastRan: Date,
});

const AppStatusModel = mongoose.model("AppStatus", AppStatus);

const CrawlerQueue = new Schema({
  URL: String,
  ID: String,
});

const CrawlerQueueModel = mongoose.model("CrawlerQueue", CrawlerQueue);

const FullTenderSchema = new Schema({
  tender: Object,
});

const AllTendersModel = mongoose.model("AllTenders", FullTenderSchema);

const AllEducationTendersModel = mongoose.model("AllEducationTenders", FullTenderSchema);

export {
  AppStatusModel,
  CrawlerQueueModel,
  TenderModel,
  AllTendersModel,
  AllEducationTendersModel,
};

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
  value: Array,
  parties: Array,
  source: String,
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

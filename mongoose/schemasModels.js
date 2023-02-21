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
    classificationID: String,
    classificationDescription: String,
    description: String,
    lots: Array,
    items: Array,
    communication: Object,
    parties: Array,
    buyer: Object,
  },
});

// const TenderModel = mongoose.model("Tenders", TenderSchema);
const AdultModel = mongoose.model("Adult", TenderSchema);
const TrainingModel = mongoose.model("Training", TenderSchema);
const PrimaryPreModel = mongoose.model("PrimaryPre", TenderSchema);
const SecondaryModel = mongoose.model("Secondary", TenderSchema);
const HigherModel = mongoose.model("Higher", TenderSchema);
const YouthModel = mongoose.model("Youth", TenderSchema);
const SpecialModel = mongoose.model("Special", TenderSchema);
const ELearningModel = mongoose.model("ELearning", TenderSchema);
const DefenseModel = mongoose.model("Defense", TenderSchema);
const HealthModel = mongoose.model("Health", TenderSchema);
const OtherModel = mongoose.model("Other", TenderSchema);

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
  AdultModel,
  TrainingModel,
  PrimaryPreModel,
  SecondaryModel,
  HigherModel,
  YouthModel,
  SpecialModel,
  ELearningModel,
  DefenseModel,
  HealthModel,
  OtherModel,
  CrawlerQueueModel,
};

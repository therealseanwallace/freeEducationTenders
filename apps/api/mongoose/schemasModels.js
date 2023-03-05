import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

TenderSchema.plugin(mongoosePaginate);

const TenderModel = mongoose.model("Tenders", TenderSchema);

export default TenderModel;
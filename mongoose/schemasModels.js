import mongoose from "mongoose";

const { Schema } = mongoose;

const tenderSchema = new Schema({
  ocid: String,
  id: String,
  date: String,
  tag: String,
  initiationType: String,
  timestamp: Date,
  tenderDetails: {
    title: String,
    status: String,
    classificationID: String,
    classificationDescription: String,
    description: String,
    lots: Array,
    items: Array,
    communication: Object,
    parties: Array,
    buyer: Object,
  }
});

const WeatherModel = mongoose.model("Tenders", tenderSchema);

export default WeatherModel;
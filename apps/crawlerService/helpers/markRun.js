import { AppStatusModel } from "../mongoose/schemasModels.js";
import getDateTimeString from "./getDateTimeString.js";

const markRun = async (date) => {
  const appStatus = await AppStatusModel.find({ name: "apiCrawler" }).lean();
  if (appStatus.length === 0) {
    console.log(`${getDateTimeString()} - No app status found, creating one..."`);
    const newAppStatus = new AppStatusModel({
      name: "apiCrawler",
      firstRun: false,
      lastRan: date,
    });
    const newAppStatusSaved = await newAppStatus.save();
    console.log(`${getDateTimeString()} - New app status created!`, newAppStatusSaved);
    return newAppStatusSaved;
  }
  return AppStatusModel.findOneAndUpdate(
    { name: "apiCrawler" }, { lastRan: getDateTimeString(date) }
  );
};

export default markRun;

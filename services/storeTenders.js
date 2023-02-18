import TenderModel from '../mongoose/schemasModels.js';

const tenderFactory = (tender) => {
  const { ocid, date, tag, timestamp, tenderDetails } = tender;
  const { title, status, classificationID, classificationDescription, description, lots, items, communication, parties, buyer } = tenderDetails;
  return {
    ocid,
    date,
    tag,
    timestamp,
    tenderDetails: {
      title,
      status,
      classificationID,
      classificationDescription,
      description,
      lots,
      items,
      communication,
      parties,
      buyer,
    }
  }
}

const storeTender = async (tender) => {
  console.log('storeTender! - tender', tender);
  const newTender = new TenderModel(tender);
  await newTender.save();
}

const storeTenders = async (tenders) => {
  console.log('storeTenders! - tenders', tenders);
}
export default storeTenders;
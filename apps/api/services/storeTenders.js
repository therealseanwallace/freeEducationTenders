import TenderModel from '../mongoose/schemasModels.js';

const tenderFactory = (tender) => {
  console.log('tenderFactory! - tender', tender);
  const { ocid, id, date, tag, parties, buyer } = tender;
  const tenderId = tender.tender.id;
  const tenderStatus = tender.tender.status;
  const { title, description, lots, items } = tender.tender;
  const classificationID = tender.tender.classification.id;
  const classificationDescription = tender.tender.classification.description;
  let communication = false;
  const timestamp = Date.now();
  if (tender.tender.communication) {
    communication = tender.tender.communication;
  }
  return {
    ocid,
    id,
    date,
    tag,
    timestamp,
    tenderDetails: {
      tenderId,
      title,
      tenderStatus,
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
  const savedTender = await newTender.save();
  console.log('storeTender! - savedTender', savedTender);
  return savedTender;
}

const storeTenders = async (tenders) => {
  console.log('storeTenders! - tenders', tenders);
  const storedTenders = [];
  for (let i = 0; i < tenders.length; i += 1) {
    const tender = tenderFactory(tenders[i]);
    // eslint-disable-next-line no-await-in-loop
    const storedTender = await storeTender(tender);
    storedTenders.push(storedTender);
  }
  return storedTenders;
}

export default storeTenders;
import { TenderModel } from "../mongoose/schemasModels.js";

const extractAdditionalIDs = (tender) => {
  const { items } = tender.tender;
  const additionalIDs = [];
  if (items) {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].additionalClassifications) {
        const { additionalClassifications } = items[i];
        for (let j = 0; j < additionalClassifications.length; j += 1) {
          additionalIDs.push(additionalClassifications[j].id);
        }
      }
    }
  }
  return additionalIDs;
};

const tenderFactory = (tender) => {
  console.log("tenderFactory! - tender", tender);
  const { ocid, id, date, tag } = tender;
  const timestamp = Date.now();
  const classificationIDs = [
    tender.tender.classification.id,
    ...extractAdditionalIDs(tender),
  ];
  let startDate = "";
  let endDate = "";
  if (tender.tender.awardPeriod) {
    startDate = tender.tender.awardPeriod.startDate;
  }
  if (tender.tender.tenderPeriod) {
    endDate = tender.tender.tenderPeriod.endDate;
  }

  const tenderToReturn = {
    ocid,
    id,
    date,
    tag,
    timestamp,
    classificationIDs,
    tenderDetails: {
      title: tender.tender.title,
      classificationDescription: tender.tender.classification.description,
      tenderId: tender.tender.id,
      tenderStatus: tender.tender.status,
      description: tender.tender.description,
      lots: tender.tender.lots,
      items: tender.tender.items,
      communication: {},
      startDate,
      endDate,
      submissionMethod: tender.tender.submissionMethod,
      submissionMethodDetails: tender.tender.submissionMethodDetails,
      links: tender.tender.links,
      buyer: {
        name: tender.buyer.name,
        contactPoint: tender.parties[0].contactPoint,
        details: tender.parties[0].details,
      },
    },
  };

  if (tender.tender.communication) {
    tenderToReturn.tenderDetails.communication = tender.tender.communication;
  }
  return tenderToReturn;
};

const checkIfTenderExists = async (tenderID, model) => {
  const tenderExists = await model.find({ id: tenderID }).lean();
  console.log("checkIfTenderExists! - tenderExists: ", tenderExists);
  return tenderExists;
};

const storeTender = async (tender) => {
  console.log("storeTender! - tender", tender);
  const tenderExists = await checkIfTenderExists(tender.id, TenderModel);
  if (tenderExists.length !== 0) {
    if (tenderExists && tenderExists[0].tenderDetails.tenderStatus !== tender.tenderDetails.tenderStatus) {
      const updatedTender = tenderExists[0];
      updatedTender.tenderDetails.updates.push(tender.tenderDetails);
      await TenderModel.deleteOne({ id: tender.id });
      let updatedTenderModel = new TenderModel(updatedTender);
      updatedTenderModel = await updatedTenderModel.save();
      return updatedTenderModel;
  }
    console.log("storeTender! - tender already exists, not storing");
    return false;
  }
  let model = new TenderModel(tender);
  model = await model.save();
  return model;
};

const storeTenders = async (tenders) => {
  console.log("storeTenders! - tenders", tenders);
  const storedTenders = [];
  for (let i = 0; i < tenders.length; i += 1) {
    const tender = tenderFactory(tenders[i]);
    // eslint-disable-next-line no-await-in-loop
    const storedTender = await storeTender(tender);
    storedTenders.push(storedTender);
  }
  return storedTenders;
};

export default storeTenders;

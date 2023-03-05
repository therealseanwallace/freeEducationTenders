import getDateTimeString from "./getDateTimeString.js";
import { CrawlerQueueModel } from "../mongoose/schemasModels.js";

async function getTenders(url) {
  let urlToUse = url;
  if (!urlToUse) {
    urlToUse = `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?updatedFrom=${getDateTimeString(-0.22)}&updatedTo=${getDateTimeString()}`
  }
  let response;
  try {
    response = await fetch(urlToUse);
    const data = await response.json();
    if (data.links) {
      const queue = await CrawlerQueueModel.findOneAndUpdate({ ID: "CrawlerQueue" }, { $set: { URL: data.links.next } }).setOptions({ returnDocument: 'after' });
      console.log('Updated crawler queue. queue = ', queue);
      console.log('Updated crawler queue. Next URL: ', queue.URL);
    } else {
      console.log('No links in response. Clearing crawler queue.');
      await CrawlerQueueModel.findOneAndUpdate({ ID: "CrawlerQueue" }, { $set: { URL: null } }).setOptions({ returnDocument: 'after' });
    }
    const educationTenders = this.sortEducationTenders(data);
    console.log(`${getDateTimeString()} - got ${educationTenders.length} tenders.`);
    return educationTenders;
  } catch (error) {
    console.error(`${getDateTimeString()} - Error getting tenders: `, error.message);
  }
};

export default getTenders;

/* eslint-disable no-await-in-loop */
import getDateTimeString from "./getDateTimeString.js";
import { CrawlerQueueModel } from "../mongoose/schemasModels.js";
import storeFullTenders from "./storeFullTenders.js";

async function getTenders(crawlerQueue1, crawlerQueue2, lastRan) {
  let crawlerURL1 = crawlerQueue1;
  let crawlerURL2 = crawlerQueue2;
  let date = new Date();
  if (lastRan) {
    date = new Date(lastRan);
  } else {
    date.setMinutes(date.getMinutes() - 15);
  }
  const dateToISOString = date.toISOString().split(".")[0];

  if (!crawlerURL1) {
    crawlerURL1 = `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?updatedFrom=${dateToISOString}&updatedTo=${getDateTimeString()}`;
  }
  if (!crawlerURL2) {
    crawlerURL2 = `https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?publishedFrom=${dateToISOString}&publishedTo=${getDateTimeString()}`;
  }
  let response;
  try {
    const fetch1 = await fetch(crawlerURL1);
    const fetch2 = await fetch(crawlerURL2);
    const fetch1JSON = await fetch1.json();
    // Add source to the releases
    for (let i = 0; i < fetch1JSON.releases.length; i += 1) {
      const element = fetch1JSON.releases[i];
      element.source = "Find A Tender Service";
    }
    const fetch2JSON = await fetch2.json();
    for (let i = 0; i < fetch2JSON.releases.length; i += 1) {
      const element = fetch2JSON.releases[i];
      element.source = "Contracts Finder Service";
    }

    // We're going to loop through the responses
    response = [fetch1JSON, fetch2JSON];
    for (let i = 0; i < response.length; i += 1) {
      const data = response[i];
      // This whole conditional deals with the queues
      if (data.links) {
        if (i === 0) {
          await CrawlerQueueModel.findOneAndUpdate(
            { ID: "FindTenderServiceQueue" },
            { $set: { URL: data.links.next } }
          ).setOptions({ returnDocument: "after" });
        } else {
          await CrawlerQueueModel.findOneAndUpdate(
            { ID: "ContractsFinderServiceQueue" },
            { $set: { URL: data.links.next } }
          ).setOptions({ returnDocument: "after" });
        }
      } else {
        console.log(
          `${getDateTimeString()} - No links in response. Clearing crawler queue.`
        );
        if (i === 0) {
          CrawlerQueueModel.findOneAndUpdate(
            { ID: "FindTenderServiceQueue" },
            { $set: { URL: null } }
          ).setOptions({ returnDocument: "after" });
        } else {
          CrawlerQueueModel.findOneAndUpdate(
            { ID: "ContractsFinderServiceQueue" },
            { $set: { URL: null } }
          ).setOptions({ returnDocument: "after" });
        }
      }
    }
    let releases = [...fetch1JSON.releases, ...fetch2JSON.releases];
    releases = [...releases];

    // Prior to sending the education tenders to be sorted, we will
    // store ALL tenders in a separate DB collection for future use.
    storeFullTenders(releases, "AllTendersModel");

    const educationTenders = this.sortEducationTenders(releases);

    // Having sorted the education tenders, we will store the education
    // tenders as received from the APIs in a separate DB collection.

    storeFullTenders(educationTenders, "AllEducationTendersModel");

    console.log(
      `${getDateTimeString()} - got ${educationTenders.length} tenders.`
    );
    return educationTenders;
  } catch (error) {
    console.error(
      `${getDateTimeString()} - Error getting tenders: `,
      error.message
    );
  }
}

export default getTenders;

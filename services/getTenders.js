/* eslint-disable import/extensions */
/* eslint-disable no-console */
import getDateTimeString from "../helpers/getDateTimeString.js";

const getTenders = async () => {
  let response;
  try {
    response = await fetch(
      `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?updatedFrom=${getDateTimeString(-1)}&updatedTo=${getDateTimeString()}`,
    );
    console.log('response', await response.json());
  } catch (error) {
    console.error("Error getting tenders: ", error.message);
  }
};

export default getTenders;
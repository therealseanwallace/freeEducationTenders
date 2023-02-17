import getDateTimeString from "../helpers/getDateTimeString.js";
import sortEducationTenders from "./sortEducationTenders.js";

const getTenders = async () => {
  let response;
  try {
    response = await fetch(
      `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?updatedFrom=${getDateTimeString(-12)}&updatedTo=${getDateTimeString()}`,
    );
    const data = await response.json();
    const educationTenders = sortEducationTenders(data);
    return educationTenders;
  } catch (error) {
    console.error("Error getting tenders: ", error.message);
  }
};

export default getTenders;
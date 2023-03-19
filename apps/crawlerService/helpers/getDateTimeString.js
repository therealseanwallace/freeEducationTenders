const getDateTimeString = (offset) => {
  let date = new Date();
  if (offset === true) {
    // if offset is strictly equal to true, this is
    // the first run and we will retrieve the data
    // for the last month
    date.setMonth(date.getMonth() - 1);
  }
  if (typeof offset === "number") {
    // otherwise, if offset is a number of hours,
    // we will retrieve the data for the last x hours
    const unixTime = date.getTime();
    const fifteenMinutesAgo = unixTime + (offset * 60 * 60 * 1000);
    date = new Date(fifteenMinutesAgo);
  }
  // if neither of the above conditions are met,
  // we will simply return the current date and time
  const dateToISOString = date.toISOString().split(".")[0];
  return dateToISOString;
};

export default getDateTimeString;

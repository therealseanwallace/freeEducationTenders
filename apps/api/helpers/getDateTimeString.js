const getDateTimeString = (firstRun) => {
  const date = new Date();
  if (firstRun) {
    date.setMonth(date.getMonth() - 3);
  }
  return date.toISOString().split(".")[0];
}

export default getDateTimeString;
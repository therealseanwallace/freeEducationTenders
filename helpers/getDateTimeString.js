const getDateTimeString = (offset) => {
  const date = new Date();
  if (offset) {
    date.setHours(date.getHours() + offset);
  }
  return date.toISOString().split(".")[0];
}

export default getDateTimeString;
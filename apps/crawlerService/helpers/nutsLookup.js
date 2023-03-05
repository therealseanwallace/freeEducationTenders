import fs from "fs/promises";

const readFile = async (path) => {
  console.log('readFile! - path', path);
  console.log('process.cwd() is: ', process.cwd());
  const data = await fs.readFile(path, "utf8");
  const json = JSON.parse(data);
  return json;
};

const json = await readFile("./constants/nutsArraySorted.json");

const nutsBinarySearch = async (array, l, r, x) => {
  if (r >= l) {
    const mid = Math.floor(l + (r - l) / 2);
    if (array[mid].Code === x) {
      return array[mid];
    }
    if (array[mid].Code > x) {
      return nutsBinarySearch(array, l, mid - 1, x);
    }
    return nutsBinarySearch(array, mid + 1, r, x);
  }
  return -1;
};

const nutsLookup = async (query) => {
  let queryToUse = query;
  let result;
  if (queryToUse.startsWith("TL")) {
    queryToUse = `UK${queryToUse.slice(2)}`;
    result = await nutsBinarySearch(json, 0, json.length - 1, queryToUse);
    if (result === -1) {
      return { Code: query, Region: "Not found" };
    }
    return { Code: query, Region: result.Region };
  }
  result = await nutsBinarySearch(json, 0, json.length - 1, queryToUse);
  if (result === -1) {
    return { Code: query, Region: "Not found" };
  }
  console.log('nutsLookup! - result', result);
  return result;
};

export default nutsLookup;

import getTenders from "../services/getTenders";

describe("getTenders", () => {
  let tenders;
  it("should return an array of tenders", async () => {
    tenders = await getTenders();
    expect(Array.isArray(tenders)).toEqual(true);
  });
  it("If the array is not empty, the first item should have an ocid", () => {
    if (tenders.length > 0) {
      expect(tenders[0].ocid).toBeDefined();
    } else {
      expect(tenders.length).toEqual(0);
    }
  });
});
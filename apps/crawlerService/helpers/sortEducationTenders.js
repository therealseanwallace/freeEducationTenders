const filterEducationTenders = (tender) => {
  if (tender.tender.classification.id.startsWith("80")) return true;
  if (tender.tender.items) {
    for (let i = 0; i < tender.tender.items.length; i += 1) {
      if (tender.tender.items[i].additionalClassifications) {
        const { additionalClassifications } = tender.tender.items[i];
        if (additionalClassifications.length === 0) return false;
        for (let j = 0; j < additionalClassifications.length; j += 1) {
          if (additionalClassifications[j].id.startsWith("80")) return true;
          if (additionalClassifications[j].id === "79632000") return true;
        }
        return false;
      }
    }
  }
};

const sortEducationTenders = (releases) => {
  const filteredReleases = releases.filter(filterEducationTenders);
  return filteredReleases;
};

export default sortEducationTenders;

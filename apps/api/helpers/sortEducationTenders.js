const filterEducationTenders = (tender) => {
  if (tender.tender.classification.id.startsWith("80")) return true
}

const sortEducationTenders = (data) => data.releases.filter(filterEducationTenders);

export default sortEducationTenders;
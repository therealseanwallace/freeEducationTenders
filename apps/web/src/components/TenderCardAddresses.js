const TenderCardAddresses = ({ address }) => {
  const locations = [];
  console.log("tenderCardAddresses! address = ", address);
  address.forEach((element) => {
    console.log("element = ", element);
    if (!locations.includes(element)) {
      locations.push(...Object.values(element));
    }
  });

  console.log("locations = ", locations);

  return (
    <div className="tender-card-addresses">
      {locations.map((location, index) => {
        return <p className="location-tag">{location}</p>;
      })}
    </div>
  );
};

export default TenderCardAddresses;

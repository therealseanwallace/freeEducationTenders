import Collapsible from "react-collapsible";

const TenderCardLots = ({ lot }) => {
  console.log("tenderCardLots! lot = ", lot);
  console.log("lot.deliveryLocations = ", lot.deliveryLocations);
  let { ID, description, title, duration, value, deliveryLocations } = lot;
  const locationsMap = deliveryLocations.map((location, index) => {
    return (
      <div key={index} className="lot-locations">
        <h3 className="lot-location">Locations</h3>
        <p>Code: {location.Code}</p>
        <p>Name: {location.Region}</p>
        
      </div>
    );
  });
  return (
    <div className="tender-card-lots">
      <Collapsible trigger={`Lot: ${ID}`} className="lot-collapsible">
        <h3 className="lot-card-title">Title: {title}</h3>
        <div className="tender-card-locations-display">{locationsMap}</div>
        <h3 className="lot-card-duration">Duration: {duration}</h3>
        <h3 className="lot-card-value">Value: {value}</h3>
        <p className="lot-card-description">Description: {description}</p>
      </Collapsible>
    </div>
  );
};

export default TenderCardLots;

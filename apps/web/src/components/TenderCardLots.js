const TenderCardLots = ({ lot }) => {
  console.log('tenderCardLots! lot = ', lot);
  let { ID, description, title, duration, value } = lot;
  return (
    <div className="tender-card-lots">
      <h2 className="lot-card-id">{`Lot ${ID}`}</h2>
      <h3 className="lot-card-title">Title: {title}</h3>
      <h3 className="lot-card-description">Description: {description}</h3>
      <h3 className="lot-card-duration">Duration: {duration}</h3>
      <h3 className="lot-card-value">Value: {value}</h3>
    </div>
  );
};

export default TenderCardLots;

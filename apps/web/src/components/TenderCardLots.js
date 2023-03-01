const TenderCardLots = ({ lot }) => {
  console.log('tenderCardLots! lot = ', lot);
  let id, description, amount;

  return (
    <div className="tender-card-lots">
      <h2>Lots</h2>
      <h3 className="lot-detail">{JSON.stringify(lot)}</h3>
    </div>
  );
};

export default TenderCardLots;

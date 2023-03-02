import TenderCardLots from "./TenderCardLots";

const TenderCard = ({ tender }) => {
  console.log("tender card! tender = ", tender);
  return (
    <div className="tender-card">
      <h2 className="tender-card-title">{tender.tenderDetails.title}</h2>
      <h2 className="tender-card-buyer">{tender.tenderDetails.buyer.name}</h2>
      <h2 className="tender-card-date">{tender.date}</h2>
      <p className="tender-card-description">
        {tender.tenderDetails.description}
      </p>
      <div className="tender-card-lots-display">
        {tender.tenderDetails.lots.map((lot, index) => (
          <TenderCardLots key={index} lot={lot} />
        ))}
      </div>
      <a
        className="tender-card-buyer-profile-link"
        href={tender.tenderDetails.buyer.details.buyerProfile}
      >
        Buyer profile
      </a>
      <a
        className="tender-card-website-link"
        href={tender.tenderDetails.buyer.details.url}
      >
        Buyer website
      </a>
    </div>
  );
};

export default TenderCard;

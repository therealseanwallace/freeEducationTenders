import TenderCardLots from "./TenderCardLots";
import Collapsible from "react-collapsible";

const TenderCard = ({ tender }) => {
  console.log("tender card! tender = ", tender);
  return (
    <div className="tender-card">
      <h2 className="tender-card-title">{tender.tenderDetails.title}</h2>
      <h2 className="tender-card-buyer">{tender.tenderDetails.buyer.name}</h2>
      <h2 className="tender-card-date">Released: {tender.date}</h2>
      <p className="card-instructions">Click description/lots to expand</p>
      <Collapsible
        trigger={"Description"}
        className="description-collapsible"
      >
        {tender.tenderDetails.description}
      </Collapsible>
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

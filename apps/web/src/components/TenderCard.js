import TenderCardLots from "./TenderCardLots";
import Collapsible from "react-collapsible";

const TenderCard = ({ tender }) => {
  console.log("tender card! tender = ", tender);
  const tags = [];
  tags.push(tender.tenderDetails.tenderStatus);
  tags.push(...tender.tag);
  const tagsMap = tags.map((tag, index) => {
    let uniqueClass;
    switch (tag) {
      case "planning":
        uniqueClass = "planning";
        break;
      case "planned":
        uniqueClass = "planned";
        break;
      case "tender":
        uniqueClass = "tender";
        break;
      case "active":
        uniqueClass = "active";
        break;
      case "award":
        uniqueClass = "award";
        break;
      case "complete":
        uniqueClass = "complete";
        break;
      case "cancelled":
        uniqueClass = "cancelled";
        break;
      default:
        uniqueClass = "default";
        break;
    }
    return (
      <div key={index} className={`tag ${uniqueClass}`}>
        {tag}
      </div>
    );
  });
  return (
    <div className="tender-card">
      <h2 className="tender-card-title">{tender.tenderDetails.title}</h2>
      <h2 className="tender-card-buyer">{tender.tenderDetails.buyer.name}</h2>
      <div className="tender-card-links">
        <a href={tender.tenderDetails.buyer.details.buyerProfile} className="tender-card-button">
          <button className="tender-card-buyer-profile-link ">
            Buyer profile
          </button>
        </a>
        <a href={tender.tenderDetails.buyer.details.url} className="tender-card-button">
          <button className="tender-card-website-link">
            Buyer website
          </button>
        </a>
      </div>


      <h2 className="tender-card-date">Released: {tender.date}</h2>
      <div className="tags">
        <h2 className="tags-title">Tags:</h2>
        {tagsMap}
      </div>
      <hr />
      <p className="card-instructions">Click description/lots to expand</p>
      <Collapsible trigger={"Description"} className="description-collapsible">
        {tender.tenderDetails.description}
      </Collapsible>
      <div className="tender-card-lots-display">
        {tender.tenderDetails.lots.map((lot, index) => (
          <TenderCardLots key={index} lot={lot} />
        ))}
      </div>
    </div>
  );
};

export default TenderCard;

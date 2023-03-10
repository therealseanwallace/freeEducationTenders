import TenderCardAddresses from "./TenderCardAddresses";
import Collapsible from "react-collapsible";
import Parties from "./Parties";

const TenderCard = ({ tender }) => {
  console.log("tender card! tender = ", tender);
  const tags = [];
  tags.push(tender.tenderStatus);
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
  let buyerProfile = "";
  let buyerString = "";

  if (tender.submissionMethod) {
    if (tender.submissionMethod.type === "url") {
      buyerProfile = tender.submissionMethod.value;
    } else {
      buyerString = tender.submissionMethod.value;
    }
  }
  return (
    <div className="tender-card">
      <h2 className="tender-card-title">{tender.title}</h2>
      <h2 className="tender-card-buyer">{tender.parties[0].name}</h2>
      <div className="tender-card-links">
        <a href={buyerProfile} className="tender-card-button">
          <button className="tender-card-submission-link">
            Link to submission
          </button>
        </a>
      </div>
      <h2 className="tender-card-date">Released: {tender.date}</h2>
      <h2 className="end-date">End date: {tender.endDate}</h2>
      <div className="tags">
        <h2 className="tags-title">Tags:</h2>
        {tagsMap}
      </div>
      <div className="tender-card-delivery-addresses">
        {tender.deliveryAddresses.map((address, index) => (
          <TenderCardAddresses key={index} address={address} />
        ))}
      </div>
      <hr />
      <p className="card-instructions">Click description/lots to expand</p>
      <Collapsible trigger={"Description"} className="description-collapsible">
        {tender.description}
      </Collapsible>
      <Collapsible
        trigger={"Parties"}
        className="parties-collapsible"
        
      >
        <Parties parties={tender.parties}/>
      </Collapsible>
    </div>
  );
};

export default TenderCard;

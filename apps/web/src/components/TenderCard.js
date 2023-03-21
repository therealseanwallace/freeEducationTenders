import Collapsible from "react-collapsible";
import { v4 as uuidv4 } from "uuid";
import TenderCardAddresses from "./TenderCardAddresses";
import Parties from "./Parties";

const TenderCard = ({ tender }) => {
  const tags = [];
  tags.push(tender.tenderStatus);
  tags.push(...tender.tag);
  const tagsMap = tags.map((tag) => {
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
      <p key={uuidv4()} className={`tag ${uniqueClass}`}>
        {tag}
      </p>
    );
  });

  const generateSubmissionMethod = () => {
    if (tender.submissionMethod) {
      if (tender.submissionMethod.type === "url") {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              window.open(tender.submissionMethod.value);
            }}
            type="button"
          >
            Link to submission{" "}
            <span className="new-tab">{"(opens new tab)"}</span>
          </button>
        );
      }
      return (
        <p className="tender-card-submission-method-text">
          {tender.submissionMethod.value}
        </p>
      );
    }
    return "";
  };

  const generateEndDate = () => {
    if (tender.endDate) {
      return (
        <p className="tender-card-end-date">
          <span>End date:</span> {tender.endDate}
        </p>
      );
    }
    return "";
  };

  const generateValue = () => {
    if (tender.value) {
      return (
        <p className="tender-card-value">
          <span>Value:</span> {tender.value}
        </p>
      );
    }
    return "";
  };

  const returnCollapsibleButton = (content) => (
      <button className="collapsible-button" type="button">
        <p className="collapsible-button-text">{content}</p>
      </button>
    );

  return (
    <div className="tender-card">
      <div className="tender-card-upper">
        <h2 className="tender-card-title">{tender.title}</h2>
        <p className="tender-card-buyer">{tender.parties[0].name}</p>
        {generateValue()}
        {generateSubmissionMethod()}
        <p className="tender-card-date">
          <span>Released:</span> {tender.date}
        </p>
        {generateEndDate()}
        <div className="tags">
          <h2 className="tags-title">Tags: </h2>
          {tagsMap}
        </div>
        {<TenderCardAddresses addresses={tender.deliveryAddresses} />}
      </div>
      <hr />
      <p className="card-instructions">Click description/parties to expand</p>

      <Collapsible
        trigger={returnCollapsibleButton("Description")}
        className="description-collapsible"
      >
        {tender.description}
      </Collapsible>

      <Collapsible
        trigger={returnCollapsibleButton("Parties")}
        className="parties-collapsible"
      >
        <Parties parties={tender.parties} />
      </Collapsible>
    </div>
  );
};

export default TenderCard;

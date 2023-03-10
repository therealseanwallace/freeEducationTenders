import TenderCardAddresses from "./TenderCardAddresses";
import Collapsible from "react-collapsible";
import Parties from "./Parties";
import { v4 as uuidv4 } from "uuid";

const TenderCard = ({ tender }) => {
  console.log("tender card! tender = ", tender);
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

  const generateSubmissionMethod = (tender) => {
    if (tender.submissionMethod) {
      if (tender.submissionMethod.type === "url") {
        return (
          <a
            href={tender.submissionMethod.value}
            className="tender-card-submission-method-link"
          >
            <button className="tender-card-submission-link">
              Submission link
            </button>
          </a>
        );
      } else {
        return (
          <p className="tender-card-submission-method-text">
            {tender.submissionMethod.value}
          </p>
        );
      }
    } else {
      return "";
    }
  };

  const generateEndDate = (tender) => {
    if (tender.endDate) {
      return <p className="tender-card-end-date"><span>End date:</span> {tender.endDate}</p>;
    } else return "";
  };

  const generateValue = (tender) => {
    if (tender.value) {
      return (
        <p className="tender-card-value">
          <span>Value:</span> {tender.value}
        </p>
      );
    } else return "";
  };

  return (
    <div className="tender-card">
      <div className="tender-card-upper">
        <h2 className="tender-card-title">{tender.title}</h2>
        <p className="tender-card-buyer">{tender.parties[0].name}</p>
        {generateValue(tender)}
        {generateSubmissionMethod(tender)}
        <p className="tender-card-date">
          <span>Released:</span>{" "}
          {tender.date}
        </p>
        <p className="end-date">{generateEndDate(tender)}</p>
        <div className="tags">
          <h2 className="tags-title">Tags: </h2>
          {tagsMap}
        </div>
        {<TenderCardAddresses addresses={tender.deliveryAddresses} />}
      </div>
      <hr />
      <p className="card-instructions">Click description/lots to expand</p>
      <Collapsible trigger={"Description"} className="description-collapsible">
        {tender.description}
      </Collapsible>
      <Collapsible trigger={"Parties"} className="parties-collapsible">
        <Parties parties={tender.parties} />
      </Collapsible>
    </div>
  );
};

export default TenderCard;

/* <Collapsible trigger={"Parties"} className="parties-collapsible">
        <Parties
          parties={tender.parties.map((party) => {
            return (
              <div className="tender-card-party">
                <p className="tender-card-party-name" key={uuidv4()}>
                  {party.name}
                </p>
                <div className="tender-card-party-roles">
                  {party.roles.map((role) => {
                    return (
                      <p className="tender-card-party-role" key={uuidv4()}>
                        {role}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        />
      </Collapsible>
      */

import TenderCard from "./TenderCard";
import { v4 as uuidv4 } from "uuid";

const ResultsDisplay = (props) => {
  return (
    <div className="results-display">
      {props.tenders.map((tender) => (
        <TenderCard key={uuidv4()} tender={tender} />
      ))}
      <div className="load-more-container">
        <button className="getMore" onClick={props.getMore}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;

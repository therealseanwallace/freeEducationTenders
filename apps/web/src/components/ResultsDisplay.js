import TenderCard from "./TenderCard";
import { v4 as uuidv4 } from "uuid";
import loadingGif from "../assets/loading.gif";

const ResultsDisplay = (props) => {
  const returnLoadingIcon = () => {
    if (props.newDataRequested) {
      return (
        <div className="loading-icon-container">
          <img
            className="loading-icon"
            src={loadingGif}
            alt="Loading icon"
          />
        </div>
      );
    } else return "";
  }
  return (
    <div className="results-display">
      {props.tenders.map((tender) => (
        <TenderCard key={uuidv4()} tender={tender} />
      ))}
      <div className="load-more-container">
        {returnLoadingIcon()}
        <button className="getMore" onClick={props.getMore}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;

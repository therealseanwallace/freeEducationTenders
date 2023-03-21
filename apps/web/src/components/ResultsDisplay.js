import { v4 as uuidv4 } from "uuid";
import TenderCard from "./TenderCard";
import loadingGif from "../assets/loading.gif";

const ResultsDisplay = (props) => {
  const returnLoadingIcon = () => {
    if (props.newDataRequested) {
      return (
        <div className="loading-icon-container">
          <img className="loading-icon" src={loadingGif} alt="Loading icon" />
        </div>
      );
    }
    return "";
  };
  const returnLoadMoreButton = (firstUpdateReceived) => {
    if (firstUpdateReceived) {
      return (
        <button
          className="load-more-button"
          onClick={props.getMore}
          type="button"
        >
          Load more
        </button>
      );
    }
    return "";
  };
  return (
    <div className="results-display">
      {props.tenders.map((tender) => (
        <TenderCard key={uuidv4()} tender={tender} />
      ))}
      <div className="load-more-container">
        {returnLoadingIcon()}
        {returnLoadMoreButton(props.firstUpdateReceived)}
      </div>
    </div>
  );
};

export default ResultsDisplay;

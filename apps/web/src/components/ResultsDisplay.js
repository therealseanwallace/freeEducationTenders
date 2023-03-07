import TenderCard from "./TenderCard";

const ResultsDisplay = (props) => {
  return (
    <div className="results-display">
      {props.tenders.map((tender) => (
        <TenderCard key={tender._id} tender={tender} />
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

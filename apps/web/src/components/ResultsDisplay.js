import TenderCard from "./TenderCard";

const ResultsDisplay = (props) => {
  return (
    <div className="results-display">
      {props.tenders.map((tender) => (
        <TenderCard key={tender._id} tender={tender} />
      ))}
      <button className="getMore" onClick={props.getMore}>Load more</button>
    </div>
  );
}

export default ResultsDisplay;
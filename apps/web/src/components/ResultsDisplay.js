import TenderCard from "./TenderCard";

const ResultsDisplay = ({ tenders }) => {
  return (
    <div className="results-display">
      {tenders.map((tender) => (
        <TenderCard key={tender._id} tender={tender} />
      ))}
    </div>
  );
}

export default ResultsDisplay;
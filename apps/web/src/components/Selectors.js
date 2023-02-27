import categories from "../constants/categories.js";

const Selectors = () => {
  const categoryButtons = categories.map((category) => (
    <button className={`cat-button-${category}`}>{category}</button>
  ));

  return (
    <div className="selectors">
      <h3>Select categories</h3>
      {categoryButtons}
    </div>
  );
};

export default Selectors;

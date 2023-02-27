import categories from "../constants/categories.js";

const Selectors = (props) => {
  const categoryButtons = categories.map((category) => (
    <button className={`cat-button`} data-id={category.id} key={category.id} onClick={props.selectCategories} >{category.name}</button>
  ));

  return (
    <div className="selectors">
      <h3>Select categories</h3>
      {categoryButtons}
    </div>
  );
};

export default Selectors;

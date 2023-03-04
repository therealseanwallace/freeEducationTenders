import categories from "../constants/categories.js";
import CategoryButton from "./categoryButton.js";

const Selectors = (props) => {
  console.log('selectors! props = ', props);
  const categoryButtons = categories.map((category, index) => (
    <CategoryButton key={index} name={category.name} id={category.id} selectCategories={props.selectCategories} selectedCategories={props.selectedCategories}/>
  ));

  return (
    <div className="selectors">
      <h3>Select categories</h3>
      {categoryButtons}
      <button className="clear-cats" onClick={props.clearCategories}>Clear categories</button>
    </div>
  );
};

export default Selectors;

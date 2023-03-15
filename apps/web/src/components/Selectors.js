import categories from "../constants/categories.js";
import CategoryButton from "./categoryButton.js";
import { v4 as uuidv4 } from "uuid";

const Selectors = (props) => {
  console.log('selectors! props = ', props);
  const categoryButtons = categories.map((category) => (
    <CategoryButton key={uuidv4()} name={category.name} id={category.id} selectCategories={props.selectCategories} selectedCategories={props.selectedCategories}/>
  ));

  return (
    <div className="selectors">
      <h3>Click to select categories</h3>
      {categoryButtons}
      <button className="clear-cats" onClick={props.clearCategories}>Clear categories</button>
    </div>
  );
};

export default Selectors;

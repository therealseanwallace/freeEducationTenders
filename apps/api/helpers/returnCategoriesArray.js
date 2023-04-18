import categories from "../constants/categories.json" assert { type: "json" };

const returnCategoriesArray = (category) => {
  const catArray = categories[category];
  if (!catArray) return null;
  return catArray;
};

export default returnCategoriesArray;
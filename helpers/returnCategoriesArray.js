import categories from "../constants/categories.json" assert { type: "json" };

const returnCategoriesArray = (category) => categories[category];

export default returnCategoriesArray;
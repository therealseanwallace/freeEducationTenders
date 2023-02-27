import categories from '../constants/categories'

const getCategory = (id) => {
  console.log('categories is', categories);
  const category = categories.find((category) => category.id === Number(id));
  console.log('category', category);
  return category.name;
}

export default getCategory;

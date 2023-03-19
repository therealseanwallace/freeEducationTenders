import categories from '../constants/categories'

const getCategory = (id) => {
  const category = categories.find((category) => category.id === Number(id));
  return category.name;
}

export default getCategory;

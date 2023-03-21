import categories from '../constants/categories'

const getCategory = (id) => {
  const category = categories.find((cat) => cat.id === Number(id));
  return category.name;
}

export default getCategory;

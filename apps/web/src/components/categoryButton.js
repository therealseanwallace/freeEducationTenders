const CategoryButton = (props) => {
  if (props.selectedCategories.includes(props.id)) {
    return (
      <button
        className={`cat-button cat-button-selected`}
        data-id={props.id}
        key={props.id}
      >
        {props.name}
      </button>
    );
  }
  return (
    <button
      className={`cat-button`}
      data-id={props.id}
      key={props.id}
      onClick={props.selectCategories}
    >
      {props.name}
    </button>
  );
};

export default CategoryButton;

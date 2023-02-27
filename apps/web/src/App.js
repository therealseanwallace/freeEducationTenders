import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Selectors from "./components/Selectors";
import getCategory from "./helpers/getCategory";

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tenders, setTenders] = useState([]);

  const selectCategories = (e) => {
    console.log("e.target.dataset", e.target.dataset);
    const newCategory = {
      category: getCategory(e.target.dataset.id),
      id: Number(e.target.dataset.id),
      pageRetrieved: -1,
    };
    setSelectedCategories([...selectedCategories, newCategory]);
  };

  const fetchCategory = async (category) => {
    console.log('fetchCategory', category);
    const categoryTenders = await fetch(
      `http://localhost:3001/api/tenders/category/${category.category}/page/${category.pageRetrieved + 1}`,
      {
        method: 'GET',
        mode: 'cors',
      }
    );
    console.log('categoryTenders', categoryTenders);
    console.log('categoryTenders.json()', await categoryTenders.json());
  }

  const getTenders = () => {
    let foundUnretrievedCategory = false;
    const tendersArrayUpdated = tenders.map((tender) => tender);
    const categoriesUpdated = selectedCategories.map((category) => {
      if (foundUnretrievedCategory === false && category.pageRetrieved === -1) {
        fetchCategory(category);
      }
    });
  };

  useEffect(() => {
    console.log("selectedCategories", selectedCategories);
    const interval = setInterval(() => {
      getTenders();
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <header>
        <h1>Free Education Tenders</h1>
        <h2>
          Doggo ipsum mlem floofs borking doggo pats dat tungg tho heckin good
          boys shoober shibe
        </h2>
      </header>
      <main>
        <Selectors selectCategories={selectCategories} />
      </main>
    </div>
  );
};

export default App;

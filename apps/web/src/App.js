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
      pageRetrieved: 0,
      totalPages: 0,
    };
    setSelectedCategories([...selectedCategories, newCategory]);
  };

  const fetchCategory = async (category) => {
    console.log("fetchCategory", category);
    try {
      const categoryTenders = await fetch(
        `http://localhost:3001/api/tenders/category/${category.category}/page/${
          category.pageRetrieved + 1
        }`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      console.log("categoryTenders", categoryTenders);
      if (categoryTenders.status === 200) {
        return [await categoryTenders.json(), categoryTenders.status];
      }
      throw new Error(
        "Error fetching tenders",
        categoryTenders.status,
        categoryTenders.statusText
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getTenders = async () => {
    let foundUnretrievedCategory = false;
    const categoriesUpdated = selectedCategories.map((category) => category);
    for (let i = 0; i < categoriesUpdated.length; i++) {
      if (
        foundUnretrievedCategory === false &&
        categoriesUpdated[i].pageRetrieved === 0
      ) {
        const response = await fetchCategory(categoriesUpdated[i]);
        console.log("response", response);
        if (response[1] === 200) {
          foundUnretrievedCategory = true;
          setTenders([...tenders, ...response[0].docs]);
          categoriesUpdated[i].pageRetrieved += 1;
          setSelectedCategories(categoriesUpdated);
          
        }
      }
    }
  };

  useEffect(() => {
    console.log("selectedCategories", selectedCategories);
    const interval = setInterval(() => {
      getTenders();
    }, 2000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    console.log('tenders', tenders);
  }, [tenders]);

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

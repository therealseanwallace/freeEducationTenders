import { useState, useEffect } from "react";
import Selectors from "./components/Selectors";
import getCategory from "./helpers/getCategory";
import ResultsDisplay from "./components/ResultsDisplay";
import Footer from "./components/Footer";

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tenders, setTenders] = useState([]);

  const selectCategories = (e) => {
    for (let i = 0; i < selectedCategories.length; i++) {
      if (selectedCategories[i].id === Number(e.target.dataset.id)) {
        return;
      }
      if (selectedCategories[i].id === 0) {
        return;
      }
    }
    console.log("selectCategories! e is", e);
    console.log("e.target.dataset", e.target.dataset);
    console.log("e.target.classlist", e.target.classList);
    console.log('selectedCategories', selectedCategories);
    const newCategory = {
      category: getCategory(e.target.dataset.id),
      id: Number(e.target.dataset.id),
      pageRetrieved: 0,
      totalPages: 999999999,
      selected: true,
    };
    setSelectedCategories([...selectedCategories, newCategory]);
  };

  const fetchCategory = async (category) => {
    console.log("fetchCategory", category);
    try {
      const categoryTenders = await fetch(
        /*`http://localhost:3001/api/tenders/category/${category.category}/page/${
          category.pageRetrieved + 1
        }`,*/
        `https://dull-holiday-inhabitant.herokuapp.com/api/tenders/category/${category.category}/page/${category.pageRetrieved + 1}`,
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

  const clearCategories = () => {
    setSelectedCategories([]);
    setTenders([]);
  };

  let updatesRequested = 0;

  const checkTendersToAdd = (docs) => {
    const tendersToReturn = [];
    for (let i = 0; i < docs.length; i++) {
      let foundTender = false;
      for (let j = 0; j < tenders.length; j++) {
        if (docs[i]._id === tenders[j]._id) {
          foundTender = true;
        }
      }
      if (foundTender === false) {
        tendersToReturn.push(docs[i]);
      }
      
    }
    return tendersToReturn;
  }

  const getTenders = async () => {
    let foundUnretrievedCategory = false;
    const categoriesUpdated = selectedCategories.map((category) => category);
    for (let i = 0; i < categoriesUpdated.length; i++) {
      if (
        foundUnretrievedCategory === false &&
        categoriesUpdated[i].pageRetrieved < updatesRequested + 1 &&
        categoriesUpdated[i].pageRetrieved < categoriesUpdated[i].totalPages
      ) {
        const response = await fetchCategory(categoriesUpdated[i]);
        console.log("response", response);
        if (response[1] === 200) {
          console.log('response is valid');
          foundUnretrievedCategory = true;
          categoriesUpdated[i].totalPages = response[0].totalPages;
          const tendersToAdd = checkTendersToAdd(response[0].docs);
          console.log('tendersToAdd', tendersToAdd);
          setTenders([...tenders, ...tendersToAdd]);
          categoriesUpdated[i].pageRetrieved += 1;
          setSelectedCategories(categoriesUpdated);
        }
      }
    }
  };

  const getMore = () => {
    console.log("getMore");
    updatesRequested += 1;
  };

  useEffect(() => {
    console.log("selectedCategories", selectedCategories);
    const interval = setInterval(() => {
      getTenders();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <header>
        <h1 className="header-title">Just Education Tenders</h1>
        <h2 className="header-text">
        UK Education Tenders updated in real time - always free and no signup needed
        </h2>
      </header>
      <main>
        <Selectors
          selectCategories={selectCategories}
          selectedCategories={selectedCategories.map((category) => category.id)}
          clearCategories={clearCategories}
        />
        <ResultsDisplay tenders={tenders} getMore={getMore}/>
      </main>
      <Footer />
    </div>
  );
};

export default App;

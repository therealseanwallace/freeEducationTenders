import { useState, useEffect } from "react";
import Selectors from "./components/Selectors";
import getCategory from "./helpers/getCategory";
import ResultsDisplay from "./components/ResultsDisplay";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/privacyPolicy";
import CookieConsent from "react-cookie-consent";

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [updatesRequested, setUpdatesRequested] = useState(0);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const selectCategories = (e) => {
    for (let i = 0; i < selectedCategories.length; i++) {
      if (selectedCategories[i].id === Number(e.target.dataset.id)) {
        return;
      }
      if (selectedCategories[i].id === 0) {
        return;
      }
    }
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
    try {
      const categoryTenders = await fetch(
        /*`http://localhost:3001/api/tenders/category/${category.category}/page/${
          category.pageRetrieved + 1
        }`,*/
        `https://api.justeducationtenders.co.uk/api/tenders/category/${category.category}/page/${category.pageRetrieved + 1}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
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
  };

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
        if (response[1] === 200) {
          foundUnretrievedCategory = true;
          categoriesUpdated[i].totalPages = response[0].totalPages;
          const tendersToAdd = checkTendersToAdd(response[0].docs);
          setTenders([...tenders, ...tendersToAdd]);
          categoriesUpdated[i].pageRetrieved += 1;
          setSelectedCategories(categoriesUpdated);
        }
      }
    }
  };

  const getMore = () => {
    setUpdatesRequested(updatesRequested + 1);
  };

  const togglePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTenders();
    }, 1000);
    return () => clearInterval(interval);
  });

  if (showPrivacyPolicy) {
    return (
      <div className="App">
        <header>
          <h1 className="header-title">Just Education Tenders</h1>
          <h2 className="header-text">
            UK Education Tenders updated in real time - always free and no
            signup needed
          </h2>
        </header>
        <main>
          <PrivacyPolicy togglePrivacyPolicy={togglePrivacyPolicy} />
        </main>
        <Footer
          togglePrivacyPolicy={togglePrivacyPolicy}
          showPrivacyPolicy={showPrivacyPolicy}
        />
        <CookieConsent>
          This website uses essential cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}>
            <button onClick={togglePrivacyPolicy}>Hide privacy policy</button>
          </span>
        </CookieConsent>
      </div>
    );
  } else
    return (
      <div className="App">
        <header>
          <h1 className="header-title">Just Education Tenders</h1>
          <h2 className="header-text">
            UK Education Tenders updated in real time - always free and no
            signup needed
          </h2>
        </header>
        <main>
          <Selectors
            selectCategories={selectCategories}
            selectedCategories={selectedCategories.map(
              (category) => category.id
            )}
            clearCategories={clearCategories}
          />
          <ResultsDisplay tenders={tenders} getMore={getMore} />
        </main>
        <Footer
          togglePrivacyPolicy={togglePrivacyPolicy}
          showPrivacyPolicy={showPrivacyPolicy}
        />
        <CookieConsent>
          This website uses essential cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}>
            <button onClick={togglePrivacyPolicy}>Show privacy policy</button>
          </span>
        </CookieConsent>
      </div>
    );
};

export default App;

import { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import Selectors from "./components/Selectors";
import getCategory from "./helpers/getCategory";
import ResultsDisplay from "./components/ResultsDisplay";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/privacyPolicy";
import ToggleShowActive from "./components/ToggleShowActive";

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [firstUpdateReceived, setFirstUpdateReceived] = useState(false);
  const [updatesRequested, setUpdatesRequested] = useState(0);
  const [newDataRequested, setNewDataRequested] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [onlyShowActive, setOnlyShowActive] = useState(true);
  const [receivedAllUpdates, setReceivedAllUpdates] = useState(false);

  const selectCategories = (e) => {
    for (let i = 0; i < selectedCategories.length; i += 1) {
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
    setNewDataRequested(true);
    setSelectedCategories([...selectedCategories, newCategory]);
  };

  const fetchCategory = async (category) => {
    try {
      const categoryTenders = await fetch(
        `https://api.justeducationtenders.co.uk/api/tenders/category/${
          category.category
        }/page/${category.pageRetrieved + 1}/onlyShowActive/${onlyShowActive}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      /* const categoryTenders = await fetch(
        `http://localhost:3001/api/tenders/category/${category.category}/page/${
          category.pageRetrieved + 1
        }/onlyShowActive/${onlyShowActive}`
      ); */
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
    for (let i = 0; i < docs.length; i += 1) {
      let foundTender = false;
      for (let j = 0; j < tenders.length; j += 1) {
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
    for (let i = 0; i < categoriesUpdated.length; i += 1) {
      if (
        foundUnretrievedCategory === false &&
        categoriesUpdated[i].pageRetrieved < updatesRequested + 1 &&
        categoriesUpdated[i].pageRetrieved < categoriesUpdated[i].totalPages
      ) {
        // eslint-disable-next-line no-await-in-loop
        const response = await fetchCategory(categoriesUpdated[i]);
        if (response[1] === 200) {
          foundUnretrievedCategory = true;
          setFirstUpdateReceived(true);
          categoriesUpdated[i].totalPages = response[0].totalPages;
          const tendersToAdd = checkTendersToAdd(response[0].docs);
          setTenders([...tenders, ...tendersToAdd]);
          categoriesUpdated[i].pageRetrieved += 1;
          setSelectedCategories(categoriesUpdated);
          setNewDataRequested(false);
        }
      }
    }
  };

  const getMore = () => {
    for (let i = 0; i < selectedCategories.length; i += 1) {
      const category = selectedCategories[i];
      if (category.pageRetrieved < category.totalPages) {
        setUpdatesRequested(updatesRequested + 1);
        setNewDataRequested(true);
        return;
      } 
      if (i === selectedCategories.length - 1) {
        setReceivedAllUpdates(true);
      }
    }
  };

  const togglePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy);
  };

  const toggleOnlyShowActive = () => {
    setOnlyShowActive(!onlyShowActive);
    setTenders([]);
    setUpdatesRequested(0);
    setSelectedCategories([]);
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
          <ToggleShowActive
            toggleOnlyShowActive={toggleOnlyShowActive}
            onlyShowActive={onlyShowActive}
          />
          <PrivacyPolicy togglePrivacyPolicy={togglePrivacyPolicy} />
        </main>
        <Footer
          togglePrivacyPolicy={togglePrivacyPolicy}
          showPrivacyPolicy={showPrivacyPolicy}
        />
        <CookieConsent>
          This website uses essential cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}>
            <button onClick={togglePrivacyPolicy} type="button">
              Hide privacy policy
            </button>
          </span>
        </CookieConsent>
      </div>
    );
  }
  return (
    <div className="App">
      <header>
        <h1 className="header-title">Just Education Tenders</h1>
        <h2 className="header-text">
          UK Education Tenders updated in real time - always free and no signup
          needed
        </h2>
      </header>
      <main>
        <ToggleShowActive
          toggleOnlyShowActive={toggleOnlyShowActive}
          onlyShowActive={onlyShowActive}
        />
        <Selectors
          selectCategories={selectCategories}
          selectedCategories={selectedCategories.map((category) => category.id)}
          clearCategories={clearCategories}
        />
        <ResultsDisplay
          tenders={tenders}
          getMore={getMore}
          newDataRequested={newDataRequested}
          firstUpdateReceived={firstUpdateReceived}
          receivedAllUpdates={receivedAllUpdates}
        />
      </main>
      <Footer
        togglePrivacyPolicy={togglePrivacyPolicy}
        showPrivacyPolicy={showPrivacyPolicy}
      />
      <CookieConsent>
        This website uses essential cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}>
          <button onClick={togglePrivacyPolicy} type="button">
            Show privacy policy
          </button>
        </span>
      </CookieConsent>
    </div>
  );
}

export default App;

import { useState } from 'react';
import logo from "./logo.svg";
import "./App.css";
import Selectors from "./components/Selectors";

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const selectCategories = (category) => {
    // this will take a data attribute from the button, use that to get an array of category numbers,
    // and set the state to that array. we'll then query the backend to retrieve the applicable results
    // additionally, we will set rate limits on both the front and backend to limit the number of database queries
  };
  return (
    <div className="App">
      <header>
        <h1>Free Education Tenders</h1>
        <h2>Doggo ipsum mlem floofs borking doggo pats dat tungg tho heckin good boys shoober shibe</h2>
      </header>
      <main>
        <Selectors />

      </main>
    </div>
  );
}

export default App;

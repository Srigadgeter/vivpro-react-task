// external imports
import React, { useEffect, useState } from "react";

// internal imports
import Header from "./components/Header";
import SongsTable from "./components/SongsTable";

// styles
import "./App.css";

const App = () => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchData = (title = "") => {
    setLoader(true);
    const url = `http://localhost:8000/playlist${title ? `?title=${title}` : ""}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data >>", data);
        setRows(data);
      })
      .catch((error) => {
        console.error("Error >>", error);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => fetchData(), []);

  // Handler helps to record the changes of the search field
  const handleChange = ({ target: { value } }) => setSearchText(value);

  // Handler helps to fetch backend data based on searchText
  const handleSearch = () => {
    setIsSearched(true);
    fetchData(searchText);
  };

  // Handler helps to clear the search
  const handleClearSearch = () => {
    setSearchText("");
    if (isSearched) {
      setIsSearched(false);
      fetchData();
    }
  };

  return (
    <div className="App">
      <Header
        searchText={searchText}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      <SongsTable rows={rows} loader={loader} />
    </div>
  );
};

export default App;

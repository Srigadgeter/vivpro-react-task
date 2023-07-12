/* eslint-disable no-console */
// external imports
import React, { useEffect, useState } from "react";

// internal imports
import SongsTable from "./components/SongsTable";

// styles
import "./App.css";

const App = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/playlist`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data >>", data);
        setRows(data);
      })
      .catch((error) => {
        console.error("Error >>", error);
      });
  }, []);

  return (
    <div className="App">
      <SongsTable rows={rows} />
    </div>
  );
};

export default App;

// external imports
import React, { useEffect, useState } from "react";

// internal imports
import Header from "./components/Header";
import Toaster from "./components/Toaster";
import SongsTable from "./components/SongsTable";
import { TABLE_PAGE_SIZE } from "./utils/constants";

// styles
import "./App.css";

// App Component
const App = () => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageRows, setCurrentPageRows] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const [toastInfo, setToastInfo] = useState({});

  // Generic handler to set the current page number & data
  const setCurrentPageData = (data, page, pageSize) => {
    const startIndex = page ? page * pageSize : page;
    const endIndex = (page + 1) * pageSize;
    const currentRows = data.slice(startIndex, endIndex);
    setCurrentPage(page);
    setCurrentPageRows(currentRows);
  };

  // Generic handler to make api call to fetch data
  const fetchData = (title = "") => {
    setLoader(true);
    const url = `http://localhost:8000/playlist${title ? `?title=${title}` : ""}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        setCurrentPageData(data, currentPage, TABLE_PAGE_SIZE);
        setShowToaster(true);
        setToastInfo({
          variant: "success",
          message: "Data fetched successfully"
        });
      })
      .catch((error) => {
        console.error("Error >>", error);
        setShowToaster(true);
        setToastInfo({
          variant: "error",
          message: error?.message || "Something went wrong"
        });
      })
      .finally(() => setLoader(false));
  };

  // Fetch all data at App mounts
  useEffect(() => fetchData(), []);

  // Handler helps to record the changes of the search field
  const handleChange = ({ target: { value } }) => setSearchText(value);

  // Handler helps to fetch backend data based on searchText
  const handleSearch = () => {
    if (searchText) {
      setIsSearched(true);
      fetchData(searchText);
    }
  };

  // Handler helps to clear the search
  const handleClearSearch = () => {
    setSearchText("");
    if (isSearched) {
      setIsSearched(false);
      fetchData();
    }
  };

  // Handler helps to manipulate the data into csv format
  const convertToCSV = () => {
    if (Object.keys(currentPageRows).length > 0) {
      const header = Object.keys(currentPageRows[0]).join(",");
      const records = currentPageRows.map((record) =>
        Object.values(record)
          .map((value) => value)
          .join(",")
      );
      return [header, ...records].join("\n");
    }
    return "";
  };

  // Handler helps to download the csv file
  const handleDownload = () => {
    if (rows.length > 0) {
      const csvData = convertToCSV();
      const csvFile = new Blob([csvData], { type: "text/csv" });
      const csvURL = URL.createObjectURL(csvFile);

      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", `Page-${currentPage + 1}-Data.csv`);
      tempLink.click();
      setShowToaster(true);
      setToastInfo({
        variant: "success",
        message: "Data downloaded successfully"
      });
    }
  };

  // Handler helps to get pagination data & process the current page rows
  const handlePageChange = ({ page, pageSize }) => setCurrentPageData(rows, page, pageSize);

  // Handler helps to close the toaster
  const handleCloseToaster = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToaster(false);
  };

  return (
    <div className="App">
      <Header
        rows={rows}
        searchText={searchText}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleDownload={handleDownload}
        handleClearSearch={handleClearSearch}
      />
      <SongsTable rows={rows} loader={loader} handlePageChange={handlePageChange} />
      <Toaster
        open={showToaster}
        variant={toastInfo?.variant}
        message={toastInfo?.message}
        handleClose={handleCloseToaster}
      />
    </div>
  );
};

export default App;

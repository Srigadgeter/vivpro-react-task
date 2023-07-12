/* eslint-disable no-console */
// external imports
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "index", headerName: "Index" },
  { field: "id", headerName: "ID" },
  { field: "title", headerName: "Title" },
  { field: "danceability", headerName: "Danceability" },
  { field: "energy", headerName: "Energy" },
  { field: "mode", headerName: "Mode" },
  { field: "acousticness", headerName: "Acousticness" },
  { field: "tempo", headerName: "Tempo" },
  { field: "duration_ms", headerName: "Duration_ms" },
  { field: "num_sections", headerName: "Num_sections" },
  { field: "num_segments", headerName: "Num_segments" }
];

const SongsTable = () => {
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
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 }
        }
      }}
    />
  );
};

export default SongsTable;

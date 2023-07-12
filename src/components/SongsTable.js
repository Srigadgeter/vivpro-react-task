// external imports
import React from "react";
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

const SongsTable = ({ rows = [] }) => (
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

export default SongsTable;

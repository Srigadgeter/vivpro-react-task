// external imports
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, LinearProgress } from "@mui/material";

// internal imports
import { TABLE_PAGE_SIZE } from "../utils/constants";

const styles = {
  box: {
    height: 600
  }
};

const columns = [
  { field: "index", headerName: "Index" },
  { field: "id", headerName: "ID", width: 250 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "danceability", headerName: "Danceability" },
  { field: "energy", headerName: "Energy" },
  { field: "mode", headerName: "Mode" },
  { field: "acousticness", headerName: "Acousticness" },
  { field: "tempo", headerName: "Tempo" },
  { field: "duration_ms", headerName: "Duration_ms" },
  { field: "num_sections", headerName: "Num_sections" },
  { field: "num_segments", headerName: "Num_segments" }
];

// Songs Table
const SongsTable = ({ rows = [], loader = false, handlePageChange }) => (
  <Box sx={styles.box}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: TABLE_PAGE_SIZE }
        }
      }}
      pageSizeOptions={[TABLE_PAGE_SIZE]}
      slots={{
        loadingOverlay: LinearProgress
      }}
      loading={loader}
      onPaginationModelChange={handlePageChange}
    />
  </Box>
);

export default SongsTable;

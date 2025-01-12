import React from "react";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

// Header component styles
const styles = {
  stack: {
    m: 1
  },
  stack2: {
    width: "100%"
  },
  clearIcon: {
    cursor: "pointer"
  },
  getSongBtn: {
    minWidth: 120
  },
  downloadBtn: {
    minWidth: 250
  }
};

/**
 *
 * @param {array} rows - Table records
 * @param {string} searchText - Search context
 * @param {function} handleChange - Handler helps to track the search field changes
 * @param {function} handleSearch - Handler helps to trigger the search
 * @param {function} handleDownload - Handler helps to download the csv file for the current page data
 * @param {function} handleClearSearch - Handler helps to clear the search
 *
 */

// Header Component
const Header = ({
  rows = [],
  searchText = "",
  handleChange,
  handleSearch,
  handleDownload,
  handleClearSearch
}) => (
  <Stack direction="row" justifyContent="space-between" spacing={5} sx={styles.stack}>
    <Stack direction="row" spacing={1} sx={styles.stack2}>
      <TextField
        id="search-field"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchText && (
            <InputAdornment position="start">
              <ClearIcon onClick={handleClearSearch} sx={styles.clearIcon} />
            </InputAdornment>
          )
        }}
        size="small"
        placeholder="Search by title"
        value={searchText}
        onChange={handleChange}
        fullWidth
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleSearch}
        sx={styles.getSongBtn}
        disabled={!searchText}>
        Get Song
      </Button>
    </Stack>
    <Button
      color="primary"
      variant="contained"
      sx={styles.downloadBtn}
      onClick={handleDownload}
      endIcon={<DownloadIcon />}
      disabled={rows.length === 0}>
      Download page data
    </Button>
  </Stack>
);

export default Header;

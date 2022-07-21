import React, { useState, useMemo, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Paper, InputBase, IconButton } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import debouce from 'lodash.debounce';
import { filterSearch } from "../../features/file-slice"

export default function CustomizedInputBase() {
  const dispatch = useDispatch();
  const { docs } = useSelector(store => store.fileList);
  const [d, setDocs] = useState(docs);

  const [searchTerm, setSearchTerm] = useState("");

  let listToDisplay = docs;

  const handleChange = (e) => {
    console.log(docs)
    setSearchTerm(e.target.value);
  };


  if (searchTerm !== "") {
    listToDisplay = docs.filter((fruit) => {
      return fruit.name.includes(searchTerm);
    });

    dispatch(filterSearch(listToDisplay))
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });



  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', float: "right", width: 900 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        onChange={debouncedResults}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>

  );
}

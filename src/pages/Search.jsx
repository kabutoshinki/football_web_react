import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchPlayerComp from "../components/SearchPlayerComp";
const Search = () => {
  return (
    <div>
      <Navbar />
      <SearchPlayerComp />
    </div>
  );
};

export default Search;

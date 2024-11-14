import React, { useContext, useState } from "react";
import { SearchContext, useSearch } from "../SearchContext/SearchContext";

const InputNav = () => {
  const { searchNavbarFilter, setSearchNavbarFilter } = useSearch();
  const [helperFilter, sethelperFilter] = useState("");

  const handleSearchTermChange = (event) => {};

  const handleSearchButtonClick = () => {
    console.log("Searching for:", searchNavbarFilter);
    setSearchNavbarFilter(helperFilter);
  };

  return (
    <div>
      <input
        className="sm-12"
        type="text"
        value={helperFilter}
        onChange={(event) => sethelperFilter(event.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={handleSearchButtonClick}>Search</button>
    </div>
  );
};

export default InputNav;

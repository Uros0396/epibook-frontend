import { useContext } from "react";

import { SearchContext, useSearch } from "../SearchContext/SearchContext";

const InputBooks = () => {
  const { searchFantasyFilter, setSearchFantasyFilter } = useSearch();

  const handleInputChange = (event) => {
    setSearchFantasyFilter(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Fantasy Libriary"
        value={searchFantasyFilter}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputBooks;

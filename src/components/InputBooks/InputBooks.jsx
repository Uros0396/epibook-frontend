import { useContext } from "react";

import { SearchContext } from "../SearchContext/SearchContext";

const InputBooks = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Fantasy Libriary"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputBooks;

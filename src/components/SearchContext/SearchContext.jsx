import React, { createContext, useState, useContext } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchFantasyFilter, setSearchFantasyFilter] = useState("");
  const [searchNavbarFilter, setSearchNavbarFilter] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchFantasyFilter,
        setSearchFantasyFilter,
        searchNavbarFilter,
        setSearchNavbarFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainSezione from "../components/MainSection/MainSezione";
import { SearchContext } from "../components/SearchContext/SearchContext";
import { DarkContext } from "../contexts/DarkContext";

test("testing cards in MainSezione", () => {
  const mockSearchContextData = {
    searchTerm: "",
  };

  const mockDarkContextData = {
    darkMode: false,
  };

  const { container } = render(
    <DarkContext.Provider value={mockDarkContextData}>
      <SearchContext.Provider value={mockSearchContextData}>
        <MemoryRouter>
          <MainSezione />
        </MemoryRouter>
      </SearchContext.Provider>
    </DarkContext.Provider>
  );

  const cards = container.querySelectorAll(".bookCard");

  expect(cards).toHaveLength(10);
});

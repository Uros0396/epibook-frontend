import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CustomCard from "../components/CustomCard/CustomCard";

describe("CustomCard", () => {
  const mockBook = {
    asin: "12345",
    title: "Test Book",
    img: "http://example.com/image.jpg",
    category: "Fiction",
    price: "10.00",
  };

  test("renders book title", () => {
    render(
      <MemoryRouter>
        <CustomCard book={mockBook} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Test Book/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("applies border-danger class when selected", () => {
    const setSelectedBook = jest.fn();

    render(
      <MemoryRouter>
        <CustomCard
          book={mockBook}
          selectedBook={mockBook}
          setSelectedBook={setSelectedBook}
        />
      </MemoryRouter>
    );

    const cardElement = screen.getByRole("article");
    expect(cardElement).toHaveClass("border-danger");
  });

  test("does not apply border-danger class when not selected", () => {
    const setSelectedBook = jest.fn();

    render(
      <MemoryRouter>
        <CustomCard
          book={mockBook}
          selectedBook={null}
          setSelectedBook={setSelectedBook}
        />
      </MemoryRouter>
    );

    const cardElement = screen.getByRole("article");
    expect(cardElement).not.toHaveClass("border-danger");
  });

  test("calls setSelectedBook on click", () => {
    const setSelectedBook = jest.fn();

    render(
      <MemoryRouter>
        <CustomCard
          book={mockBook}
          selectedBook={null}
          setSelectedBook={setSelectedBook}
        />
      </MemoryRouter>
    );

    const cardElement = screen.getByRole("article");
    cardElement.click();

    expect(setSelectedBook).toHaveBeenCalledWith(mockBook);
  });
});

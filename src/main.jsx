import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkContextProvider } from "./contexts/DarkContext.jsx";
import { ReviewsProvider } from "./components/ReviewsContext/ReviewsContext.jsx";
import { PostReviewsProvider } from "./components/PostReviewsContext/PostReviewsContext.jsx";
import { SearchContextProvider } from "./components/SearchContext/SearchContext.jsx";
import { BookContextProvider } from "./contexts/BookContext.jsx";

createRoot(document.getElementById("root")).render(<p>test</p>);

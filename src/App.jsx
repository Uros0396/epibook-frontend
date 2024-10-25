{
  /*import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

import About from "./Pages/About";
import Browse from "./Pages/Browse";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Detail";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route exact path="/" element={<LoginPage />} />{" "}
        <Route path="/Home" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/Detail/:asin" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;*/
}

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import About from "./Pages/About";
import Browse from "./Pages/Browse";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Detail";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/Home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
        />
        <Route path="/About" element={<About />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/Detail/:asin" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

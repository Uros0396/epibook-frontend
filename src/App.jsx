import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import About from "./Pages/About";
import Browse from "./Pages/Browse";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Detail";
import { PrivateRoute } from "../middleware/PrivateRoute";
import Success from "./Pages/Success";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (token) {
      localStorage.setItem("token", token);
    }
    document.cookie = `token=;`;
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/success/" element={<Success />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Detail/:bookId" element={<Detail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import About from "./Pages/About";
import Browse from "./Pages/Browse";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Detail";
import { PrivateRoute } from "../middleware/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Detail/:asin" element={<Detail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

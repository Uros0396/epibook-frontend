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
import EntryPoint from "./Pages/EntryPoint";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<EntryPoint />} />
        <Route path="/success/:token" element={<Success />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/Detail/:bookId" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

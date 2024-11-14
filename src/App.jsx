import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Registration from "./Pages/Registration";
import MakeBook from "./Pages/MakeBook";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Detail";
import PrivateRoute from "../middleware/PrivateRoute";
import Success from "./Pages/Success";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/success" element={<Success />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/MakeBook" element={<MakeBook />} />
          <Route path="/Detail/:bookId" element={<Detail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

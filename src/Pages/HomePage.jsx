import React, { useEffect } from "react";
import MyNav from "../components/MyNav/MyNav";
import Welcome from "../components/Welcome/Welcome";
import MainSezione from "../components/MainSection/MainSezione";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <MyNav />
      <Welcome />
      <MainSezione />
      <Footer />
    </>
  );
};

export default HomePage;

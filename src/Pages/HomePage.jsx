import React from "react";
import MyNav from "../components/MyNav/MyNav";
import Welcome from "../components/Welcome/Welcome";
import MainSection from "../components/MainSection/MainSection";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <MyNav />
      <Welcome />
      <MainSection />
      <Footer />
    </>
  );
};

export default HomePage;

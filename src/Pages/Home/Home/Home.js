import React from "react";
import useTitle from "../../../hooks/useTitle";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";

const Home = () => {
  useTitle("Home");
  return (
    <div className="mx-5 mt-5">
      <Banner></Banner>
      <Categories></Categories>
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;

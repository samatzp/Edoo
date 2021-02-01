import React, { useState, useEffect } from "react";
import Layout from "./Layout2";
import { homeObjOne, homeObjThree } from './helper/Data';
import HeroSection from "./helper/HeroSection";

const Home = () => {

  return (
    <Layout>
      <div className="container mt-5">
        <HeroSection {...homeObjOne} />
        <HeroSection {...homeObjThree} />
      </div>
    </Layout>
  );
};

export default Home;

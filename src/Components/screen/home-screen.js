import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import Recipes from "../Recipes/Recipes";
import Layout from "../Layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <>
        <SearchInput></SearchInput>
      </>
    </Layout>
  );
};

export default HomePage;

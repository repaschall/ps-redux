import React from "react";
import Aside from "./Aside";
import Header from "./common/Header";
import Main from "./Main";

const Layout = () => {
  const mainStyle = {
    flexGrow: 1
  };

  return (
    <div className="app">
      <Aside />
      <div style={mainStyle}>
        <Header />
        <Main />
      </div>
    </div>
  );
};

export default Layout;

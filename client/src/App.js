import React from "react";
import Routes from "./core/Route";
import Footer from "./core/Footer/Footer";
const App = () => {
  return (
    <div>
      <div className="main">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;

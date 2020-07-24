import React from "react";
import HeaderComponent from "./components/Header";
require("bootstrap");

function App() {
  return (
    <div className="container-fluid">
      <HeaderComponent />
      <div className="container" id="body-wrapper">
        <div className="row">
          <div className="col-5 mx-auto">abc</div>
        </div>
      </div>
    </div>
  );
}

export default App;

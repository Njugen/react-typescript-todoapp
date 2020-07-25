import React from "react";
import HeaderComponent from "./components/Header";
import StatusSectionComponent from "./components/StatusSection";

function App() {
  return (
    <div className="container-fluid">
      <HeaderComponent />
      <div className="container" id="body-wrapper">
        <div className="row">
          <div className="col-4 mx-auto">
            <StatusSectionComponent text="todo-demo app is running!" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import HeaderComponent from "./components/Header";
import StatusSectionComponent from "./components/StatusSection";
import DateSelectorComponent from "./components/DateSelector";

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
        <div className="row">
          <div className="col-4 mx-auto">
            <DateSelectorComponent />
          </div>
        </div>
        <div className="row">
          <div className="col-8 mx-auto">abc</div>
        </div>
      </div>
    </div>
  );
}

export default App;

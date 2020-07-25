import React, { Component } from "react";
import "./../css/SingleLineForm.css";

interface StateRules {}

interface PropRules {}

class SingleLineFormComponent extends Component<PropRules, StateRules> {
  render = () => {
    return (
      <div className="date-selector-container">
        <form onSubmit={() => {}} className="oneline-form-container">
          <input type="text" />
          <button className="fas fa-calendar-day"></button>
        </form>
      </div>
    );
  };
}

export default SingleLineFormComponent;

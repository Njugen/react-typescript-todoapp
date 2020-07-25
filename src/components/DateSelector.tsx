import React, { Component } from "react";
import SingleLineFormComponent from "./SingleLineForm";

interface StateRules {}

interface PropRules {}

class DateSelectorComponent extends Component<PropRules, StateRules> {
  render = () => {
    return (
      <div className="date-selector-container">
        <SingleLineFormComponent />
      </div>
    );
  };
}

export default DateSelectorComponent;

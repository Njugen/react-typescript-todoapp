import React, { Component } from "react";
import IconComponent from "./Icon";
import "./../css/StatusSection.css";

interface StateRules {}

interface PropRules {
  text: string;
}

class StatusSectionComponent extends Component<PropRules, StateRules> {
  render = () => {
    const { text } = this.props;

    return (
      <div className="status-section-container">
        <IconComponent
          iconReference="fas fa-rocket"
          color="#fff"
          className="status-section-icon"
          size={50}
        />
        <div className="status-section-text-container">
          <span className="status-section-text">{text}</span>
        </div>
      </div>
    );
  };
}

export default StatusSectionComponent;

import React, { Component } from "react";
import IconComponent from "./Icon";
import "./../css/StatusSection.css";

/*
  StatusSection.tsx

  This component renders the status section, with a rocket icon and a status text.
  As for now, there is no feature which would change the status text. That text is static for now, but can be
  replaced with a dynamic text if relevant features are added to the app
*/

interface PropRules {
  text: string;
}

class StatusSectionComponent extends Component<PropRules, {}> {
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

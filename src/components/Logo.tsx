import React, { Component } from "react";
import IconComponent from "./Icon";
import "./../css/Logo.css";

interface StateRules {}

interface PropRules {
  text: string;
}

class LogoComponent extends Component<PropRules, StateRules> {
  handleIconClick: (event: React.MouseEvent) => void = (event) => {
    console.log("Logo has been clicked");
  };

  render = () => {
    const { text } = this.props;
    const iconSize: number = 30;

    return (
      <div id="logo-section">
        <IconComponent
          iconReference="far fa-calendar-alt"
          size={iconSize}
          color="#801717"
          onClick={this.handleIconClick}
          id="logo-image"
        />
        <span id="logo-text" style={{ marginLeft: iconSize + 10 + "px" }}>
          {text}
        </span>
      </div>
    );
  };
}

export default LogoComponent;

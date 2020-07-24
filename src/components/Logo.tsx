import React, { Component } from "react";
import IconComponent from "./Icon";
import "./../css/Logo.css";

interface StateRules {}

interface PropRules {}

class LogoComponent extends Component<PropRules, StateRules> {
  handleIconClick: (event: React.MouseEvent) => void = (event) => {
    console.log("Logo has been clicked");
  };

  render = () => {
    return (
      <div id="logo-section">
        <IconComponent iconReference="blabla" onClick={this.handleIconClick} />
        <span id="logo-text">Welcome</span>
      </div>
    );
  };
}

export default LogoComponent;

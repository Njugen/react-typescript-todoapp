import React, { Component } from "react";
import IconComponent from "./Icon";

interface StateRules {}

interface PropRules {}

class LogoComponent extends Component<PropRules, StateRules> {
  render = () => {
    return (
      <div id="logo-section">
        <IconComponent />
        <span>Welcome</span>
      </div>
    );
  };
}

export default LogoComponent;

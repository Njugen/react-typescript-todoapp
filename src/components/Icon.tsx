import React, { Component } from "react";

interface StateRules {}

interface PropRules {}

class IconComponent extends Component<PropRules, StateRules> {
  render = () => {
    return (
      <div>
        <div></div>
      </div>
    );
  };
}

export default IconComponent;

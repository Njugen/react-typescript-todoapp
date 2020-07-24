import React, { Component } from "react";

interface StateRules {}

interface PropRules {
  // The CSS needed in order for an icon image to show up
  iconReference: string;

  // on
  onClick?: (event: React.MouseEvent) => void;
}

class IconComponent extends Component<PropRules, StateRules> {
  render = () => {
    const { iconReference, onClick: onClickRaise } = this.props;

    return <button className={iconReference} onClick={onClickRaise}></button>;
  };
}

export default IconComponent;

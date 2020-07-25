import React, { Component } from "react";
import "./../css/Icon.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

interface StateRules {}

interface PropRules {
  // The CSS class needed in order for an icon image to show up
  iconReference: string;

  // The size of the icon in pixels (optional)
  size?: number;

  // The hexadecimal string of a color (optional)
  color?: string;

  // A string representing one or more classes, for e.g. further CSS modifications (optional)
  // Example: "element test-element child-element"
  className?: string;

  // A string representing the id of this object.
  id?: string;

  // on
  onClick?: (event: React.MouseEvent) => void;
}

type DynamicIconStyle = {
  fontSize: string;
  color: string;
  cursor?: string;
};

class IconComponent extends Component<PropRules, StateRules> {
  // If the id props has any empty space, remove those
  private removeEmptySpace: (input: string) => string = (input) => {
    return input.trim();
  };

  private getDynamicIconStyle: () => DynamicIconStyle = () => {
    const { size, color, onClick: onClickRaise } = this.props;

    return {
      fontSize: (size || 20) + "px",
      color: color || "#000",
      cursor: onClickRaise && "pointer",
    };
  };

  render = () => {
    const { iconReference, className, id, onClick: onClickRaise } = this.props;

    return (
      <span
        className={"icon-component " + iconReference + " " + className}
        style={this.getDynamicIconStyle()}
        onClick={onClickRaise}
        id={id && this.removeEmptySpace(id)}
      ></span>
    );
  };
}

export default IconComponent;

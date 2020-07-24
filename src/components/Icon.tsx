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

class IconComponent extends Component<PropRules, StateRules> {
  // If the id props has any empty space, remove those
  removeEmptySpace: (input: string) => string = (input) => {
    return input.trim();
  };

  render = () => {
    const {
      iconReference,
      size,
      color,
      className,
      id,
      onClick: onClickRaise,
    } = this.props;

    const fontSize: string = (size || 120) + "px";
    const fontColor: string = color || "#000";

    const iconPointer = onClickRaise ? "icon-enable-hover-pointer" : "";

    return (
      <span
        className={
          "icon-component " +
          iconReference +
          " " +
          className +
          " " +
          iconPointer
        }
        style={{ fontSize, color: fontColor }}
        onClick={onClickRaise}
        id={id && this.removeEmptySpace(id)}
      ></span>
    );
  };
}

export default IconComponent;

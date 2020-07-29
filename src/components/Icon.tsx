import React, { Component } from "react";
import "./../css/Icon.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { DynamicIconStyle } from "./../misc/customTypes";

interface PropRules {
  // The CSS class needed in order for an icon image to show up (fontawesome icons)
  iconReference: string;

  // The size of the icon in pixels. (optional)
  size?: number;

  // The hexadecimal string of a color. E.g. #000000 (optional)
  color?: string;

  // A string representing one or more classes, for e.g. further CSS modifications (optional)
  // Example: "element test-element child-element"
  className?: string;

  // A string representing the id of this object (HTML id attribute). (optional)
  id?: string;

  // Triggers when this component is clicked, and provides mouse event to the function triggered
  onClick?: (event: React.MouseEvent) => void;
}

class IconComponent extends Component<PropRules, {}> {
  // If the input string has any empty spaces, remove them and return the new string. In handy for e.g. HTML id attributes
  private removeEmptySpace: (input: string) => string = (input) => {
    return input.trim();
  };

  // Return an icon style object based on the size, color and onClick props.
  private getDynamicIconStyle: () => DynamicIconStyle = () => {
    const { size, color, onClick: onClickRaise } = this.props;

    return {
      fontSize: (size || 20) + "px",
      color: color || "#000",
      cursor: onClickRaise && "pointer",
    };
  };

  render = () => {
    const {
      iconReference,
      className,
      id,

      // Renaming onClick to onClickRaise to indicate the click gets noticed by the component parent
      // This is not necessary, but is done just to avoid confustion
      onClick: onClickRaise,
    } = this.props;

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

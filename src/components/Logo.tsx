import React, { Component } from "react";
import IconComponent from "./Icon";
import "./../css/Logo.css";
import { DynamicLogoTextStyle } from "./../misc/customTypes";

interface PropRules {
  text: string; // The text to the right of the icon component
  onClick?: (event: React.MouseEvent) => void; // Meant to be placed in onClick prop of the icon component, and triggers when the icon is clicked
}

class LogoComponent extends Component<PropRules, {}> {
  // Return the style of the logo text based on the size of the icon and based on the availbility of onClick prop
  private getDynamicLogoTextStyle: (
    iconSize: number
  ) => DynamicLogoTextStyle = (iconSize) => {
    const { onClick: onClickRaise } = this.props;

    return {
      marginLeft: iconSize + 10 + "px", // Set the marginLeft property based on the icon size
      cursor: typeof onClickRaise === "function" ? "pointer" : "default", // If there is an onClick prop function, change the cursor to pointer
    };
  };

  render = () => {
    const {
      text,
      onClick: onClickRaise, // Rename onClick prop to onClickRaise to indicate the function passes data to parent
    } = this.props;
    const iconSize: number = 30;

    return (
      <div id="logo-section">
        <IconComponent
          iconReference="far fa-calendar-alt"
          size={iconSize}
          color="#801717"
          onClick={onClickRaise}
          id="logo-image"
        />
        <span
          id="logo-text"
          onClick={onClickRaise}
          style={this.getDynamicLogoTextStyle(iconSize)}
        >
          {text}
        </span>
      </div>
    );
  };
}

export default LogoComponent;

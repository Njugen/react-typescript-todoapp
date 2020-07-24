import React, { Component } from "react";
import IconComponent from "./Icon";
import "./../css/Logo.css";

interface StateRules {}

interface PropRules {
  text: string;
  onClick?: (event: React.MouseEvent) => void;
}

type DynamicLogoTextStyle = {
  marginLeft: string;
  cursor?: string;
};

class LogoComponent extends Component<PropRules, StateRules> {
  private getDynamicLogoTextStyle: (size: number) => DynamicLogoTextStyle = (
    size
  ) => {
    const { onClick: onClickRaise } = this.props;

    return {
      marginLeft: size + 10 + "px",
      cursor: onClickRaise && "pointer",
    };
  };

  render = () => {
    const { text, onClick: onClickRaise } = this.props;
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

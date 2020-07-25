import React, { Component } from "react";
import LogoComponent from "./Logo";
import "./../css/Header.css";
import IconComponent from "./Icon";

interface StateRules {}

interface PropRules {}

class HeaderComponent extends Component<PropRules, StateRules> {
  private handleLogoClick: (event: React.MouseEvent) => void = (event) => {
    console.log("Logo vas clicked");
  };

  private handleTwitterIconClick: (event: React.MouseEvent) => void = (
    event
  ) => {
    window && window.open("http://twitter.com", "_blank");
  };

  render = () => {
    return (
      <div className="row" id="header">
        <div className="col-auto mr-auto" id="headerbar-left-side">
          <LogoComponent
            text="Welcome to my app"
            onClick={this.handleLogoClick}
          />
        </div>
        <div className="col-4" id="headerbar-right-side">
          <IconComponent
            iconReference="fab fa-twitter"
            size={25}
            color="#ffffff"
            onClick={this.handleTwitterIconClick}
            id="twitter-icon"
          />
        </div>
      </div>
    );
  };
}

export default HeaderComponent;

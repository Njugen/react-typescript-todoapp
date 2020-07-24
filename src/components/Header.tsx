import React, { Component } from "react";
import LogoComponent from "./Logo";
import "./../css/Header.css";

interface StateRules {}

interface PropRules {}

class HeaderComponent extends Component<PropRules, StateRules> {
  private handleClick: (event: React.MouseEvent) => void = (event) => {
    console.log("Logo vas clicked");
  };

  render = () => {
    return (
      <div className="row" id="header">
        <div className="col-auto mr-auto">
          <LogoComponent text="Welcome to my app" onClick={this.handleClick} />
        </div>
        <div className="col-4 pull-right">abc</div>
      </div>
    );
  };
}

export default HeaderComponent;

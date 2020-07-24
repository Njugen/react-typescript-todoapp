import React, { Component } from "react";
import LogoComponent from "./Logo";
import "./../css/Header.css";

interface StateRules {}

interface PropRules {}

class HeaderComponent extends Component<PropRules, StateRules> {
  render = () => {
    return (
      <div className="row" id="header">
        <div className="col-auto mr-auto">
          <LogoComponent />
        </div>
        <div className="col-4">abc</div>
      </div>
    );
  };
}

export default HeaderComponent;

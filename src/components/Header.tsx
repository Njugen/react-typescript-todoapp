import React, { Component } from "react";
import LogoComponent from "./Logo";
import "./../css/Header.css";
import IconComponent from "./Icon";

class HeaderComponent extends Component<{}, {}> {
  // Event handler for the twitter icon component. Trigger this when the icon is clicked
  private handleTwitterIconClick: (event: React.MouseEvent) => void = (
    event
  ) => {
    // Open twitter.com in a new window
    window && window.open("http://twitter.com", "_blank");
  };

  render = () => {
    return (
      <div className="row" id="header">
        <div className="col-auto mr-auto" id="headerbar-left-side">
          <LogoComponent text="Welcome to my app" />
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

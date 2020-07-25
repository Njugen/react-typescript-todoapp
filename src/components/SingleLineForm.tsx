import React, { Component } from "react";
import "./../css/SingleLineForm.css";

interface StateRules {
  inputValue: string;
}

interface PropRules {
  value: string;
  onButtonClick: (event: React.FormEvent) => void;
}

class SingleLineFormComponent extends Component<PropRules, StateRules> {
  state = {
    inputValue: this.props.value || "",
  };

  handleTextInputChange: (event: React.FormEvent<HTMLInputElement>) => void = (
    event
  ) => {
    this.setState({ inputValue: event.currentTarget.value });
  };

  render = () => {
    const { onButtonClick: onButtonClickRaise } = this.props;
    const { inputValue } = this.state;

    return (
      <form className="singleline-form-container row">
        <input
          type="text"
          className="singleline-form-text-input col-11"
          value={inputValue}
          onChange={this.handleTextInputChange}
        />
        <button
          className="fas fa-calendar-day singleline-form-submit-button"
          onClick={onButtonClickRaise}
        ></button>
      </form>
    );
  };
}

export default SingleLineFormComponent;

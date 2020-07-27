import React, { Component } from "react";
import "./../css/SingleLineForm.css";

interface StateRules {
  inputValue: string;
}

interface PropRules {
  value: string;
  placeholder?: string;
  buttonText?: string;
  buttonIconReference?: string;
  onButtonClick: (event: React.FormEvent, inputValue: string) => void;
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
    const {
      onButtonClick: onButtonClickRaise,
      buttonText,
      buttonIconReference,
      placeholder,
    } = this.props;
    const { inputValue } = this.state;

    return (
      <form className="singleline-form-container row">
        <input
          type="text"
          className="singleline-form-text-input col-11"
          value={inputValue}
          placeholder={placeholder}
          onChange={this.handleTextInputChange}
        />
        <button
          className={
            buttonIconReference + " singleline-form-submit-button col-1"
          }
          onClick={(e) => onButtonClickRaise(e, inputValue)}
        >
          {buttonText || ""}
        </button>
      </form>
    );
  };
}

export default SingleLineFormComponent;

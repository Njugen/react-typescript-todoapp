import React, { Component } from "react";
import "./../css/SingleLineForm.css";

interface StateRules {
  inputValue: string; // Current value of the text input field. Changes as soon as user types something in the field
}

interface PropRules {
  value: string; // value of the text input field, provided by the parent component
  onButtonClick: (event: React.FormEvent, inputValue: string) => void; // Triggers when the user clicks the component's button. Raises the parameters to parent.
  placeholder?: string; // Default text to show the user if no value exists in the text input field (optional)
  buttonText?: string; // The text to show on the component's button. Use either this or buttonIconReference, but preferaböu not both. (optional)
  buttonIconReference?: string; // CSS-class representing a fontawesome icon. Change this to change the icon. (optional)
}

class SingleLineFormComponent extends Component<PropRules, StateRules> {
  state = {
    inputValue: this.props.value || "",
  };

  /* 
    Event handler, to be triggered when the user types any text value into the component's input field.
    That text is saved to the state, in order to rerender the component so that the <input>-field's value prop
    gets updated with the new state value.
  */
  private handleTextInputChange: (
    event: React.FormEvent<HTMLInputElement>
  ) => void = (event) => {
    this.setState({ inputValue: event.currentTarget.value });
  };

  render = () => {
    const {
      // Rename the onButtonClick props, to indicate that this function raises data to the parent component.
      // This is just for convenience and to make the purpose clearer, and is not really necessary.
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

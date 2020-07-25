import React, { Component } from "react";
import "./../css/AddTodo.css";
import SingleLineFormComponent from "./SingleLineForm";

interface StateRules {}

interface PropRules {}

class AddTodoComponent extends Component<PropRules, StateRules> {
  handleButtonClick: (event: React.FormEvent) => void = (event) => {
    event.preventDefault();
  };

  render = () => {
    return (
      <div className="add-todo-section-container container">
        <SingleLineFormComponent
          value=""
          placeholder="Add Todo..."
          onButtonClick={this.handleButtonClick}
          buttonText="ADD"
        />
      </div>
    );
  };
}

export default AddTodoComponent;

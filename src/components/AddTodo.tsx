import React, { Component } from "react";
import "./../css/AddTodo.css";
import SingleLineFormComponent from "./SingleLineForm";
import { connect } from "react-redux";
import { addNote } from "./../actions/notes/add";
import { NotesAction, Notes } from "./../misc/customTypes";

interface PropRules {
  selectedDateReducer: {
    day: string;
    month: string;
    year: string;
  };
  notesReducer: Notes;
  addNote: (dateKey: string, text: string) => NotesAction;
}

class AddTodoComponent extends Component<PropRules> {
  // Function meant to handle the event triggered by the button click in SingleLineFormComponent.
  // This adds the note to redux store
  handleLineFormRaise: (
    event: React.FormEvent,
    inputValue: string,
    callback?: Function
  ) => void = (event, inputValue, callback) => {
    const { addNote } = this.props;
    event.preventDefault();

    const { day, month, year } = this.props.selectedDateReducer;
    const dataKey: string = day + "" + month + "" + year;

    addNote(dataKey, inputValue);

    if (callback) {
      callback();
    }
  };

  render = () => {
    return (
      <div className="add-todo-section-container container">
        <SingleLineFormComponent
          value=""
          placeholder="Add Todo..."
          onButtonClick={this.handleLineFormRaise}
          buttonText="ADD"
        />
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    selectedDateReducer: state.SelectedDateReducer,
    notesReducer: state.NotesReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNote: (dateKey: string, text: string) => {
      return dispatch(addNote(dateKey, text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoComponent);

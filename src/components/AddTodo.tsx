import React, { Component } from "react";
import "./../css/AddTodo.css";
import SingleLineFormComponent from "./SingleLineForm";
import { connect } from "react-redux";
import { addNote } from "./../actions/notes/add";

type ActionType = {
  type: string;
  payload: object;
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

type Notes = {
  [key: number]: Note[];
};

interface PropRules {
  selectedDateReducer: {
    day: string;
    month: string;
    year: string;
  };
  notesReducer: Notes;
  addNote: (dateKey: string, text: string) => ActionType;
}

class AddTodoComponent extends Component<PropRules, {}> {
  // Function meant to handle the event triggered by the button click in SingleLineFormComponent.
  // This adds the note to redux store
  handleLineFormRaise: (event: React.FormEvent, inputValue: string) => void = (
    event,
    inputValue
  ) => {
    const { addNote } = this.props;
    event.preventDefault();

    const { day, month, year } = this.props.selectedDateReducer;
    const dataKey: string = day + "" + month + "" + year;

    addNote(dataKey, inputValue);
  };

  render = () => {
    return (
      <div className="add-todo-section-container container">
        <SingleLineFormComponent
          value=""
          placeholder="Add Todo..."
          onButtonClick={(event, value) =>
            this.handleLineFormRaise(event, value)
          }
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

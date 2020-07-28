import React, { Component } from "react";
import "./../css/AddTodo.css";
import SingleLineFormComponent from "./SingleLineForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addNote } from "./../actions/notes/add";
import SelectedDateReducer from "./../reducers/SelectedDate";
import NotesReducer from "./../reducers/Notes";

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

interface StateRules {}

interface PropRules {
  selectedDateReducer: {
    day: string;
    month: string;
    year: string;
  };
  notesReducer: Notes;
  addNote: (dateKey: string, text: string) => ActionType;
}

class AddTodoComponent extends Component<PropRules, StateRules> {
  handleLineFormRaise: (event: React.FormEvent, inputValue: string) => void = (
    event,
    inputValue
  ) => {
    event.preventDefault();

    const { day, month, year } = this.props.selectedDateReducer;
    const dataKey: string = day + "" + month + "" + year;

    this.props.addNote(dataKey, inputValue);
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
  console.log("ÄÄÄ", state);
  return {
    selectedDateReducer: state.SelectedDateReducer,
    notesReducer: state.NotesReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  console.log("DDDD");
  return {
    addNote: (dateKey: string, text: string) => {
      return dispatch(addNote(dateKey, text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoComponent);
//export default AddTodoComponent;

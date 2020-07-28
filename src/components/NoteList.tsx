import React, { Component } from "react";
import "./../css/NoteList.css";
import NoteListItemComponent from "./NoteListItem";
import { getAllNotes } from "./../actions/notes/get";
import { connect } from "react-redux";
import NotesReducer from "./../reducers/Notes";
import { deleteNote } from "../actions/notes/delete";
import { clearNote } from "./../actions/notes/clear";

interface StateRules {}

interface PropRules {
  getAllNotes: (dateKey: string) => void;
  deleteNote: (dateKey: string, id: number) => void;
  clearNote: (dateKey: string, id: number, cleared: boolean) => void;
  notesReducer: any;
  selectedDateReducer: {
    day: string;
    month: string;
    year: string;
  };
}

type ActionType = {
  type: string;
  payload: {
    dateKey: string;
    text?: string;
    cleared?: boolean;
    id?: number;
  };
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

type Notes = {
  [key: number]: Note[];
};

class NoteListComponent extends Component<PropRules, StateRules> {
  handleDeleteItem: (itemId: number) => void = (itemId) => {
    const { day, month, year } = this.props.selectedDateReducer;
    const dataKey: string = day + "" + month + "" + year;

    this.props.deleteNote(dataKey, itemId);
  };

  handleMarkAsCleared: (itemId: number, clear: boolean) => void = (
    itemId,
    clear
  ) => {
    const { day, month, year } = this.props.selectedDateReducer;
    const dataKey: string = day + "" + month + "" + year;

    this.props.clearNote(dataKey, itemId, !clear ? true : false);
  };

  getAllNotes: (dateKey: string) => Note[] = (dateKey) => {
    //   this.props.getAllNotes(dateKey);
    console.log("INNN", this.props.notesReducer[dateKey]);
    return this.props.notesReducer[dateKey];
  };

  componentDidMount = () => {};

  componentDidUpdate = () => {
    console.log("U");
  };

  render = () => {
    const { day, month, year } = this.props.selectedDateReducer;
    const dataKey: string = day + "" + month + "" + year;

    const notes: Note[] = this.getAllNotes(dataKey);
    console.log("XI");

    return (
      <div className="note-list-container container">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note, index) => (
            <NoteListItemComponent
              id={note.id}
              text={note.text}
              cleared={note.cleared}
              onDeleteItem={this.handleDeleteItem}
              onMarkAsCleared={this.handleMarkAsCleared}
              key={"noteId-" + index}
            />
          ))
        ) : (
          <NoteListItemComponent
            id={0}
            text="There are currently no notes assigned to this date"
          />
        )}
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  console.log("HNN", state);
  return {
    selectedDateReducer: state.SelectedDateReducer,
    notesReducer: state.NotesReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  console.log("TTT");
  return {
    getAllNotes: (dateKey: string) => {
      return dispatch(getAllNotes(dateKey));
    },
    deleteNote: (dateKey: string, id: number) => {
      return dispatch(deleteNote(dateKey, id));
    },
    clearNote: (dateKey: string, id: number, cleared: boolean) => {
      return dispatch(clearNote(dateKey, id, cleared));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteListComponent);

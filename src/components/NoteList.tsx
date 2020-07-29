import React, { Component } from "react";
import "./../css/NoteList.css";
import NoteListItemComponent from "./NoteListItem";
import { getAllNotes } from "./../actions/notes/get";
import { connect } from "react-redux";
import { deleteNote } from "../actions/notes/delete";
import { clearNote } from "./../actions/notes/clear";
import { Note } from "./../misc/customTypes";

interface PropRules {
  getAllNotes: (dateKey: string) => void; // Get all notes of a certain date from redux store by dateKey
  deleteNote: (dateKey: string, id: number) => void; // Delete a note of a certain day by note id
  clearNote: (dateKey: string, id: number, cleared: boolean) => void; // Mark a note of a certain day as cleared/not cleared by id
  notesReducer: any; // The notes reducer, which provides notes data based on changes done by given actions

  // The selected date reducer, which provides the date selected in the calendar (a date is considered selected when a date is clicked, not when a year or month is chosen)
  selectedDateReducer: {
    day: string; // The number of the selected day, provided in string format from 0-31, 01, 02, 03... 28, 29, 30, 31
    month: string; // The number of the month where the selected day is listed under, provided in string format from 0-31, 01, 02, 03... 11, 12
    year: string; // The number of year (4 digits) where the selected day and selected month are listed under. Provided as string.
  };
}

class NoteListComponent extends Component<PropRules, {}> {
  // A handler used to delete a targetted note by its id. The id is raised from the targetted <NoteListItem> component
  private handleDeleteItem: (itemId: number) => void = (itemId) => {
    const { deleteNote } = this.props;

    const { day, month, year } = this.props.selectedDateReducer;
    const dateKey: string = day + "" + month + "" + year;

    deleteNote(dateKey, itemId);
  };

  // A handler used to mark or unmark a note by its id (checking/clearing the note as fulfilled). The id is raised from the targetted <NoteListItem> component
  private handleMarkAsCleared: (itemId: number, clear: boolean) => void = (
    itemId,
    clear
  ) => {
    const { clearNote } = this.props;

    const { day, month, year } = this.props.selectedDateReducer;
    const dateKey: string = day + "" + month + "" + year;

    clearNote(dateKey, itemId, !clear ? true : false);
  };

  // Get all notes of a certain date by using its dateKey. If no notes exists, return an empty array
  private getAllNotes: (dateKey: string) => Note[] = (dateKey) => {
    return this.props.notesReducer[dateKey] || [];
  };

  render = () => {
    const { day, month, year } = this.props.selectedDateReducer;
    const dateKey: string = day + "" + month + "" + year;

    // Get all notes in this date by dateKey and store it in a variable, preparing for mapping.
    const notes: Note[] = this.getAllNotes(dateKey);

    return (
      <div className="note-list-container container">
        {
          // If there are notes of this dateKey, map each of them to the <NoteListItemComponent> with necessary props.
          // If there are no notes of this dateKey, use one <NoteListItemComponent> to display a message
          notes.length > 0 ? (
            notes.map((note) => (
              <NoteListItemComponent
                id={note.id}
                text={note.text}
                cleared={note.cleared}
                onDeleteItem={this.handleDeleteItem}
                onMarkAsCleared={this.handleMarkAsCleared}
                key={"noteId-" + note.id}
              />
            ))
          ) : (
            <NoteListItemComponent
              id={0}
              text="There are currently no notes assigned to this date"
            />
          )
        }
      </div>
    );
  };
}

// Get the state data set by SelectedDateReducer and NotesReducer, and apply them to this component's props.
// Access the redux states like this:
// this.props.selectedDateReducer, this.props.notesReducer, etc
const mapStateToProps = (state: any) => {
  return {
    selectedDateReducer: state.SelectedDateReducer,
    notesReducer: state.NotesReducer,
  };
};

// Place all redux actions into the component's props. Call them like this:
// this.props.REDUX_ACTION()
const mapDispatchToProps = (dispatch: any) => {
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

// Wrap NoteListComponent in a redux wrapper containing the redux based states and actions, then export
export default connect(mapStateToProps, mapDispatchToProps)(NoteListComponent);

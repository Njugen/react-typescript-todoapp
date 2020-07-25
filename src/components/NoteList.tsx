import React, { Component } from "react";
import "./../css/NoteList.css";
import NoteListItemComponent from "./NoteListItem";

interface StateRules {}

interface PropRules {}

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

class NoteListComponent extends Component<PropRules, StateRules> {
  dummyNotes: Note[] = [
    {
      id: 0,
      text: "blablabla",
    },
    {
      id: 1,
      text: "blablabla 0",
    },
  ];

  handleDeleteItem: (itemId: number) => void = (itemId) => {
    console.log("Deleting item ", itemId);
  };

  handleMarkAsCleared: (itemId: number) => void = (itemId) => {
    console.log("Marking ", itemId);
  };

  render = () => {
    const notes: Note[] = this.dummyNotes;

    return (
      <div className="note-list-container container">
        {notes.map((note, index) => (
          <NoteListItemComponent
            id={note.id}
            text={note.text}
            cleared={note.cleared}
            onDeleteItem={this.handleDeleteItem}
            onMarkAsCleared={this.handleMarkAsCleared}
            key={"noteId-" + index}
          />
        ))}
      </div>
    );
  };
}

export default NoteListComponent;

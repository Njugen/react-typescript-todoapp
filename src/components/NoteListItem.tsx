import React, { Component } from "react";
import "./../css/NoteList.css";
import IconComponent from "./Icon";

interface PropRules {
  id: number; // An unique id number representing this note. Used to target the component when, removing it or marking it as cleared
  text: string; // The contents text representing the note itself.
  cleared?: boolean; // A boolean variable telling us whether it has been cleared or not. (optional)
  onDeleteItem?: (itemId: number) => void; // A function to be triggered when user clicks the trash icon. Raises the id number to parent component (optional)
  onMarkAsCleared?: (itemId: number, cleared: boolean) => void; // A function to be triggered when the user marks the note as cleared. Raises the id number and the clear state to parent (optional)
}

// Type containing various style information about the clear prop.
type ClearLayoutProperties = {
  color: string;
  iconReference: string;
};

class NoteListItemComponent extends Component<PropRules, {}> {
  // Returning various style information provided by the clear prop. Just to avoid bloating the render function
  private getClearProperties: () => ClearLayoutProperties = () => {
    const { cleared } = this.props;

    return {
      color: cleared ? "green" : "#c2c2c2",
      iconReference: cleared ? "fa fa-check" : "far fa-circle",
    };
  };

  render = () => {
    const {
      text,
      id,
      cleared,

      // Adding "Raise" suffix to these prop functions, to indicate that these props are meant to pass data to parent
      // This is done just to avoid confusion, and is not really necessary
      onDeleteItem: onDeleteItemRaise,
      onMarkAsCleared: onMarkAsClearedRaise,
    } = this.props;

    // Get info provided by the "cleared" prop, and use them as props in the clear icon.
    const clearLayout: ClearLayoutProperties = this.getClearProperties();

    return (
      <div className="note-list-item row">
        <div className="note-list-item-contents">
          <span>{text}</span>
        </div>
        <div className="note-list-item-manage">
          {onMarkAsClearedRaise && (
            <IconComponent
              iconReference={clearLayout.iconReference}
              size={15}
              color={clearLayout.color}
              // Raise the id (for targetting) and clear to parent component. If "cleared" is not set, we assume the note has not been cleared and set it to false
              onClick={() => onMarkAsClearedRaise(id, cleared || false)}
              className="note-item-manage-icon"
            />
          )}
          {onDeleteItemRaise && (
            <IconComponent
              iconReference="fas fa-trash"
              size={15}
              color="#dd0031"
              // Raise the id to parent component
              onClick={() => onDeleteItemRaise(id)}
              className="note-item-manage-icon"
            />
          )}
        </div>
      </div>
    );
  };
}

export default NoteListItemComponent;

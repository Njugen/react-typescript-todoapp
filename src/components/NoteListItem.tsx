import React, { Component } from "react";
import "./../css/NoteList.css";
import IconComponent from "./Icon";
import { connect } from "react-redux";
import { deleteNote } from "../actions/notes/delete";
interface StateRules {}

interface PropRules {
  id: number;
  text: string;
  cleared?: boolean;
  onDeleteItem?: (itemId: number) => void;
  onMarkAsCleared?: (itemId: number, cleared: boolean) => void;
}

type StatusProperties = {
  color: string;
  iconReference: string;
};

class NoteListItemComponent extends Component<PropRules, StateRules> {
  getStatusProperties: () => StatusProperties = () => {
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
      onDeleteItem: onDeleteItemRaise,
      onMarkAsCleared: onMarkAsClearedRaise,
    } = this.props;

    const status = this.getStatusProperties();

    return (
      <div className="note-list-item row">
        <div className="note-list-item-contents">
          <span>{text}</span>
        </div>
        <div className="note-list-item-manage">
          {onMarkAsClearedRaise && (
            <IconComponent
              iconReference={status.iconReference}
              size={15}
              color={status.color}
              onClick={() => onMarkAsClearedRaise(id, cleared || false)}
              className="note-item-manage-icon"
            />
          )}
          {onDeleteItemRaise && (
            <IconComponent
              iconReference="fas fa-trash"
              size={15}
              color="#dd0031"
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

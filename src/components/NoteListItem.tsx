import React, { Component } from "react";
import "./../css/NoteList.css";
import IconComponent from "./Icon";

interface StateRules {}

interface PropRules {
  id: number;
  text: string;
  cleared?: boolean;
  onDeleteItem: (itemId: number) => void;
  onMarkAsCleared: (itemId: number) => void;
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
          <IconComponent
            iconReference={status.iconReference}
            size={15}
            color={status.color}
            onClick={() => onMarkAsClearedRaise(id)}
            className="note-item-manage-icon"
          />
          <IconComponent
            iconReference="fas fa-trash"
            size={15}
            color="#dd0031"
            onClick={() => onDeleteItemRaise(id)}
            className="note-item-manage-icon"
          />
        </div>
      </div>
    );
  };
}

export default NoteListItemComponent;

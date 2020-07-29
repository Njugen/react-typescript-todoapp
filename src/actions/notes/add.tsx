import { NotesAction } from "./../../misc/customTypes";

export const addNote: (
  dateKey: string,
  text: string,
  cleared?: boolean
) => NotesAction = (dateKey, text, cleared) => {
  return {
    type: "ADD_NOTE",
    payload: {
      dateKey,
      text,
      cleared,
    },
  };
};

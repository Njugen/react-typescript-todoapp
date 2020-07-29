import { NotesAction } from "./../../misc/customTypes";

export const deleteNote: (dateKey: string, id: number) => NotesAction = (
  dateKey,
  id
) => {
  return {
    type: "DELETE_NOTE",
    payload: {
      dateKey,
      id,
    },
  };
};

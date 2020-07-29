import { NotesAction } from "./../../misc/customTypes";

export const getAllNotes: (dateKey: string) => NotesAction = (dateKey) => {
  return {
    type: "GET_NOTE",
    payload: {
      dateKey,
    },
  };
};

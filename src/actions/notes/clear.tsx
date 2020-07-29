import { NotesAction } from "./../../misc/customTypes";

export const clearNote: (
  dateKey: string,
  id: number,
  cleared: boolean
) => NotesAction = (dateKey, id, cleared) => {
  return {
    type: "CLEAR_NOTE",
    payload: {
      dateKey,
      id,
      cleared,
    },
  };
};

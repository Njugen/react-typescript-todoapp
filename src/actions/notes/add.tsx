type ActionType = {
  type: string;
  payload: object;
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

export const addNote: (
  dateKey: string,
  text: string,
  cleared?: boolean
) => ActionType = (dateKey, text, cleared) => {
  return {
    type: "ADD_NOTE",
    payload: {
      dateKey,
      text,
      cleared,
    },
  };
};

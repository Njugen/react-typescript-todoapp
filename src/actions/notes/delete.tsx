type ActionType = {
  type: string;
  payload: object;
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

export const deleteNote: (dateKey: string, id: number) => ActionType = (
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

type ActionType = {
  type: string;
  payload: object;
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

export const clearNote: (
  dateKey: string,
  id: number,
  cleared: boolean
) => ActionType = (dateKey, id, cleared) => {
  return {
    type: "CLEAR_NOTE",
    payload: {
      dateKey,
      id,
      cleared,
    },
  };
};

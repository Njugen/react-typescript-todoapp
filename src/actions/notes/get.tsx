type ActionType = {
  type: string;
  payload: object;
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

export const getAllNotes: (dateKey: string) => ActionType = (dateKey) => {
  return {
    type: "GET",
    payload: {
      dateKey,
    },
  };
};

type ActionType = {
  type: string;
  payload: object;
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

export const getDate: () => ActionType = () => {
  return {
    type: "GET_DATE",
    payload: {},
  };
};

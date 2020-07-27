type ActionType = {
  type: string;
  payload: object;
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

type Notes = {
  [key: number]: Note[];
};

const SelectedDateReducer: (state: string, action: ActionType) => void = (
  state = "",
  action
) => {
  switch (action.type) {
    case "CHANGE":
      return action.payload;
    default:
      return state;
  }
};

export default SelectedDateReducer;

type ActionType = {
  type: string;
  payload: object;
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

export const setDay: (day: number) => ActionType = (day) => {
  return {
    type: "SET_DAY",
    payload: {
      day,
    },
  };
};

export const setMonth: (month: number) => ActionType = (month) => {
  return {
    type: "SET_MONTH",
    payload: {
      month: month + 1,
    },
  };
};

export const setYear: (year: number) => ActionType = (year) => {
  return {
    type: "SET_YEAR",
    payload: {
      year,
    },
  };
};

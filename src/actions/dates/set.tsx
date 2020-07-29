import { SelectedDateAction } from "./../../misc/customTypes";

export const setDay: (day: number) => SelectedDateAction = (day) => {
  return {
    type: "SET_DAY",
    payload: {
      day,
    },
  };
};

export const setMonth: (month: number) => SelectedDateAction = (month) => {
  return {
    type: "SET_MONTH",
    payload: {
      month: month + 1,
    },
  };
};

export const setYear: (year: number) => SelectedDateAction = (year) => {
  return {
    type: "SET_YEAR",
    payload: {
      year,
    },
  };
};

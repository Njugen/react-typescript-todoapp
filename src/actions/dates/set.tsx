import { SelectedDateAction } from "./../../misc/customTypes";

export const setDate: (
  day: number,
  month: number,
  year: number
) => SelectedDateAction = (day, month, year) => {
  return {
    type: "SET_DATE",
    payload: {
      day,
      month,
      year,
    },
  };
};

import { SelectedDate, SelectedDateAction } from "./../misc/customTypes";

const convertToDoubleDigitString: (number: number) => string = (number) => {
  let output;

  if (number < 10) {
    output = "0" + number.toString();
  } else {
    output = number.toString();
  }

  return output;
};

const getToday: () => SelectedDate = () => {
  const date: Date = new Date();

  const dayDoubleDigit: string = convertToDoubleDigitString(date.getDate());
  const monthDoubleDigit: string = convertToDoubleDigitString(
    date.getMonth() + 1
  );

  return {
    day: dayDoubleDigit,
    month: monthDoubleDigit,
    year: date.getFullYear().toString(),
  };
};

const SelectedDateReducer: (
  state: SelectedDate,
  action: SelectedDateAction
) => void = (state = getToday(), action) => {
  const { type } = action;
  switch (type) {
    case "SET_DAY":
      if (action.payload.day) {
        state["day"] = convertToDoubleDigitString(action.payload.day);
      }
      return {
        ...state,
      };
    case "SET_MONTH":
      if (action.payload.month) {
        state["month"] = convertToDoubleDigitString(action.payload.month);
      }
      return { ...state };
    case "SET_YEAR":
      if (action.payload.year) {
        state["year"] = action.payload.year.toString();
      }
      return { ...state };
    default:
      return state;
  }
};

export default SelectedDateReducer;

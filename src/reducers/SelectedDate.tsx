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
  const { type, payload } = action;

  switch (type) {
    case "SET_DATE":
      if (payload.day && payload.month && payload.year) {
        state["day"] = convertToDoubleDigitString(payload.day);
        state["month"] = convertToDoubleDigitString(payload.month);
        state["year"] = payload.year.toString();

        return { ...state };
      }
      return state;
    default:
      return state;
  }
};

export default SelectedDateReducer;

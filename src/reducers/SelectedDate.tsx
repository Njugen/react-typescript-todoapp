type ActionType = {
  type: string;
  payload: {
    day: number;
    month: number;
    year: number;
  };
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

type Notes = {
  [key: number]: Note[];
};

type CalendarDate = {
  day: string;
  month: string;
  year: string;
};

const convertToDoubleDigitString: (number: number) => string = (number) => {
  let output;

  if (number < 10) {
    output = "0" + number.toString();
  } else {
    output = number.toString();
  }

  return output;
};

const getToday: () => CalendarDate = () => {
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

const SelectedDateReducer: (state: CalendarDate, action: ActionType) => void = (
  state = getToday(),
  action
) => {
  const { type } = action;
  switch (type) {
    case "SET_DAY":
      state["day"] = convertToDoubleDigitString(action.payload.day);
      console.log("CLI", state["day"]);
      return {
        ...state,
      };
    case "SET_MONTH":
      state["month"] = convertToDoubleDigitString(action.payload.month);

      return { ...state };
    case "SET_YEAR":
      state["year"] = action.payload.year.toString();

      return { ...state };
    case "GET_DATE":
      return state;
    default:
      return state;
  }
};

export default SelectedDateReducer;

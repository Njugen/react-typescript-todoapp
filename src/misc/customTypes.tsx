// Bunch of custom types used through the app

///////////// COMPONENTS /////////////////

// Type containing various style information about the clear prop.
export type ClearLayoutProperties = {
  color: string;
  iconReference: string;
};

// Type containing definition of a note
export type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};
export type Notes = {
  [key: string]: Note[];
};

// A layout type representing the style of the app logo text (located in LogoComponent)
export type DynamicLogoTextStyle = {
  marginLeft: string;
  cursor?: string;
};

// A layout type representing the dyanic style of an icon component
export type DynamicIconStyle = {
  fontSize: string;
  color: string;
  cursor?: string;
};

// Represents date range used in the calendar
export type DateRangeInfo = {
  days: number;
  padding: number;
};

// Represents a month object in the calendar
export type MonthInfo = {
  label: string;
  number: number;
};

///////////// ACTIONS AND REDUCERS /////////////////

// - /src/reducers/SelectedDate.tsx
// - /src/actions/dates/set.tsx

// Represents actions dispatched to the SelectedDate reducer
export type SelectedDateAction = {
  type: string;
  payload: {
    day?: number;
    month?: number;
    year?: number;
  };
};

// Represents a date object, used only in SelectedDAte.tsx
export type SelectedDate = {
  day: string;
  month: string;
  year: string;
};

// - /src/reducers/Notes.tsx
// - /src/actions/dates/set.tsx

export type NotesAction = {
  type: string;
  payload: {
    dateKey: string;
    text?: string;
    cleared?: boolean;
    id?: number;
  };
};

import React, { Component } from "react";
import "./../css/Calendar.css";
import IconComponent from "./Icon";
import { connect } from "react-redux";
import { setDay, setMonth, setYear } from "./../actions/dates/set";
import { getDate } from "./../actions/dates/get";

type ActionType = {
  type: string;
  payload: object;
};

interface StateRules {
  localMonth: number;
  localYear: number;
}

interface PropRules {
  id: string;
  onDateClick: () => void;
  setDay: (day: number) => ActionType;
  setMonth: (month: number) => ActionType;
  setYear: (year: number) => ActionType;
  getDate: () => ActionType;
  selectedDateReducer: { day: string; month: string; year: string };
  preset: [number, number, number];
}

type DateRangeInfo = {
  days: number;
  padding: number;
};

type MonthInfo = {
  label: string;
  number: number;
};

class CalendarComponent extends Component<PropRules, StateRules> {
  // State containing month and year values only used to adjust the calendar
  // to changes (switching months or years for example)
  state = {
    localMonth: this.props.preset[1],
    localYear: this.props.preset[2],
  };

  // Return the month number currently set by component state
  private getLocalMonth: () => number = () => {
    return this.state.localMonth;
  };

  // Return the year number currently set by component state
  private getLocalYear: () => number = () => {
    return this.state.localYear;
  };

  // Get an array of all years from startYear uptil and including endYear
  // The years should be 4 digits
  private getYearRange: (startYear: number, endYear: number) => number[] = (
    startYear,
    endYear
  ) => {
    let numberOfYears: number = endYear - startYear;
    let years: number[] = [];

    for (let i = 0; i <= numberOfYears; i++) {
      const focusedYear = startYear + i;
      years.push(focusedYear);
    }

    return years;
  };

  // Get an array of month, where each array block contains the month's label and number
  private getMonthRange: () => MonthInfo[] = () => {
    const monthLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    let months: MonthInfo[] = [];

    for (let i = 0; i < 12; i++) {
      months.push({
        label: monthLabels[i],
        number: monthNumbers[i],
      });
    }

    return months;
  };

  /* 
    Get the date range information, which is an object containing the number of days, and
    the padding, which describes which day during the week the month really starts.button
    Also, the "month" and "year" arguments are regarded as "current", relative to the terms next/previous
    in the function.
  
    Example:
      - If month = 12, then nextMonth = 1. 
  */
  private getDateRange: (month: number, year: number) => DateRangeInfo = (
    month,
    year
  ) => {
    const nextMonth: number = month + 1 > 12 ? 1 : month + 1; // The number of next month
    const monthYear: number = nextMonth === 1 ? year + 1 : year; // The year when nextMonth occurs

    const lastDateOfCurrentMonth: Date = new Date(monthYear, nextMonth, 0); // Last day of the current month
    const firstDayOfCurrentMonth: Date = new Date(year, month, 1); // First day of the current month
    const weekdayPadding = firstDayOfCurrentMonth.getDay(); // Get the week day number of the month's first day. Use that as start padding in the calendar

    const numberOfDays: number = lastDateOfCurrentMonth.getDate();
    return {
      days: numberOfDays,
      padding: weekdayPadding,
    };
  };

  /*
   The current month starts at e.g. wednesday (wednesday the 1st). Which means the table padding 
    is all the days between sunday and wednesday.

    Use this function to get an array of <td> elements, containing the last few dates of the previous months. These
    blocks are placed into the calendar, to show the last few days of previous month (from sunday to the start of current month).
  */
  private getPaddingPrefixBlocks: (padding: number) => JSX.Element[] = (
    padding
  ) => {
    const localMonth: number = this.getLocalMonth();
    const localYear: number = this.getLocalYear();

    const blocks: JSX.Element[] = [];

    // The week starts on Sunday. If there is no weekday padding based on the date, then add a full
    // padding to ensure the first month date starts on sunday.
    if (padding === 0) {
      padding = 7;
    }

    const numberOfDaysPrevMonth: number = this.getDateRange(
      localMonth - 1,
      localYear
    ).days;

    for (let i = 0; i < padding - 1; i++) {
      blocks.push(
        <td className={"calendar-padding-block"} key={"padding-id-" + i}>
          {numberOfDaysPrevMonth - i}
        </td>
      );
    }
    blocks.reverse();

    return blocks;
  };

  /*
    Same principle as getPaddingPrefixBlocks(), but this time, the padding fills the rest of the month row 
    with <td> elements containing the first few day numbers of next month.
  */
  private getPaddingSuffixBlocks: () => JSX.Element[] = () => {
    //const { localMonth, localYear } = this.state;
    const localMonth: number = this.getLocalMonth();
    const localYear: number = this.getLocalYear();

    const blocks: JSX.Element[] = [];

    //Push the first few days of the next month, by
    let lastWeekDaysPadding =
      7 - new Date(localYear, localMonth + 1, 0).getDay();

    for (let i = 0; i < lastWeekDaysPadding; i++) {
      blocks.push(
        <td className={"calendar-padding-block"} key={"padding-id-" + i}>
          {i + 1}
        </td>
      );
    }
    return blocks;
  };

  /*
    Just to imitate the calendar in Dubey's angular app (although not really necessary), 
    all months viewed should have a total of 6 date rows. This function adds an extra row with date numbers if
    needed.
  */
  private getPaddingRow: (startDate: number) => JSX.Element = (startDate) => {
    const blocks: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      blocks[i] = (
        <td
          className="calendar-padding-block"
          key={"month-row-lastrow-block-id" + i}
        >
          {startDate + i}
        </td>
      );
    }

    return <tr key={"month-row-id-extrapadding"}>{blocks}</tr>;
  };

  /*
    Build an array of <td> elements, the length should match the "days" argument. Use this function to
    return an array consisting of the dates of the month
  */
  private getDateDataBlocks: (days: number) => JSX.Element[] = (days) => {
    const blocks: JSX.Element[] = [];
    const { onDateClick: onDateClickRaise } = this.props;

    for (let i = 0; i < days; i++) {
      const dateNumber: number = i + 1;
      blocks.push(
        <td
          key={"date-id-" + i}
          className="calendar-date-block"
          onClick={() => {
            this.setSelectedDate(dateNumber);
            onDateClickRaise();
          }}
        >
          {dateNumber}
        </td>
      );
    }

    return blocks;
  };

  // Set the selected date and update the redux store
  private setSelectedDate: (dateNumber: number) => void = (dateNumber) => {
    this.props.setDay(dateNumber);
    this.props.setMonth(this.state.localMonth);
    this.props.setYear(this.state.localYear);
  };

  private renderDays: (month: number, year: number) => JSX.Element = (
    month,
    year
  ) => {
    const dates: DateRangeInfo = this.getDateRange(month, year);
    const padding: number = dates.padding;

    const prevMonthPaddingBlocks: JSX.Element[] = this.getPaddingPrefixBlocks(
      padding
    );
    const nextMonthpaddingBlocks: JSX.Element[] = this.getPaddingSuffixBlocks();

    const dateBlocks: JSX.Element[] = this.getDateDataBlocks(dates.days);

    // merge all the <td></td> blocks, including dates of this month and padding dates of the neighbouring months
    let blocks: JSX.Element[] = [
      ...prevMonthPaddingBlocks,
      ...dateBlocks,
      ...nextMonthpaddingBlocks,
    ];

    const allRows: JSX.Element[] = [];
    let singleRow: JSX.Element[] = [];

    // Loop through all <td>-blocks and place them into a row. Push the row to allRows container once every 7 blocks
    // have been looped through (and placed from left to right).
    for (let i = 0; i <= blocks.length; i++) {
      // Once every 7 blocks have been looped through, start a new row. However, do not push anything into allRows if no blocks have been looped through
      if (i % 7 === 0 && i > 0) {
        allRows.push(<tr key={"month-row-id-" + i}>{singleRow}</tr>);
        singleRow = [];
        console.log(i);
      }

      // Add blocks to current row
      if (i <= blocks.length - 1) singleRow.push(blocks[i]);

      // If 7 blocks have not been filled in the current row, but the number of blocks runs out, then push the row
      // into allRows before the loop ends. IF the row however, does not have any blocks, then do not push it.
      if (i === blocks.length && singleRow.length > 0)
        allRows.push(<tr key={"month-row-id-last"}>{singleRow}</tr>);
    }

    // If the total number of rows is less than 6, then push an extra row. Just to imitate the Angular app. Not out of necessity.
    if (allRows.length < 6) {
      const paddingRow = this.getPaddingRow(nextMonthpaddingBlocks.length + 1);
      allRows.push(paddingRow);
    }

    // allRows has been filled with table rows and <td>-blocks. Place it into tbody and return it for render.
    return <tbody>{allRows}</tbody>;
  };

  // Place the day labels into <thead> and return it for render
  private renderTableHeader: () => JSX.Element = () => {
    const weekdays: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const weekdaysBlocks: () => JSX.Element[] = () => {
      return weekdays.map((weekday, index) => (
        <th key={"calendar-header-block-" + index}>{weekday}</th>
      ));
    };

    return (
      <thead>
        <tr>{weekdaysBlocks()}</tr>
      </thead>
    );
  };

  /*
     Return a dropdown year selector, containing the options of selecting a year between
    startYear and endYear
  */
  private renderYearSelector: (
    startYear: number,
    endYear: number,
    handleChange: (input: React.ChangeEvent<HTMLSelectElement>) => void
  ) => JSX.Element = (startYear, endYear, handleChange) => {
    const years: number[] = this.getYearRange(startYear, endYear);

    //const { localYear } = this.state;
    const localYear: number = this.getLocalYear();

    const optionElements: JSX.Element[] = years.map((year, index) => (
      <option
        value={year}
        selected={year === localYear}
        key={"calendar-selectable-year-id-" + index}
      >
        {year}
      </option>
    ));

    return (
      <select title="Select year" onChange={handleChange}>
        {optionElements}
      </select>
    );
  };

  /*
     Return a dropdown month selector, containing the options of selecting a month between january and december
  */
  private renderMonthSelector: (
    handleChange: (input: React.ChangeEvent<HTMLSelectElement>) => void
  ) => JSX.Element = (handleChange) => {
    const months: MonthInfo[] = this.getMonthRange();
    const localMonth: number = this.getLocalMonth();

    const optionElements: JSX.Element[] = months.map((month, index) => (
      <option
        value={month.number}
        selected={month.number === (localMonth % 12) + 1}
        key={"calendar-selectable-month-id-" + index}
      >
        {month.label}
      </option>
    ));

    return (
      <select title="Select month" onChange={handleChange}>
        {optionElements}
      </select>
    );
  };

  // A function meant to act as event handler for the month selector. This sets the localMonth state (number in range 0-11)
  private handleMonthSelectorChange: (
    input: React.ChangeEvent<HTMLSelectElement>
  ) => void = (input) => {
    const { value } = input.currentTarget;

    this.setLocalMonthState(parseInt(value) - 1);
  };

  // A function meant to act as event handler for the year selector. This sets the localYear state (number in range 0-11)
  private handleYearSelectorChange: (
    input: React.ChangeEvent<HTMLSelectElement>
  ) => void = (input) => {
    const { value } = input.currentTarget;

    this.setLocalYearState(parseInt(value));
  };

  // Set month to the component's state
  private setLocalMonthState: (value: number) => void = (value) => {
    let adjustedValue: number = value;
    const localYear: number = this.getLocalYear();

    // If this function is called by going back from e.g. January to December, that means the year changes
    // and the month state should be set to 11 because of it being the index for December.
    // Set the year state accordingly, and prepare the adjustedValue to be set as a new month in state.
    if (value < 0) {
      adjustedValue = 11;
      this.setLocalYearState(localYear - 1);
    }

    // If this function is called by going forward from January to December, that means the year changes
    // and the month state should be set to 0 because of it being the index for January.
    // Set the year state accordingly, and prepare the adjustedValue to be set as a new month in state.
    if (value > 11) {
      adjustedValue = 0;
      this.setLocalYearState(localYear + 1);
    }

    // Push the adjustedValue to localMonth in state.
    // - If the year has not changed when calling this function, adjustedState remains unadjusted.
    this.setState({ localMonth: adjustedValue });
  };

  // Set year to component state
  private setLocalYearState: (value: number) => void = (value) => {
    this.setState({ localYear: value });
  };

  render = () => {
    const { id } = this.props;
    const { localMonth, localYear } = this.state;

    return (
      <div id={id} className="calendar-container">
        <div className="calendar-navigation-container">
          <IconComponent
            iconReference="fas fa-angle-left"
            className="calendar-nav-arrow"
            onClick={() => this.setLocalMonthState(localMonth - 1)}
          />
          {this.renderMonthSelector(this.handleMonthSelectorChange)}
          {this.renderYearSelector(2010, 2030, this.handleYearSelectorChange)}
          <IconComponent
            iconReference="fas fa-angle-right"
            className="calendar-nav-arrow"
            onClick={() => this.setLocalMonthState(localMonth + 1)}
          />
        </div>
        <table className="calendar-table">
          {this.renderTableHeader()}
          {this.renderDays(localMonth, localYear)}
        </table>
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    selectedDateReducer: state.SelectedDateReducer,
    notesReducer: state.NotesReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDay: (day: number) => {
      return dispatch(setDay(day));
    },
    setMonth: (month: number) => {
      return dispatch(setMonth(month));
    },
    setYear: (year: number) => {
      return dispatch(setYear(year));
    },
    getDate: () => {
      return dispatch(getDate());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);

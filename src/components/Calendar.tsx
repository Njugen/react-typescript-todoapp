import React, { Component } from "react";
import "./../css/Calendar.css";
import IconComponent from "./Icon";

interface StateRules {
  selectedMonth: number;
  selectedYear: number;
}

interface PropRules {
  id: string;
  refer: React.RefObject<HTMLDivElement>;
}

type DateRangeInfo = {
  days: number;
  padding: number;
};

type MonthInfo = {
  label: string;
  number: number;
};

type TodayInfo = {
  date: number;
  month: number;
  year: number;
};

class CalendarComponent extends Component<PropRules, StateRules> {
  state = {
    selectedMonth: 6,
    selectedYear: 2020,
  };

  private getSelectedMonth: () => number = () => {
    return this.state.selectedMonth;
  };

  private getSelectedYear: () => number = () => {
    return this.state.selectedYear;
  };

  // Get an array of all years from startYear uptil and including endYear
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

  private getDateRange: (month: number, year: number) => DateRangeInfo = (
    month,
    year
  ) => {
    const nextMonth: number = month + 1 > 12 ? 1 : month + 1;
    const monthYear: number = nextMonth === 1 ? year + 1 : year;

    const lastDateOfCurrentMonth: Date = new Date(monthYear, nextMonth, 0);
    const firstDayOfCurrentMonth: Date = new Date(year, month, 1);
    const weekdayPadding = firstDayOfCurrentMonth.getDay();

    const numberOfDays: number = lastDateOfCurrentMonth.getDate();
    return {
      days: numberOfDays,
      padding: weekdayPadding,
    };
  };

  private getPaddingPrefixBlocks: (padding: number) => JSX.Element[] = (
    padding
  ) => {
    const { selectedMonth, selectedYear } = this.state;
    const blocks: JSX.Element[] = [];

    // The week starts on Sunday. If there is no weekday padding based on the date, then add a full
    // padding to ensure the first months date starts on sunday.
    if (padding === 0) {
      padding = 7;
    }

    const numberOfDaysPrevMonth: number = this.getDateRange(
      selectedMonth - 1,
      selectedYear
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

  private getPaddingSuffixBlocks: () => JSX.Element[] = () => {
    const { selectedMonth, selectedYear } = this.state;
    const blocks: JSX.Element[] = [];

    //Push the first few days of the next month, by
    let lastWeekDaysPadding =
      7 - new Date(selectedYear, selectedMonth + 1, 0).getDay();

    for (let i = 0; i < lastWeekDaysPadding; i++) {
      blocks.push(
        <td className={"calendar-padding-block"} key={"padding-id-" + i}>
          {i + 1}
        </td>
      );
    }
    return blocks;
  };

  private getPaddingRow: (startDate: number) => JSX.Element = (startDate) => {
    const blocks: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      blocks[i] = <td className="calendar-padding-block">{startDate + i}</td>;
    }

    return <tr key={"month-row-id-extrapadding"}>{blocks}</tr>;
  };

  private getDateDataBlocks: (days: number) => JSX.Element[] = (days) => {
    const blocks: JSX.Element[] = [];

    for (let i = 0; i < days; i++) {
      blocks.push(<td key={"date-id-" + i}>{i + 1}</td>);
    }

    return blocks;
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

    // Loop through all <td>-blocks and place them into rows. Push the rows to allRows container once every 7 blocks
    // have been looped through.
    for (let i = 0; i <= blocks.length; i++) {
      if (i % 7 === 0) {
        allRows.push(<tr key={"month-row-id-" + i}>{singleRow}</tr>);
        singleRow = [];
      }

      singleRow.push(blocks[i]);

      if (i > blocks.length - 1)
        allRows.push(<tr key={"month-row-id-last"}>{singleRow}</tr>);
    }

    if (allRows.length < 8) {
      const paddingRow = this.getPaddingRow(nextMonthpaddingBlocks.length + 1);
      allRows.push(paddingRow);
    }

    return <tbody>{allRows}</tbody>;
  };

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

  private renderYearSelector: (
    startYear: number,
    endYear: number,
    handleChange: (input: React.ChangeEvent<HTMLSelectElement>) => void
  ) => JSX.Element = (startYear, endYear, handleChange) => {
    const years: number[] = this.getYearRange(startYear, endYear);
    const { selectedYear } = this.state;

    const optionElements: JSX.Element[] = years.map((year, index) => (
      <option
        value={year}
        selected={year === selectedYear}
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

  private renderMonthSelector: (
    handleChange: (input: React.ChangeEvent<HTMLSelectElement>) => void
  ) => JSX.Element = (handleChange) => {
    const months: MonthInfo[] = this.getMonthRange();
    const { selectedMonth } = this.state;
    console.log("MONTH", selectedMonth);
    const optionElements: JSX.Element[] = months.map((month, index) => (
      <option
        value={month.number}
        selected={month.number === (selectedMonth % 12) + 1}
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

  private handleMonthSelectorChange: (
    input: React.ChangeEvent<HTMLSelectElement>
  ) => void = (input) => {
    const { value } = input.currentTarget;

    //this.setState({ selectedMonth: parseInt(value) });
    this.setMonthState(parseInt(value) - 1);
  };

  private handleYearSelectorChange: (
    input: React.ChangeEvent<HTMLSelectElement>
  ) => void = (input) => {
    const { value } = input.currentTarget;

    //this.setState({ selectedYear: parseInt(value) });
    this.setYearState(parseInt(value));
  };

  setMonthState: (value: number) => void = (value) => {
    let adjustedValue: number = value;
    const { selectedYear } = this.state;

    if (value < 0) {
      adjustedValue = 11;
      this.setYearState(selectedYear - 1);
    }
    if (value > 11) {
      adjustedValue = 0;
      this.setYearState(selectedYear + 1);
    }

    this.setState({ selectedMonth: adjustedValue });
  };

  setYearState: (value: number) => void = (value) => {
    this.setState({ selectedYear: value });
  };

  render = () => {
    const { id, refer } = this.props;
    const { selectedMonth, selectedYear } = this.state;

    return (
      <div id={id} ref={refer} className="calendar-container">
        <div className="calendar-navigation-container">
          <IconComponent
            iconReference="fas fa-angle-left"
            className="calendar-nav-arrow"
            onClick={() => this.setMonthState(selectedMonth - 1)}
          />
          {this.renderMonthSelector(this.handleMonthSelectorChange)}
          {this.renderYearSelector(2010, 2030, this.handleYearSelectorChange)}
          <IconComponent
            iconReference="fas fa-angle-right"
            className="calendar-nav-arrow"
            onClick={() => this.setMonthState(selectedMonth + 1)}
          />
        </div>
        <table className="calendar-table">
          {this.renderTableHeader()}
          {this.renderDays(selectedMonth, selectedYear)}
        </table>
      </div>
    );
  };
}

export default CalendarComponent;

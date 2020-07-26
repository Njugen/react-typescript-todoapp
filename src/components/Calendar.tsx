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
    selectedMonth: 3,
    selectedYear: 2021,
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

    /*   let days: number[] = [];

    for (let i = 0; i < numberOfDays; i++) {
      days.push(i + 1);
    }
*/
    console.log({
      days: numberOfDays,
      padding: weekdayPadding,
    });
    return {
      days: numberOfDays,
      padding: weekdayPadding,
    };
  };

  private getPaddingDataBlocks: (padding: number) => JSX.Element[] = (
    padding
  ) => {
    const blocks: JSX.Element[] = [];

    // The week starts on Sunday. If there is no weekday padding based on the date, then add a full
    // padding to ensure the first months date starts on sunday.

    if (padding === 0) {
      padding = 7;
    }

    for (let i = 0; i < padding; i++) {
      blocks.push(<td key={"padding-id-" + i}></td>);
    }

    return blocks;
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

    const paddingBlocks: JSX.Element[] = this.getPaddingDataBlocks(padding);
    const dateBlocks: JSX.Element[] = this.getDateDataBlocks(dates.days);

    const blocks: JSX.Element[] = [...paddingBlocks, ...dateBlocks];
    const rows: JSX.Element[] = [];
    let row: JSX.Element[] = [];

    for (let i = 0; i <= blocks.length; i++) {
      row.push(blocks[i]);

      if (i % 7 === 0) {
        rows.push(<tr key={"month-row-id-" + i}>{row}</tr>);
        row = [];
      }

      if (i > blocks.length - 1)
        rows.push(<tr key={"month-row-id-last"}>{row}</tr>);
    }

    return <tbody>{rows}</tbody>;
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

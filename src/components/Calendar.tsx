import React, { Component } from "react";
import "./../css/Calendar.css";
interface StateRules {}

interface PropRules {
  id: string;
  refer: React.RefObject<HTMLDivElement>;
}

type DateRangeInfo = {
  days: number;
  padding: number;
};

class CalendarComponent extends Component<PropRules, StateRules> {
  // Get an array of all years from startYear uptil and including endYear
  private weekdays: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  private getYearRange: (startYear: number, endYear: number) => number[] = (
    startYear,
    endYear
  ) => {
    let years = [];

    for (let i = 0; i <= endYear; i++) {
      const focusedYear = startYear + i;
      years.push(focusedYear);
    }

    return years;
  };

  private getMonthRange: () => number[] = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  };

  private getDateRange: (month: number, year: number) => DateRangeInfo = (
    month,
    year
  ) => {
    // Since the new Date() constructor's month parameter interprets month order by 0-11 instead of 1-12, we'll
    // have to ensure this function's parameter goes by the same rule.
    month = month - 1;
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
    return {
      days: numberOfDays,
      padding: weekdayPadding,
    };
  };

  private getPaddingDataBlocks: (padding: number) => JSX.Element[] = (
    padding
  ) => {
    const blocks: JSX.Element[] = [];

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

    console.log(blocks);

    for (let i = 0; i <= blocks.length; i++) {
      row.push(blocks[i]);

      if (i % 7 === 0) {
        rows.push(<tr key={"month-row-id-" + i}>{row}</tr>);
        row = [];
      }

      if (i > blocks.length - 1)
        rows.push(<tr key={"month-row-id-last"}>{row}</tr>);
    }
    console.log(rows[0]);

    return <tbody>{rows}</tbody>;
  };

  render = () => {
    const { id, refer } = this.props;

    return (
      <div id={id} ref={refer} className="calendar-container">
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
              <th>Su</th>
            </tr>
          </thead>
          {this.renderDays(2, 2020)}
        </table>
      </div>
    );
  };
}

export default CalendarComponent;

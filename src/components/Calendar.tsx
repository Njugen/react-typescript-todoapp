import React, { Component } from "react";
import "./../css/Calendar.css";
interface StateRules {}

interface PropRules {
  id: string;
  refer: React.RefObject<HTMLDivElement>;
}

class CalendarComponent extends Component<PropRules, StateRules> {
  render = () => {
    const { id, refer } = this.props;

    return (
      <div id={id} ref={refer} className="calendar-container">
        <div>calendar</div>
      </div>
    );
  };
}

export default CalendarComponent;

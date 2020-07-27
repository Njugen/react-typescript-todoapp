import React, { Component, createRef } from "react";
import SingleLineFormComponent from "./SingleLineForm";
import CalendarComponent from "./Calendar";
import "./../css/DateSelector.css";

interface StateRules {}

interface PropRules {}

class DateSelectorComponent extends Component<PropRules, StateRules> {
  listenForExternalClicks: (event: MouseEvent) => void = (event) => {
    // The target may, or may not be an element. Here, I inform TypeScript that
    // I regard this as an HTMLElement during all circumstances.
    const clickedElement = event.target as HTMLElement;
    const thisComponent = this.componentContainerRef.current as HTMLElement;

    // If I click outside the area of this component, the calendar should be hidden.
    if (thisComponent && !thisComponent.contains(clickedElement)) {
      this.toggleCalendarVisibility(false);

      // Remove the event listener. We don't want it to be active when not needed.
      window.removeEventListener("click", this.listenForExternalClicks);
    }
  };

  toggleCalendarVisibility = (visible: boolean) => {
    const calendarElement: HTMLDivElement | null = this.calendarRef.current;

    if (calendarElement) {
      if (visible === false) {
        calendarElement.style.display = "none";
      } else {
        calendarElement.style.display = "block";

        // Enable an event listener, listening for external clicks.
        window.addEventListener("click", this.listenForExternalClicks);
      }
    }
  };

  handleButtonClick: (event: React.FormEvent) => void = (event) => {
    event.preventDefault();
    this.toggleCalendarVisibility(true);
  };

  componentContainerRef: React.RefObject<HTMLDivElement>;
  calendarRef: React.RefObject<HTMLDivElement>;

  constructor(props: PropRules) {
    super(props);
    this.componentContainerRef = createRef();
    this.calendarRef = createRef();
  }

  render = () => {
    return (
      <div ref={this.componentContainerRef} className="date-selector-container">
        <SingleLineFormComponent
          value=""
          onButtonClick={this.handleButtonClick}
          buttonIconReference="fas fa-calendar-day"
        />
        <div className="row">
          <CalendarComponent
            id="date-selector-calendar"
            refer={this.calendarRef}
          />
        </div>
      </div>
    );
  };
}

export default DateSelectorComponent;

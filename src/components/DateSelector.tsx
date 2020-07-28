import React, { Component, createRef } from "react";
import SingleLineFormComponent from "./SingleLineForm";
import CalendarComponent from "./Calendar";
import "./../css/DateSelector.css";
import { connect } from "react-redux";
import SelectedDateReducer from "./../reducers/SelectedDate";

type ActionType = {
  type: string;
  payload: object;
};

interface StateRules {
  showCalendar: boolean;
}

interface PropRules {
  selectedDateReducer: any;
}

class DateSelectorComponent extends Component<PropRules, StateRules> {
  state = {
    showCalendar: false,
  };
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
    this.setState({ showCalendar: visible }, () => {
      if (this.state.showCalendar === true) {
        window.addEventListener("click", this.listenForExternalClicks);
      }
    });
  };

  handleLineFormRaise: (event: React.FormEvent) => void = (event) => {
    event.preventDefault();
    const { showCalendar } = this.state;
    this.toggleCalendarVisibility(showCalendar ? false : true);
  };

  componentContainerRef: React.RefObject<HTMLDivElement>;
  calendarRef: React.RefObject<HTMLDivElement>;

  constructor(props: PropRules) {
    super(props);
    this.componentContainerRef = createRef();
    this.calendarRef = createRef();
  }

  componentDidMount = () => {};

  render = () => {
    const { day, month, year } = this.props.selectedDateReducer;
    console.log("VIII", this.props.selectedDateReducer);
    return (
      <div ref={this.componentContainerRef} className="date-selector-container">
        <SingleLineFormComponent
          value={year + "-" + month + "-" + day}
          onButtonClick={this.handleLineFormRaise}
          buttonIconReference="fas fa-calendar-day"
          key={this.props.selectedDateReducer.day}
        />
        {this.state.showCalendar && (
          <div className="row">
            <CalendarComponent
              id="date-selector-calendar"
              refer={this.calendarRef}
              preset={[parseInt(day), parseInt(month) - 1, parseInt(year)]}
              onDateClick={() => this.toggleCalendarVisibility(false)}
            />
          </div>
        )}
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
    setCalendarVisibility: (isVisible: boolean) => {
      return dispatch();
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSelectorComponent);

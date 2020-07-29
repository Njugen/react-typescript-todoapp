import React, { Component, createRef } from "react";
import SingleLineFormComponent from "./SingleLineForm";
import CalendarComponent from "./Calendar";
import "./../css/DateSelector.css";
import { connect } from "react-redux";

interface StateRules {
  // decides wether to show the calendar (true) or not (false). Having it here instead of in redux store
  // for the sake of simplicity, and the fact that the value is not needed anywhere else.
  showCalendar: boolean;
}

interface PropRules {
  //The selectedDateReducer reducer, which provides the selected date based on changes done by given actions
  selectedDateReducer: any;
}

class DateSelectorComponent extends Component<PropRules, StateRules> {
  state = {
    showCalendar: false,
  };

  // Event listener, meant to be used in the window click event in order to hide the calendar
  // when the user clicks outside of the <DateSelectorComponent>
  private listenForExternalClicks: (event: MouseEvent) => void = (event) => {
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

  // Toggle/set the visibility of the calendar based on the "visible parameter"
  private toggleCalendarVisibility = (visible: boolean) => {
    this.setState({ showCalendar: visible }, () => {
      // Trigger this callback once the component state (not redux store!) has been changed

      // If the calendar is visible, add an event listener.
      if (this.state.showCalendar === true) {
        window.addEventListener("click", this.listenForExternalClicks);
      }
    });
  };

  // Meant to use in the onButtonClick prop of the <SingleLineformComponent. When that prop gets called,
  // this function should trigger and toggle the calendar's visibility on or off.
  private handleLineFormRaise: (event: React.FormEvent) => void = (event) => {
    // Stop the form line form from actually performing its intended task (submitting data + reloading page)
    event.preventDefault();

    const { showCalendar } = this.state;

    // Call the toggleCalendarVisibility function to toggle the calendar's visibility on the screen
    this.toggleCalendarVisibility(showCalendar ? false : true);
  };

  // Get the component's rendered jsx container by reference
  private componentContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: PropRules) {
    super(props);

    // Set a reference to the component's jsx container when it renders
    this.componentContainerRef = createRef();
  }

  render = () => {
    // Get day, month and year from props mappeed to props by redux.
    // Use these to build value and key props for <SingleLineFormComponent>
    const { day, month, year } = this.props.selectedDateReducer;
    const dateAsString: string = year + "-" + month + "-" + day;
    const { showCalendar } = this.state;

    return (
      <div ref={this.componentContainerRef} className="date-selector-container">
        <SingleLineFormComponent
          value={dateAsString}
          onButtonClick={this.handleLineFormRaise}
          buttonIconReference="fas fa-calendar-day"
          key={dateAsString}
        />
        {
          // Show/hide calendar based on the compojnent state
          showCalendar && (
            <div className="row">
              <CalendarComponent
                id="date-selector-calendar"
                preset={[parseInt(day), parseInt(month) - 1, parseInt(year)]}
                onDateClick={() => this.toggleCalendarVisibility(false)}
              />
            </div>
          )
        }
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    selectedDateReducer: state.SelectedDateReducer,
  };
};

export default connect(mapStateToProps)(DateSelectorComponent);

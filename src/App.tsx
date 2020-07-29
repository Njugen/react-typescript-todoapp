import React from "react";
import HeaderComponent from "./components/Header";
import StatusSectionComponent from "./components/StatusSection";
import DateSelectorComponent from "./components/DateSelector";

import AddTodoComponent from "./components/AddTodo";
import NoteListComponent from "./components/NoteList";

function App() {
  /* 
    App.tsx

    Setting up a basic JSX structure, containing separate components for Header, Status Section, Date Selector, Add Todo field, and Note list.
    In this app, no state data is needed in the App() component and no logic is needed to handle events in the components included.
  */
  return (
    <div className="container-fluid">
      <HeaderComponent />
      <div className="container" id="body-wrapper">
        <div className="row">
          <div className="col-4 mx-auto">
            <StatusSectionComponent text="todo-demo app is running!" />
          </div>
        </div>
        <div className="row">
          <div className="col-4 mx-auto">
            <DateSelectorComponent />
          </div>
        </div>
        <div className="row">
          <div className="col-8 mx-auto">
            <AddTodoComponent />
          </div>
        </div>
        <div className="row">
          <div className="col-8 mx-auto">
            <NoteListComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { Note, Notes, NotesAction } from "./../misc/customTypes";

const NotesReducer: (state: Notes, action: NotesAction) => void = (
  state = {},
  action
) => {
  const { type, payload } = action;

  if (type && payload) {
    const { dateKey, text, cleared, id } = payload;

    switch (type) {
      case "ADD_NOTE":
        let newId = 0;

        if (!Array.isArray(state[dateKey])) state[dateKey] = [];

        /*
        Get the highest id number currently existing, and use that as a new id as it will always be unique in the 
        note list array. Another solution could be to just use a random hex/string...
      */

        if (state[dateKey].length === 0) {
          newId = 0;
        } else {
          newId =
            Math.max(...state[dateKey].map((noteItem) => noteItem.id)) + 1;
        }

        state[dateKey].push({
          id: newId,
          text: text || "",
          cleared,
        });

        return { ...state };
      case "DELETE_NOTE":
        state[dateKey] = state[dateKey].filter(
          (noteItem) => noteItem.id !== id
        );

        // Remove the date from state, if it no longer contains notes.
        if (state[dateKey].length === 0) {
          delete state[dateKey];
        }

        return { ...state };
      case "GET_NOTE":
        return state;
      case "CLEAR_NOTE":
        if (state[dateKey]) {
          let targetItem: Note;
          targetItem = state[dateKey].filter(
            (noteItem, index) => noteItem.id === id
          )[0];

          // If cleared is not set ot true
          if (
            !targetItem.cleared ||
            (targetItem.cleared && targetItem.cleared !== true)
          ) {
            targetItem.cleared = true;
          } else {
            targetItem.cleared = false;
          }
        }
        return { ...state };
      default:
        return state;
    }
  }
  return state;
};

export default NotesReducer;

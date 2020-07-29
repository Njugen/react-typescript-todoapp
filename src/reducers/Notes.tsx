import { Note, Notes, NotesAction } from "./../misc/customTypes";

const NotesReducer: (state: Notes, action: NotesAction) => void = (
  state = {},
  action
) => {
  const { type } = action;

  switch (type) {
    case "ADD_NOTE":
      const { payload } = action;
      const { dateKey, text, cleared } = payload;

      let newId = 0;

      if (!Array.isArray(state[dateKey])) state[dateKey] = [];

      /*
        Get the highest id number currently existing, and use that as a new id as it will always be unique in the 
        note list array. Another solution could be to just use a random hex/string...
      */

      if (state[dateKey].length === 0) {
        newId = 0;
      } else {
        newId = Math.max(...state[dateKey].map((noteItem) => noteItem.id)) + 1;
      }

      state[dateKey].push({
        id: newId,
        text: text || "",
        cleared,
      });

      return { ...state };
    case "DELETE_NOTE":
      const { payload: payload2 } = action;
      const { dateKey: dateKey2, id: id2 } = payload2;

      state[dateKey2] = state[dateKey2].filter(
        (noteItem) => noteItem.id !== id2
      );

      // Remove the date from state, if it no longer contains notes.
      if (state[dateKey2].length === 0) {
        delete state[dateKey2];
      }

      return { ...state };
    case "GET_NOTE":
      return state;
    case "CLEAR_NOTE":
      const { payload: payload3 } = action;
      const { dateKey: dateKey3, id: id3 } = payload3;

      if (state[dateKey3]) {
        let targetItem: Note;
        targetItem = state[dateKey3].filter(
          (noteItem, index) => noteItem.id === id3
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
};

export default NotesReducer;

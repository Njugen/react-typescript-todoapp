type ActionType = {
  type: string;
  payload: {
    dateKey: string;
    text?: string;
    cleared?: boolean;
    id?: number;
  };
};

type Note = {
  id: number;
  text: string;
  cleared?: boolean;
};

type Notes = {
  [key: string]: Note[];
};

const NotesReducer: (state: Notes, action: ActionType) => void = (
  /*
        {
            [date-string]: []
        }
    */
  state = {
    "27081991": [
      { id: 0, text: "blablabla" },
      { id: 1, text: "blablabla" },
    ],
    "27081992": [
      { id: 0, text: "blablabla" },
      { id: 1, text: "blablabla" },
    ],
  },
  action
) => {
  const { type } = action;

  switch (type) {
    case "ADD":
      console.log("PAYLOAD", state);
      const { payload } = action;
      const { dateKey, text, cleared, id } = payload;

      let newId = 0;

      if (!Array.isArray(state[dateKey])) state[dateKey] = [];

      // Get the highest id number currently existing, and use that as a new id
      console.log("V", ...state[dateKey].map((noteItem) => noteItem.id));
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
    case "DELETE":
      const { payload: payload2 } = action;
      const { dateKey: dateKey2, id: id2 } = payload2;

      state[dateKey2] = state[dateKey2].filter(
        (noteItem) => noteItem.id !== id2
      );

      return { ...state };
    case "GET":
      return state;
    case "CLEAR":
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

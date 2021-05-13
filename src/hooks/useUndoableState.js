import { useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";

function undoable(state, action) {
  const { past, present, future } = state;

  switch (action.type) {
    case SET: {
      const newPast = [...past, present];
      return {
        ...state,
        past: newPast,
        present: action.payload,
      };
    }
    case UNDO: {
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      if (previous) {
        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }
      return state;
    }
    case REDO: {
      const next = future[0];
      const newFuture = future.slice(1);
      if (next) {
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export const useUndoableState = (initialState) => {
  const [state, dispatch] = useReducer(undoable, {
    past: [],
    present: initialState,
    future: [],
  });

  function redo() {
    dispatch({ type: REDO });
  }

  function undo() {
    dispatch({ type: UNDO });
  }

  function setState(value) {
    dispatch({ type: SET, payload: value });
  }

  return {
    state: state.present,
    setState,
    undo,
    redo,
    isUndoable: state.past.length > 0,
    isRedoable: state.future.length > 0,
  };
};

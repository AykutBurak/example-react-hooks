import { renderHook, act } from "@testing-library/react-hooks";
import { useUndoableState } from "./useUndoableState";
import faker from "faker";

test("should store initial state at present, and should not be undoable nor redoable", () => {
  const initialValue = faker.random.word();
  const { result } = renderHook(() => useUndoableState(initialValue));

  expect(result.current.state).toBe(initialValue);
  expect(result.current.isUndoable).toBe(false);
  expect(result.current.isRedoable).toBe(false);
});

test("should change present state with given value, should be undoable but not redoable", () => {
  const initialValue = faker.random.word();
  const newValue = faker.random.word();

  const { result } = renderHook(() => useUndoableState(initialValue));
  act(() => {
    result.current.setState(newValue);
  });

  expect(result.current.state).toBe(newValue);
  expect(result.current.isUndoable).toBe(true);
  expect(result.current.isRedoable).toBe(false);
});

test("should set present to last value when undo called, redoable after undo valled but not undoable", () => {
  const initialValue = faker.random.word();
  const newValue = faker.random.word();

  const { result } = renderHook(() => useUndoableState(initialValue));
  act(() => {
    result.current.setState(newValue);
  });
  expect(result.current.state).toBe(newValue);
  act(() => {
    result.current.undo();
  });
  expect(result.current.state).toBe(initialValue);
  expect(result.current.isUndoable).toBe(false);
  expect(result.current.isRedoable).toBe(true);
});

test("should set present to next value when redo called, should be undoable but not redoable", () => {
  const initialValue = faker.random.word();
  const newValue = faker.random.word();

  const { result } = renderHook(() => useUndoableState(initialValue));
  act(() => {
    result.current.setState(newValue);
  });
  expect(result.current.state).toBe(newValue);
  act(() => {
    result.current.undo();
  });
  expect(result.current.state).toBe(initialValue);
  act(() => {
    result.current.redo();
  });
  expect(result.current.state).toBe(newValue);
  expect(result.current.isUndoable).toBe(true);
  expect(result.current.isRedoable).toBe(false);
});

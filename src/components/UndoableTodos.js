import React from "react";
import faker from "faker";
import { useUndoableState } from "../hooks/useUndoableState";
import { TodoItem } from "./TodoItem";

export const UndoableTodos = () => {
  const {
    state: todos,
    setState: setTodos,
    redo,
    undo,
    isRedoable,
    isUndoable,
  } = useUndoableState([]);

  function addTodo() {
    const todoText = faker.lorem.sentence();
    setTodos([
      ...todos,
      {
        text: todoText,
        isDone: false,
        id: faker.datatype.uuid(),
      },
    ]);
  }

  function setIsDone(id, isDone) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isDone } : todo)),
    );
  }

  return (
    <div>
      Showcase of undoable state;
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            setIsDone={(isDone) => setIsDone(todo.id, isDone)}
          />
        ))}
      </ul>
      <button onClick={addTodo}>Add new todo</button>
      <button onClick={undo} disabled={!isUndoable}>
        Undo
      </button>
      <button onClick={redo} disabled={!isRedoable}>
        Redo
      </button>
    </div>
  );
};

import React from "react";

export const TodoItem = ({ text, isDone, setIsDone }) => {
  return (
    <li>
      <span>{text}</span>
      <input
        type="checkbox"
        checked={isDone}
        onChange={(e) => setIsDone(e.target.checked)}
      />
    </li>
  );
};

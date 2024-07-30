import React from "react";

function TodoItem({ todo, onEditTodo, onDeleteTodo, onToggleComplete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={ todo.completed }
        onChange={ () => onToggleComplete(todo.id) }
      />
      { todo.text }
      <button
        onClick={ () => onEditTodo(todo) }>
        Edit
      </button>
      <button
        onClick={ () => onDeleteTodo(todo.id) }>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;

import React from "react";

function TodoItem({ todo, onEditTodo, onDeleteTodo, onToggleComplete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          className="me-2"
          checked={ todo.completed }
          onChange={ () => onToggleComplete(todo.id) }
        />
        { todo.text }
      </div>
      <div>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={ () => onEditTodo(todo) }>
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={ () => onDeleteTodo(todo.id) }>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;

import React from "react";

function TodoItem({ todo, onEditTodo, onDeleteTodo }) {
  return (
    <li>
      { todo.text }
      <button onClick={ () => onEditTodo(todo) }>Edit</button>
      <button onClick={ () => onDeleteTodo(todo.id) }>Delete</button>
    </li>
  );
}

export default TodoItem;

import React from "react";
import TodoItem from "./TodoItem"

function TodoList({ todos, onEditTodo, onDeleteTodo }) {
  return (
    <ul>
      { todos.map(todo => (
        <TodoItem
          key={ todo.id }
          todo={ todo }
          onEditTodo={ onEditTodo }
          onDeleteTodo={ onDeleteTodo }
        />
      )) }
    </ul>
  );
}

export default TodoList;

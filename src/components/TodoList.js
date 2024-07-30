import React from "react";
import TodoItem from "./TodoItem"

function TodoList({ todos, onEditTodo, onDeleteTodo, onToggleComplete }) {
  return (
    <ul className="list-group">
      { todos.map(todo => (
        <TodoItem
          key={ todo.id }
          todo={ todo }
          onEditTodo={ onEditTodo }
          onDeleteTodo={ onDeleteTodo }
          onToggleComplete={ onToggleComplete }
        />
      )) }
    </ul>
  );
}

export default TodoList;

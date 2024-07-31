import React from "react";
import TodoItem from "./TodoItem"

function TodoList({ todos, onDeleteTodo, onSaveEditTodo, onToggleComplete }) {
  return (
    <ul className="list-group">
      { todos.map(todo => (
        <TodoItem
          key={ todo.id }
          todo={ todo }
          onDeleteTodo={ onDeleteTodo }
          onSaveEditTodo={ onSaveEditTodo }
          onToggleComplete={ onToggleComplete }
        />
      )) }
    </ul>
  );
}

export default TodoList;

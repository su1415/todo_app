import React, { useState } from "react";
import TodoItem from "./TodoItem"

function TodoList({ todos, onDeleteTodo, onSaveEditTodo, onToggleComplete }) {
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div>
      <ul className="list-group">
        { todos.filter(todo => !todo.completed).map(todo => (
          <TodoItem
            key={ todo.id }
            todo={ todo }
            onDeleteTodo={ onDeleteTodo }
            onSaveEditTodo={ onSaveEditTodo }
            onToggleComplete={ onToggleComplete }
          />
        )) }
      </ul>
      <button
        className="btn btn-secondary mt-3"
        onClick={ () => setShowCompleted(!showCompleted) }>
        { showCompleted ? "Hide Completed" : "Show Completed" }
      </button>
      { showCompleted && (
        <ul className="list-group mt-3">
          { todos.filter(todo => todo.completed).map(todo => (
            <TodoItem
              key={ todo.id }
              todo={ todo }
              onDeleteTodo={ onDeleteTodo }
              onSaveEditTodo={ onSaveEditTodo }
              onToggleComplete={ onToggleComplete }
            />
          )) }
        </ul>
      )}
    </div>
  );
}

export default TodoList;

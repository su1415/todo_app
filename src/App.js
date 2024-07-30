import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState(loadTodosFromLocalStorage());
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoDueDate, setNewTodoDueDate] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = () => {
    if ( newTodoText.trim() !== "" && newTodoDueDate.trim() !== "" ) {
      setTodos([...todos, { id: Date.now(), text: newTodoText, dueDate: newTodoDueDate, completed: false }]);
      setNewTodoText("");
      setNewTodoDueDate("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setEditTodo({ ...todo });
  };

  const handleSaveEditTodo = () => {
    setTodos(
      todos.map(todo =>
        todo.id === editTodo.id ? { ...todo, text: editTodo.text, dueDate: editTodo.dueDate } : todo
      )
    );
    setEditTodo(null);
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App container mt-5">
      <h1 className="text-center">ToDo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New ToDo"
          value={ newTodoText }
          onChange={(e) => setNewTodoText(e.target.value) }
        />
        <input
          type="date"
          className="form-control"
          placeholder="Due Date"
          value={ newTodoDueDate }
          onChange={(e) => setNewTodoDueDate(e.target.value) }
        />
        <button
          className="btn btn-primary"
          onClick={ handleAddTodo }>
          Add
        </button>
      </div>
      <TodoList
        todos={ todos }
        onEditTodo={ handleEditTodo }
        onDeleteTodo={ handleDeleteTodo }
        onToggleComplete={ handleToggleComplete }
      />
      { editTodo && (
        <div className="mt-3">
          <input
            type="text"
            className="form-control mb-2"
            value={ editTodo.text }
            onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value }) }
          />
          <input
            type="date"
            className="form-control mb-2"
            value={ editTodo.dueDate }
            onChange={(e) => setEditTodo({ ...editTodo, dueDate: e.target.value }) }
          />
          <button
            className="btn btn-success me-2"
            onClick={ handleSaveEditTodo }>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={ () => setEditTodo(null) }>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    return JSON.parse(savedTodos);
  }
  return [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export default App;

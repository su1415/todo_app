import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState(loadTodosFromLocalStorage());
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoDueDate, setNewTodoDueDate] = useState("");

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = () => {
    if ( newTodoText.trim() !== "" && newTodoDueDate.trim() !== "" ) {
      const newTodos = [...todos, { id: Date.now(), text: newTodoText, dueDate: newTodoDueDate, completed: false }];
      setTodos(sortTodos(newTodos));
      setNewTodoText("");
      setNewTodoDueDate("");
    }
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(sortTodos(newTodos));
  };

  const handleSaveEditTodo = (id, text, dueDate) => {
    const newTodos =
      todos.map(todo =>
        todo.id === id ? { ...todo, text, dueDate } : todo
      );
    setTodos(sortTodos(newTodos));
  };

  const handleToggleComplete = (id) => {
    const newTodos =
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    setTodos(sortTodos(newTodos));
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
        onDeleteTodo={ handleDeleteTodo }
        onSaveEditTodo={ handleSaveEditTodo }
        onToggleComplete={ handleToggleComplete }
      />
    </div>
  );
}

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    return sortTodos(JSON.parse(savedTodos));
  }
  return [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const sortTodos = (todos) => {
  // 未完了と完了済のToDo
  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completeTodos = todos.filter(todo => todo.completed);

  // それぞれを日付順にソート
  incompleteTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  completeTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return [...incompleteTodos, ...completeTodos];
};

export default App;

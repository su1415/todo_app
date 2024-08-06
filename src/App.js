import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todos, setTodos] = useState(loadTodosFromLocalStorage());
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoDueDate, setNewTodoDueDate] = useState("");
  const [filter, setFilter] = useState(loadFilterFromLocalStorage());

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  useEffect(() => {
    saveFilterToLocalStorage(filter);
  }, [filter]);

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

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "incompleted") return !todo.completed;
    return true;
  });

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
      <div className="mb-3">
        <button
          className="btn btn-secondary me-2"
          onClick={ () => setFilter("all") }>
          All
        </button>
        <button
          className="btn btn-secondary me-2"
          onClick={ () => setFilter("completed") }>
          Completed
        </button>
        <button
          className="btn btn-secondary"
          onClick={ () => setFilter("incompleted") }>
          Incompleted
        </button>
      </div>
      <TodoList
        todos={ filteredTodos }
        onDeleteTodo={ handleDeleteTodo }
        onSaveEditTodo={ handleSaveEditTodo }
        onToggleComplete={ handleToggleComplete }
      />
    </div>
  );
}

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? sortTodos(JSON.parse(savedTodos)) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadFilterFromLocalStorage = () => {
  const savedfilter = localStorage.getItem("filter");
  return savedfilter ? savedfilter : "all";
};

const saveFilterToLocalStorage = (filter) => {
  localStorage.setItem("filter", filter);
};

const sortTodos = (todos) => {
  return todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

export default App;

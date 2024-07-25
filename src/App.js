import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList"
import "./App.css";

function App() {
  const [todos, setTodos] = useState(loadTodosFromLocalStorage());
  const [newTodoText, setNewTodoText] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = () => {
    if ( newTodoText.trim() !== "" ) {
      setTodos([...todos, { id: Date.now(), text: newTodoText }]);
      setNewTodoText("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setEditTodoText(todo.text);
  };

  const handleSaveEditTodo = () => {
    setTodos(
      todos.map(todo =>
        todo.id === editTodo.id ? { ...todo, text: editTodoText } : todo
      )
    );
    setEditTodo(null);
    setEditTodoText("");
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <input
        type="text"
        value={ newTodoText }
        onChange={(e) => setNewTodoText(e.target.value) }
      />
      <button onClick={ handleAddTodo }>Add</button>
      <TodoList
        todos={ todos }
        onEditTodo={ handleEditTodo }
        onDeleteTodo={ handleDeleteTodo }
      />
      { editTodo && (
        <div>
          <input
            type="text"
            value={ editTodoText }
            onChange={(e) => setEditTodoText(e.target.value) }
          />
          <button onClick={ handleSaveEditTodo }>Save</button>
          <button onClick={ () => setEditTodo(null) }>Cancel</button>
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

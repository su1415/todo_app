import React, { useState } from "react";
import TodoList from "./components/TodoList"
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "sample1" },
    { id: 2, text: "sample2" },
  ])
  const [newTodoText, setNewTodoText] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

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

export default App;

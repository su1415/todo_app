import React, { useState } from "react";
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "sample1" },
    { id: 2, text: "sample2" },
  ])
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if ( newTodoText.trim() !== "" ) {
      setTodos([...todos, { id: Date.now(), text: newTodoText }]);
      setNewTodoText("");
    }
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
      <TodoList todos={ todos } />
    </div>
  );
}

export default App;

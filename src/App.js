import React, { useState } from "react";
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "sample1" },
    { id: 2, text: "sample2" },
  ])

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <TodoList todos={ todos } />
    </div>
  );
}

export default App;

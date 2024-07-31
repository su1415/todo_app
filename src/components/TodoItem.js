import React, { useState } from "react";

function TodoItem({ todo, onDeleteTodo, onSaveEditTodo, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(todo);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditTodo(todo);
  };

  const handleSaveClick = () => {
    onSaveEditTodo(editTodo.id, editTodo.text, editTodo.dueDate);
    setIsEditing(false);
  };

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? "completed" : ""}`}>
      <div className="d-flex">
        <input
          type="checkbox"
          className="me-2 custom-checkbox"
          checked={ todo.completed }
          onChange={ () => onToggleComplete(todo.id) }
          disabled={ isEditing }
        />
      </div>
      <div className="d-flex align-items-center flex-grow-1">
        { isEditing ? (
          <>
            <input
              type="text"
              value={ editTodo.text }
              onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
              className="form-control me-2 flex-grow-1"
            />
            <input
              type="date"
              value={ editTodo.dueDate }
              onChange={(e) => setEditTodo({ ...editTodo, dueDate: e.target.value })}
              className="form-control due-date"
              style={{ width: '150px' }}
              disabled={ !isEditing }
            />
          </>
        ) : (
          <span className={ todo.completed ? "text-decoration-line-through" : "" }>
            { todo.text } - <small>{ todo.dueDate }</small>
          </span>
        )}
      </div>
      <div className="d-flex align-items-center">
        { isEditing ? (
          <>
            <button
              className="btn btn-success btn-sm me-2 fixed-width"
              onClick={ handleSaveClick }>
              Save
            </button>
            <button
              className="btn btn-secondary btn-sm fixed-width"
              onClick={ handleEditToggle }>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-warning btn-sm me-2 fixed-width"
              onClick={ handleEditToggle }>
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm fixed-width"
              onClick={ () => onDeleteTodo(todo.id) }>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;

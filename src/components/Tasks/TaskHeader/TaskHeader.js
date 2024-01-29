import React, { useState } from 'react';
import "./TaskHeader.scss";

function TaskHeader(props) {
  const [newTasks, setNewTasks] = useState({
    newTaskName: "",
    newTaskDate: getTodayDate(),
  });

  function updateNewTask(event) {
    setNewTasks((prev) => ({ ...prev, newTaskName: event.target.value }));
  }

  function saveNewTask() {
    const formattedDate = formatDate(newTasks.newTaskDate);
    props.createNewTaskCallback({
      newTaskName: newTasks.newTaskName,
      date: formattedDate,
      color: "secondary",
    });
    setNewTasks((prev) => ({ ...prev, newTaskName: "", newTaskDate: getTodayDate() }));
  }

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}.${month}`;
  }

  return (
    <div className="container">
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">Task:</span>
          <input
            type="text"
            className='form-control'
            id='task-name'
            placeholder='Task name'
            value={newTasks.newTaskName}
            onChange={updateNewTask}
          />
          <input
            type="date"
            className='form-control form-control-sm  '
            id="task-date"
            onChange={(e) => setNewTasks((prev) => ({ ...prev, newTaskDate: e.target.value }))}
          />
          <button
            className='btn btn-success btn-sm'
            type='button'
            id='button-save'
            onClick={saveNewTask}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskHeader;

import React, { useState, useEffect } from 'react';
import "./TaskHeader.scss";

function TaskHeader(props) {
  const [newTasks, setNewTasks] = useState({
    newTaskName: "",
    newTaskDate: getTodayDate(),
    newTaskStatus: "", 
  });

  const taskColors = [
    { status: "to-do", color: "warning" },
    { status: "planed", color: "secondary" },
    { status: "in-progress", color: "primary" },
    { status: "done", color: "success" }
  ];

  const [defaultValuesSet, setDefaultValuesSet] = useState(false);

  useEffect(() => {
    if (!defaultValuesSet) {
      setNewTasks((prev) => ({ ...prev, newTaskStatus: "to-do" }));
      setDefaultValuesSet(true);
    }
  }, [defaultValuesSet]);

  function getTaskColor(taskStatus) {
    const matchingColor = taskColors.find((item) => item.status === taskStatus);
    return matchingColor ? matchingColor.color : "secondary";
  }

  function updateNewTask(event) {
    setNewTasks((prev) => ({ ...prev, newTaskName: event.target.value }));
  }

  function saveNewTask() {
    const formattedDate = formatDate(newTasks.newTaskDate);

    props.createNewTaskCallback({
      newTaskName: newTasks.newTaskName,
      nonFormattedDate: newTasks.newTaskDate,
      date: formattedDate,
      color: getTaskColor(newTasks.newTaskStatus),
      status: newTasks.newTaskStatus,
    });

    setNewTasks((prev) => ({ ...prev, newTaskName: "" }));
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
    <div className="container mt-0 mt-lg-4">
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">Task:</span>
          <input
            type="text"
            className='form-control w-auto'
            id='task-name'
            placeholder='Task name'
            value={newTasks.newTaskName}
            onChange={updateNewTask}
            maxLength={30}
          />
          <input
            type="date"
            className='form-control form-control-sm ps-2'
            id="task-date"
            onChange={(e) => setNewTasks((prev) => ({ ...prev, newTaskDate: e.target.value }))}
            min={getTodayDate()}
          />
          <select
            id="taskStatus"
            onChange={(e) => setNewTasks((prev) => ({ ...prev, newTaskStatus: e.target.value }))}
            className='form-select ps-3 select-status'>
            <option value="to-do">To do</option>
            <option value="planed">Planed</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
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

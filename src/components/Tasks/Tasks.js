import React from 'react';
import "./Tasks.scss";
import TaskHeader from './TaskHeader/TaskHeader';
import TaskItem from './TaskItem/TaskItem';

function Tasks() {
  const [tasks, setTasks] = React.useState([
    { id: 0, name: "Task 1", user: "Darek", status: "ToDo", color: "primary" },
    { id: 1, name: "Task 2", user: "Figiel", status: "Done", color: "success" }
  ]);

  function getTaskItems() {
    return tasks.map(item => <TaskItem key={item.id} {...item} />);
  }

  function createNewTask(task) {
    const newId = tasks.length;
    setTasks(prevTasks => [
      ...prevTasks,
      { id: newId, name: task.newTaskName, user: task.user, status: "in progress", color: task.color }
    ]);
  }

  return (
    <div className="tasksContainer">
      <TaskHeader createNewTaskCallback={createNewTask} />
      <div className='my-3 mx-2 p-3 bg-body rounded shadow-sm'>
        {getTaskItems()}
      </div>
    </div>
  );
}

export default Tasks;

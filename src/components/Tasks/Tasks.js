import React from 'react';
import "./Tasks.scss";
import TaskHeader from './TaskHeader/TaskHeader';
import TaskItem from './TaskItem/TaskItem';

function Tasks() {
    const [tasks, setTasks] = React.useState([
      { id: 0, name: "Task 1", date: "30.01", status: "ToDo", color: "primary" },
      { id: 1, name: "Task 2", date: "03.02", status: "Done", color: "success" }
    ]);
  
    function getTaskItems() {
      return tasks.map(item => <TaskItem key={item.id} {...item} deleteNewTaskCallback={deleteTask} />);
    }
  
    function createNewTask(task) {
      const newId = tasks.length;
      setTasks(prevTasks => [
        ...prevTasks,
        { id: newId, name: task.newTaskName, date: task.date, status: "in progress", color: task.color }
      ]);
    }
  
    function deleteTask(taskId) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    }
  
    return (
      <div className="tasksContainer">
        <TaskHeader createNewTaskCallback={createNewTask} />
        <div className='my-3 mx-2 p-3 bg-body rounded shadow-sm tasksListContainer'>
          {tasks.length > 0 ? getTaskItems() : <h5 className='text-center'>Wszystkie zadania wykonane!</h5>}
        </div>
      </div>
    );
  }
  

export default Tasks;

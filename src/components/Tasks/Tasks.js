import React from 'react';
import "./Tasks.scss";
import TaskHeader from './TaskHeader/TaskHeader';
import TaskItem from './TaskItem/TaskItem';

function Tasks() {
    const [tasks, setTasks] = React.useState([
      { id: 0, name: "Task 1", date: "30.01", status: "To-do", color: "warning" },
      { id: 1, name: "Task 2", date: "03.02", status: "Done", color: "success" }
    ]);
    const [editingTaskId, setEditingTaskId] = React.useState(null);
    
    function getTaskItems() {
      return tasks.map((item, index) => (
        <TaskItem 
          key={item.id} 
          id={index} 
          {...item} 
          deleteNewTaskCallback={deleteTask} 
          editingTaskId={editingTaskId} 
          setEditingTaskId={setEditingTaskId} 
        />
      ));
    }
  
    function createNewTask(task) {
      const newId = tasks.length;
      setTasks(prevTasks => [
        ...prevTasks,
        { id: newId, name: task.newTaskName, date: task.date,nonFormattedDate: task.nonFormattedDate, status: task.status, color: task.color }
      ]);
    }
  
    function deleteTask(taskId) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      
      const updatedTasksWithNumbers = updatedTasks.map((task, index) => ({ ...task, id: index }));
      
      setTasks(updatedTasksWithNumbers);
    }
  
    return (
      <div className="tasksContainer">
        <TaskHeader createNewTaskCallback={createNewTask} />
        <div className='mx-0 mx-lg-2 p-3 bg-body rounded shadow-sm h-75 mt-0 mt-lg-4 tasksListContainer mb-5'>
          {tasks.length > 0 ? getTaskItems() : <h5 className='text-center'>Wszystkie zadania wykonane!</h5>}
        </div>
      </div>
    );
}

export default Tasks;

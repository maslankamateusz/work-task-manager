import React from 'react';
import "./TaskHeader.scss";

function TaskHeader(props){

    const [newTasks, setNewTasks] = React.useState([
        { newTaskName: ""}
      ]);

    function updateNewTask(event){
        setNewTasks({newTaskName: event.target.value})
    }
    function saveNewTask(){
        props.createNewTaskCallback({
            newTaskName: newTasks.newTaskName,
            user: "kfiatek darek",
            color: "danger"
        });
        setNewTasks({newTaskName: ""});
    }
    return(
        <div className="container">
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <div className="input-group input-group-sm">
                    <span className="input-group-text bg-light">Task:</span>
                    <input type="text" className='form-control' id='task-name'
                    placeholder='Task info'  value={newTasks.newTaskName} onChange={updateNewTask}/>
                    <button className='btn btn-success btn-sm' type='button' id='button-save' onClick={saveNewTask}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default TaskHeader;
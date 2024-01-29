import React from 'react';
import "./TaskItem.scss";

function TaskItem(props){

    function deleteTask(){
        let taskId = props.id;
        props.deleteNewTaskCallback(taskId);
    }

    return (
        <div className='d-flex pt-2 border-bottom' id={props.id}>
            <p className='flex-grown-1 mb-0 pb-3 mx-2 small lh-sm text-start'>
                <strong className='d-block my-1'>
                    <span className={"badge bg-"+ props.color}>
                        {props.status}
                    </span>
                    <span className="mx-2 ">
                        {props.date}
                    </span>
                </strong>
                {props.name}
            </p>
            <div className='m-1'>
                <button className='btn btn-sm btn-outline-danger' onClick={deleteTask}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default TaskItem;

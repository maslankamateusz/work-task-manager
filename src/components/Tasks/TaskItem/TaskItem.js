import React from 'react';
import "./TaskItem.scss";

function TaskItem(props){
    return (
        <div className='d-flex pt-2 border-bottom'>
            <p className='flex-grown-1 mb-0 pb-3 mx-2 small lh-sm text-start'>
                <strong className='d-block my-1'>
                    <span className={"badge bg-"+ props.color}>
                        {props.status}
                    </span>
                    <span className="mx-1">
                        @{props.user}
                    </span>
                </strong>
                {props.name}
            </p>
            <div className='m-1'>
                <button className='btn btn-sm btn-outline-danger'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default TaskItem;

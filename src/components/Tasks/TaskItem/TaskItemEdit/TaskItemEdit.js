import React, { useEffect, useRef } from 'react';
import "./TaskItemEdit.scss";

function TaskItemEdit(props) {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    console.log(props);
    return (
        <div>
            <div className="container border-bottom ">
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-light">Task {props.id+1}:</span>
                        <input
                            ref={inputRef}
                            type="text"
                            className='form-control w-auto'
                            id='task-name'
                            placeholder='Task name'
                            value={props.name}
                            maxLength={30}
                        />
                        <input
                            type="date"
                            className='form-control form-control-sm ps-2'
                            id="task-date"
                            value={props.nonFormattedDate}
                        />
                        <select
                            id="taskStatus"
                            className='form-select ps-3 select-status'
                            value={props.status.toLowerCase()}>
                            <option value="to-do">To do</option>
                            <option value="planed">Planned</option>
                            <option value="in-progress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                        <button
                            className='btn btn-dark btn-sm'
                            type='button'
                            id='button-save'
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskItemEdit;

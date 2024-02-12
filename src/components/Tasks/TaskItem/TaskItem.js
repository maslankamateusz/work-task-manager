import React from 'react';
import "./TaskItem.scss";
import TaskItemEdit from "./TaskItemEdit/TaskItemEdit";

function TaskItem(props) {
    const [isEditing, setIsEditing] = React.useState(false);

    function deleteTask() {
        let taskId = props.id;
        props.deleteNewTaskCallback(taskId);
    }

    function editTask() {
        props.setEditingTaskId(props.id);
        setIsEditing(true);
    }

    function getTaskNumber() {
        return `Task: ${props.id + 1}`;
    }

    return (
        <div>
            {isEditing ? (
                <TaskItemEdit {...props} setIsEditing={setIsEditing} />
            ) : (
                <div className='d-flex pt-2 border-bottom justify-content-between' id={props.id}>
                    <div className='w-20'>
                        <p className='flex-grown-1 mb-0 pb-3 mx-2 small lh-sm text-start'>
                            <strong className='d-block my-1'>
                                <span className={"badge bg-" + props.color}>
                                    {props.status.charAt(0).toUpperCase() + props.status.slice(1).toLowerCase()}
                                </span>
                                <span className="mx-2 ">
                                    {props.date}
                                </span>
                            </strong>
                            {getTaskNumber()}
                        </p>
                    </div>
                    <div className='mt-0 w-50 me-5 text-start d-flex align-items-center'>
                        <p className='fs-3 '>{props.name}</p>
                    </div>
                    <div className='me-3 mt-2 ' >
                        <button className='btn btn-sm btn-outline-success me-2' onClick={editTask}>
                            Edit
                        </button>
                        <button className='btn btn-sm btn-outline-danger ' onClick={deleteTask}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;

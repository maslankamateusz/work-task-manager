import {useState} from 'react';
import "./TaskItemEdit.scss";
import {getTaskColor, formatDate} from "../../taskUtils/taskUtils.js";

function TaskItemEdit(props) {
    const [editTasks, setEditTasks] = useState({
        editTaskName: props.name,
        editTaskDate: props.nonFormattedDate,
        editTaskStatus: props.status,
    });
    
    function saveEditTask() {
        const updateEditedTask = {
            name: editTasks.editTaskName,
            date: formatDate(editTasks.editTaskDate),
            nonFormattedDate: editTasks.editTaskDate,
            status: editTasks.editTaskStatus,
            color: getTaskColor(editTasks.editTaskStatus)
        };
        props.editTask(props._id, updateEditedTask);
        props.setIsEditing(false);  
    }

    return (
        <div>
            <div className="container border-bottom ">
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-light">Task {props.id + 1}:</span>
                        <input
                            type="text"
                            className="form-control w-auto"
                            id="task-name"
                            placeholder="Task name"
                            value={editTasks.editTaskName}
                            maxLength={30}
                            onChange={(e) => setEditTasks({ ...editTasks, editTaskName: e.target.value })}
                        />
                        <input
                            type="date"
                            className="form-control form-control-sm ps-2"
                            id="task-date"
                            value={editTasks.editTaskDate}
                            onChange={(e) => setEditTasks({ ...editTasks, editTaskDate: e.target.value })}
                        />
                        <select
                            id="taskStatus"
                            className="form-select ps-3 select-status"
                            value={editTasks.editTaskStatus}
                            onChange={(e) => setEditTasks({ ...editTasks, editTaskStatus: e.target.value })}
                        >
                            <option value="to-do">To do</option>
                            <option value="planed">Planned</option>
                            <option value="in-progress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                        <button className="btn btn-dark btn-sm" type="button" id="button-save" onClick={saveEditTask}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskItemEdit;


import React from 'react';
import "./TaskItemEdit.scss";

function TaskItemEdit(props) {
    const [editTasks, setEditTasks] = React.useState({
        editTaskName: props.name,
        editTaskDate: props.nonFormattedDate,
        editTaskStatus: props.status,
    });

    const taskColors = [
        { status: "to-do", color: "warning" },
        { status: "planed", color: "secondary" },
        { status: "in-progress", color: "primary" },
        { status: "done", color: "success" },
    ];

    function getTaskColor(taskStatus) {
        const matchingColor = taskColors.find((item) => item.status === taskStatus);
        return matchingColor ? matchingColor.color : "secondary";
    }

    function saveEditTask() {
        props.editTask({
            editedTaskId: props.id,
            editedTaskName: editTasks.editTaskName,
            editedNonFormattedDate: editTasks.editTaskDate,
            editedDate: formatDate(editTasks.editTaskDate),
            editedColor: getTaskColor(editTasks.editTaskStatus),
            editedStatus: editTasks.editTaskStatus
        });
        setEditTasks({ editTaskName: "", editTaskDate: "", editTaskStatus: "" });
        props.setIsEditing(false);
    }

    function formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}.${month}`;
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
                            value={String(editTasks.editTaskDate)}
                            onChange={(e) => setEditTasks({ ...editTasks, editTaskDate: e.target.value })}
                        />
                        <select
                            id="taskStatus"
                            className="form-select ps-3 select-status"
                            value={editTasks.editTaskStatus.toLowerCase()}
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

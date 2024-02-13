import React, { useEffect } from 'react';
import "./Tasks.scss";
import TaskHeader from './TaskHeader/TaskHeader';
import TaskItem from './TaskItem/TaskItem';

function Tasks() {
    const [tasks, setTasks] = React.useState([]);
    const [editingTaskId, setEditingTaskId] = React.useState(null);

    useEffect(() => {
        if (tasks.length === 0) {
            fetchTasksFromServer();
        }
    }, [tasks]);

    const fetchTasksFromServer = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasksData = await response.json();
            setTasks(tasksData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const editTask = (taskId, updatedTask) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, ...updatedTask };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const saveEditedTask = async (taskId, updatedTask) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        const updatedTasksWithNumbers = updatedTasks.map((task, index) => ({ ...task, id: index }));
        setTasks(updatedTasksWithNumbers);
    };

    const createNewTask = (task) => {
        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: task.newTaskName,
                date: task.date,
                nonFormattedDate: task.nonFormattedDate,
                status: task.status,
                color: task.color
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create new task');
            }
            console.log('New task created successfully');
            return response.json();
        })
        .then(newTask => {
            setTasks(prevTasks => [
                ...prevTasks,
                newTask
            ]);
        })
        .catch(error => {
            console.error('Error creating new task:', error);
        });
    };

    const getTaskItems = () => {
        if (tasks.length === 0) return null; 
        return tasks.map((item, index) => (
            <TaskItem
                key={item._id} 
                id={index} 
                {...item}
                nonFormattedDate={editingTaskId !== null ? tasks[editingTaskId].nonFormattedDate : null}
                deleteNewTaskCallback={deleteTask}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                editTask={editTask}
                saveEditedTask={saveEditedTask}
            />
        ));
    };

    return (
        <div className="tasksContainer">
            <TaskHeader createNewTaskCallback={createNewTask} />
            <div className='mx-0 mx-lg-2 p-3 bg-body rounded shadow-sm h-75 mt-0 mt-lg-4 tasksListContainer mb-5'>
                {getTaskItems() || <h5 className='text-center'>Wszystkie zadania wykonane!</h5>}
            </div>
        </div>
    );
}

export default Tasks;

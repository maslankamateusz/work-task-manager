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
            throw error; 
        }
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
            setTasks(prevTasks => [...prevTasks, newTask]); 
        })
        .catch(error => {
            console.error('Error creating new task:', error);
        });
    };

    const editTask = async (taskId, task) => {
        try {
            
            await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            await fetchTasksFromServer();
        } catch (error) {
            console.error('Error editing task:', error);
        }
    }

    const deleteTask = async (taskId) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/delete/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await fetchTasksFromServer();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
    

    const getTaskItems = () => {
        if (tasks.length === 0) return null; 
        return tasks.map((item, index) => (
            <TaskItem
                key={item._id} 
                id={index} 
                {...item}
                nonFormattedDate={editingTaskId !== null ? tasks[editingTaskId].nonFormattedDate : null}
                deleteTask={deleteTask}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                editTask={editTask}
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

import { useState, useEffect } from 'react';
import TaskHeader from './TaskHeader/TaskHeader';
import TaskItem from './TaskItem/TaskItem';


function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [daySummaryId, setDaySummaryId ] = useState(null);

    useEffect(() => {
        fetchTasksFromServer();
    }, []);
    

    function fetchTasksFromServer() {
        fetch('http://localhost:5000/api/tasks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                return response.json();
            })
            .then(tasksData => {
                setTasks(tasksData);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
                throw error;
            });

        fetch('http://localhost:5000/api/daysummary')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                return response.json();
            })
            .then(data => {
                setDaySummaryId(data._id);
            })
            .catch(error => {
                console.error('Error fetching 2:', error);
                throw error;
            });
            
    }
    
    
    function createNewTask(task) {
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
                color: task.color,
                summaryId: daySummaryId
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
    }

    function editTask(taskId, task) {
        fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit task');
            }
            console.log('Task edited successfully');
            setTasks(prevTasks => {
                const index = prevTasks.findIndex(t => t._id === taskId);
                if (index !== -1) {
                    const updatedTasks = [...prevTasks];
                    updatedTasks[index] = { _id: taskId, ...task };
                    return updatedTasks;
                } else {
                    return prevTasks;
                }
            });
        })
        .catch(error => {
            console.error('Error editing task:', error);
        });
    }
    

    function deleteTask(taskId) {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        fetch('http://localhost:5000/api/tasks/del', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: taskId,
                summaryId: daySummaryId
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            console.log('Task deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    }
    
    
    function getTaskItems() {
        if (tasks.length === 0) return null;
        
        console.log(tasks);
        return tasks.map((item, index) => (
            <TaskItem
                key={item._id}
                id={index}
                {...item}
                nonFormattedDate={editingTaskId !== null ? tasks[editingTaskId].nonFormattedDate : null}
                deleteTask={deleteTask}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                editTask={editTask} />
        ));
    }
    return (
        <div className="ms-2 h-full w-full">
            <TaskHeader createNewTaskCallback={createNewTask} />
            <div className='mx-0 mx-lg-2 p-3 bg-body rounded shadow-sm h-4/5 mt-0 mt-lg-4 tasksListContainer overflow-y-auto'>
                {getTaskItems() || <h5 className='text-center'>Wszystkie zadania wykonane!</h5>}
            </div>
        </div>
    );
}

export default Tasks;

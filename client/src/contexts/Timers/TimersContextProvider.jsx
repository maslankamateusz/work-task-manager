import { createContext, useState, useRef } from 'react';

const TimersContext = createContext();

const TimersContextProvider = ({ children }) => {

    const [ timerConfiguration, setTimerConfiguration ] = useState([]);
    const timerModal = useRef(null);

    const openModal = () => {
        fetchData();
        if (timerModal.current) {
            timerModal.current.showModal();
        }
    };

    const closeModal = () => {
        if (timerModal.current) {
            timerModal.current.close();
        }
    };
    const fetchData = async () => {
        try {
            const response1 = await fetch('http://localhost:5000/api/timers', {
                method: 'GET',
            });
            const timerTitles = await response1.json();
            if (!response1.ok) {
                throw new Error(timerTitles.message || 'Failed to fetch timer titles');
            }
        
            const response2 = await fetch('http://localhost:5000/api/daysummary/timersdata', {
                method: 'GET',
            });
            const timerDurations = await response2.json();
            if (!response2.ok) {
                throw new Error(timerDurations.message || 'Failed to fetch timer durations');
            }
            if(timerTitles && timerDurations) {
                const newTimerConfiguration = timerTitles.timers.map((title, index) => {
                    return {
                        timerName: timerTitles.timers[index].timerName,
                        rotationTime: timerTitles.timers[index].rotationTime,
                        elapsedTime: timerDurations[index].durationTime,
                        timerColor: timerTitles.timers[index].timerColor
                    };
                });
                setTimerConfiguration(newTimerConfiguration);
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    }
    const saveDate = async (elapsedTime, key) => {
        try {
            const response = await fetch('http://localhost:5000/api/daysummary/timers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    elapsedTime: elapsedTime,
                    rotationTime: timerConfiguration[key].rotationTime,
                    timerKey: key
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update timers');
            }
        } catch (error) {
            console.error('Error updating timers:', error.message);
        }
    }
    const updateDailyTimers = async (index, newElapsedTime, newRotationTime) => {
        try {
            const response = await fetch('http://localhost:5000/api/daysummary/timers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timerKey: index,
                    elapsedTime: newElapsedTime,
                    rotationTime: newRotationTime
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update timers');
            }
            return response.ok;
        } catch (error) {
            console.error('Error updating timers:', error.message);
        }
    }
    const resetTimer = async (index) => {
        const response = updateDailyTimers(index, 0, timerConfiguration[index].rotationTime);
        if(response){
           const updatedTimerConfiguration = [...timerConfiguration];
            updatedTimerConfiguration[index] = {
                ...updatedTimerConfiguration[index],
                elapsedTime: 0
            };
            setTimerConfiguration(updatedTimerConfiguration); 
        }
      };
    const addRangeOfTime = async (index, timeDifference) =>{
        const newElapsedTime = timerConfiguration[index].elapsedTime + (timeDifference * 60);
        const response = updateDailyTimers(index, newElapsedTime, timerConfiguration[index].rotationTime);
        if(response){
            const updatedTimerConfiguration = [...timerConfiguration];
             updatedTimerConfiguration[index] = {
                 ...updatedTimerConfiguration[index],
                 elapsedTime: newElapsedTime
             };
             setTimerConfiguration(updatedTimerConfiguration); 
         }
    }
    const updateTimersConfig = async (index, newName, newRotationTime, newColor) => {
    try {
        const response = await fetch('http://localhost:5000/api/timers/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timerKey: index,
                timerName: newName,
                rotationTime: Number(newRotationTime),
                timerColor: newColor
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update timers');
        }
        return response.ok;
    } catch (error) {
        console.error('Error updating timers:', error.message);
    }
    }
    const changeRotateTime = async (index, newRotationTime) => {
        const newRotationTimeSeconds = newRotationTime * 60;
        const response = updateTimersConfig(index, timerConfiguration[index].timerName, newRotationTimeSeconds, timerConfiguration[index].timerColor);
        if(response){
            const updatedTimerConfiguration = [...timerConfiguration];
            updatedTimerConfiguration[index] = {
            ...updatedTimerConfiguration[index],
            rotationTime: Number(newRotationTimeSeconds)
            };
            setTimerConfiguration(updatedTimerConfiguration); 
        }
    
    };
    const changeColor = async (index, newColor) => {
        const response = updateTimersConfig(index, timerConfiguration[index].timerName, timerConfiguration[index].rotationTime, newColor);
        if(response){
            const updatedTimerConfiguration = [...timerConfiguration];
            updatedTimerConfiguration[index] = {
            ...updatedTimerConfiguration[index],
            timerColor: newColor
            };
            setTimerConfiguration(updatedTimerConfiguration); 
        }
    };
    const changeTimerName = async (index, newTimerName) => {
        const response = updateTimersConfig(index, newTimerName, timerConfiguration[index].rotationTime, timerConfiguration[index].timerColor);
        if(response){
            const updatedTimerConfiguration = [...timerConfiguration];
            updatedTimerConfiguration[index] = {
            ...updatedTimerConfiguration[index],
            timerName: newTimerName
            };
            setTimerConfiguration(updatedTimerConfiguration); 
        }
    }
    const deleteTimer = async (timerIndex) => {
        try {
            const response = await fetch('http://localhost:5000/api/timers/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timerKey: timerIndex,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update timers');
            }
            const updatedTimerConfiguration = [...timerConfiguration];
            updatedTimerConfiguration.splice(timerIndex, 1);
            setTimerConfiguration(updatedTimerConfiguration);
            return response.ok;
        } catch (error) {
            console.error('Error updating timers:', error.message);
        }
    }
    const addTimer = async () => {

        if(timerConfiguration.length<3){
            try {
                const response = await fetch('http://localhost:5000/api/timers/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to update timers');
                }

                const newTimer = {
                    timerName: "Add name",
                    rotationTime: 3600,
                    elapsedTime: 0,
                    timerColor: "#007bff"
                }
                const updatedTimerConfiguration = timerConfiguration.concat(newTimer);
                setTimerConfiguration(updatedTimerConfiguration);

                return response.ok;
            } catch (error) {
                console.error('Error updating timers:', error.message);
            }
        }
        }

    const ctxValue = {
        timerConfiguration,
        timerModal,
        openModal,
        closeModal,
        fetchData,
        saveDate,
        resetTimer,
        addRangeOfTime,
        updateTimersConfig,
        changeRotateTime,
        changeColor,
        changeTimerName,
        deleteTimer,
        addTimer
    }

    return (
        <TimersContext.Provider value={ctxValue}>
            {children}
        </TimersContext.Provider>
    );
};

export { TimersContext, TimersContextProvider };

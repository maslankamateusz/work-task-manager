import { useState, useEffect, useRef } from "react";
import Timer from "./Timer/Timer";
import TimerConfiBtn from "./Timer/TimerConfig/TimerConfigBtn";
import TimerModal from "./Timer/TimerModal/TimerModal";

function Timers(){

    const [ timerConfiguration, setTimerConfiguration ] = useState([]);
    const timerModal = useRef();
    useEffect(() => {
        fetchData();
    }, []);
    
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
    const timerModalToggle = () => {
        timerModal.current.showModal();
    }
    const resetTimer = async (index) => {
        try {
            console.log(timerConfiguration[index].rotationTime);
            const response = await fetch('http://localhost:5000/api/daysummary/timers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    elapsedTime: 0,
                    rotationTime: timerConfiguration[index].rotationTime,
                    timerKey: index
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update timers');
            }
        } catch (error) {
            console.error('Error updating timers:', error.message);
        }
        const updatedTimerConfiguration = [...timerConfiguration];
        updatedTimerConfiguration[index] = {
            ...updatedTimerConfiguration[index],
            elapsedTime: 0
        };
        setTimerConfiguration(updatedTimerConfiguration);
      };
    
    return (
        <>
            <TimerModal ref={timerModal} timerConfiguration={timerConfiguration} onResetTimer={resetTimer}/>
            <div className='mb-4 lg:mb-0 bg-indigo-300 h-52 w-full p-1 flex'>
                <div className="w-[95%] h-52 flex justify-center items-center">
                {console.log("sprawd", timerConfiguration)}
                {timerConfiguration.map((timer, index) => (
                    <Timer key={index} timerKey={index} title={timer.timerName} fullRotationTime={timer.rotationTime} elapsedTime={timer.elapsedTime} timerColor={timer.timerColor} onSaveDate={(timerState) => saveDate(timerState, index)} />
                ))}
                </div>
            </div>
            <div className="absolute text-right w-[43%] p-1 pe-2 align-top mb-10">
                <TimerConfiBtn handleClick={timerModalToggle}/>
            </div>
        </>
        )
}

export default Timers;

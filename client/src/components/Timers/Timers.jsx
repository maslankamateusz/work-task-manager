import { useState, useEffect } from "react";
import Timer from "./Timer/Timer";
import TimerConfiBtn from "./Timer/TimerConfig/TimerConfigBtn";

function Timers(){

    const [ timerConfiguration, setTimerConfiguration ] = useState([]);
    
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5 * 60 * 1000); 
        return () => clearInterval(intervalId);
    }, []);
    

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/timers', {
                method: 'GET',
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch notes');
            }
            setTimerConfiguration(data.timers);
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
    
    return (
        <>
            <div className='mb-4 lg:mb-0 bg-indigo-300 h-52 w-full p-1 flex'>
                <div className="w-[95%] h-52 flex justify-center items-center">
                {timerConfiguration.map((timer, index) => (
                    <Timer key={index} timerKey={index} title={timer.timerName} fullRotationTime={timer.rotationTime} onSaveDate={(timerState) => saveDate(timerState, index)} />
                ))}
                </div>
            </div>
            <div className="absolute text-right w-[43%] p-1 pe-2 align-top mb-10">
                <TimerConfiBtn />
            </div>
        </>
        )
}

export default Timers;

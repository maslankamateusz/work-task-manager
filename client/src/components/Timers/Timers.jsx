import { useContext, useEffect } from "react";
import Timer from "./Timer/Timer";
import TimerConfiBtn from "./Timer/TimerConfig/TimerConfigBtn";
import TimerModal from "./Timer/TimerModal/TimerModal";

import { TimersContextProvider, TimersContext } from "../../contexts/Timers/TimersContextProvider";

function Timers() {
    const {
        timerConfiguration,
        fetchData,
        saveDate,
    } = useContext(TimersContext);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <TimersContextProvider>
            <TimerModal />
            <div className='mb-4 lg:mb-0 bg-indigo-300 h-52 w-full p-1 flex'>
                <div className="w-[95%] h-52 flex justify-center items-center">
                    {timerConfiguration.map((timer, index) => (
                        <Timer
                            key={index}
                            timerKey={index}
                            title={timer.timerName}
                            fullRotationTime={timer.rotationTime}
                            elapsedTime={timer.elapsedTime}
                            timerColor={timer.timerColor}
                            onSaveDate={(timerState) => saveDate(timerState, index)}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute text-right w-[43%] p-1 pe-2 align-top mb-10">
                <TimerConfiBtn  />
            </div>
        </TimersContextProvider>
    );
}

export default Timers;

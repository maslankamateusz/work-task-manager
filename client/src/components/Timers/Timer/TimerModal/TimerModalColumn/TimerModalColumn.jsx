import { useContext, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { TimersContext } from "../../../../../contexts/Timers/TimersContextProvider";

export default function TimerModalColumn({timerConfiguration, amountOfTimer, index  }){
    const { 
        resetTimer,
        changeRotateTime,
        changeColor,
        changeTimerName,
        addRangeOfTime,
    } = useContext(TimersContext);

    const timerNameRef = useRef(null);
    const rotationTimeRef = useRef(null);
    const colorRef = useRef(null);
    const addTimeFromRef = useRef(null);
    const addTimeToRef = useRef(null);
    const handleResetTimer = () => {
        resetTimer(index);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        let elapsedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if(isNaN(minutes) || isNaN(seconds)){
            elapsedTime = "00:00";
        }
        return elapsedTime;
    };

    const handleChangeRotateTime = () => {
        changeRotateTime(index, rotationTimeRef.current.value);
    }
    const handleChangeColor = () => {
        changeColor(index, colorRef.current.value);
    }

    const handleAddRangeOfTime = () => {
        if(addTimeFromRef.current.value && addTimeToRef.current.value){

            const [fromHours, fromMinutes] = addTimeFromRef.current.value.split(':').map(Number);
            const [toHours, toMinutes] = addTimeToRef.current.value.split(':').map(Number);

            const fromTotalMinutes = fromHours * 60 + fromMinutes;
            const toTotalMinutes = toHours * 60 + toMinutes;

            if (fromTotalMinutes >= toTotalMinutes) {
                console.log('Incorrect time range specified');
                return;
            }
            const timeDifference = toTotalMinutes - fromTotalMinutes;

            addRangeOfTime(index, timeDifference);
        }
    }
    let width = "w-full";
    let backgroundWidth = "15";
    switch(amountOfTimer){
        case 1:
            width = "w-full";
            backgroundWidth = "w-[45%]";
            break;
        case 2:
            width = "w-1/2";
            backgroundWidth = "w-[22.5%]";
            break
        case 3:
            width = "w-1/3";
            backgroundWidth = "w-[15%]";
            break
    }
    const handleTimerNameChange = () => {
        changeTimerName(index, timerNameRef.current.value);
    }
    return(
        <div className={`h-full flex justify-center ${width}`}>
            <div className={`fixed -z-10 bg-slate-300 h-16 ${backgroundWidth} `}></div>
            <div className="text-center  w-1-3">
                <div className='z-10 h-16 flex justify-center items-center pt-2 '>
                   <input type="text" id="timerName" className="border-none bg-transparent fs-3 font-medium text-center outline-none" 
                   maxLength="20"
                   ref={timerNameRef}
                   defaultValue={timerConfiguration.timerName}
                   onBlur={handleTimerNameChange}/>
                </div>
                <div className='h-[5%] pt-2'>
                    <div className="flex items-center justify-center">
                        <h5 className='pt-1'>{formatTime(timerConfiguration.elapsedTime)}</h5>
                        <FontAwesomeIcon className='ps-3 pb-[2px] text-xl' icon={faArrowRotateRight} onClick={handleResetTimer} />
                    </div>
                </div>
                <div className='h-1/4 pt-4 mt-1'>
                    <h4>Rotation time: </h4>
                    <div className="flex items-center justify-center">
                        <input type="text" defaultValue={timerConfiguration.rotationTime/60} className='shadow-sm appearance-none border rounded h-10 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/12'
                        ref={rotationTimeRef}
                        />
                        <button className='shadow-sm btn btn-success btn-sm h-10 px-3 ms-2 ' type='button' onClick={handleChangeRotateTime}>
                            Save
                        </button>
                    </div>
                </div>
                <div className='h-1/4 pt-4'>
                    <h4>Add time: <span className='text-xs'>(HH:MM)</span></h4>
                    <div className="flex items-center justify-center flex-col">
                        <div className='flex w-[75%]'>
                            <input
                                type="time"
                                className='form-control form-control-sm me-2 py-2 shadow-sm '
                                placeholder="From:"
                                ref={addTimeFromRef}
                            />
                            <input
                                type="time"
                                className='form-control form-control-sm py-2 shadow-sm'
                                placeholder="To:"
                                ref={addTimeToRef}
                            /> 
                            <button className='shadow-sm btn btn-primary btn-sm h-10 px-3 ms-2 ' type='button'
                                onClick={handleAddRangeOfTime}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className='h-1/4 pt-4'>
                    <h4>Change color:</h4>
                    <div className="flex items-center justify-center flex-col">
                        <div className='flex w-1/2'>
                            <input
                                type="color"
                                className='form-control form-control-sm me-2 py-2 shadow-sm h-10'
                                defaultValue={timerConfiguration.timerColor}
                                ref={colorRef}
                            />
                            <button className='shadow-sm btn btn-success btn-sm h-10 px-3 ms-2 ' type='button'
                            onClick={handleChangeColor}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>               
            </div>
        </div>
    )
}
import { forwardRef, useRef } from "react"
import TimerModalColumn from "./TimerModalColumn/TimerModalColumn"

export default forwardRef(function TimerModal({timerConfiguration, onResetTimer, onChangeRotateTime, onChangeColor, onAddRangeOfTime, onChangeTimerName, onDeleteTimer, onAddTimer}, ref){

    const deleteTimerRef = useRef();

    const handleClose = () => {
        ref.current.close();
    }
    const amountOfTimer = timerConfiguration.length;

    const handleDeleteTimer = () => {
        onDeleteTimer(deleteTimerRef.current.value);
    }
    const handleAddTimer = () => {
        onAddTimer();
    }
    return(
        <dialog ref={ref} className="w-1/2 h-[45%] bg-slate-200 rounded-lg shadow-lg backdrop:bg-stone-900/80  ">
            <div className="text-center w-[90%] h-full flex float-left">
            {timerConfiguration.map((timerConfiguration, index) => {
                return <TimerModalColumn key={index} timerConfiguration={timerConfiguration} onResetTimer={onResetTimer} onChangeRotateTime={onChangeRotateTime} onChangeColor={onChangeColor} onAddRangeOfTime={onAddRangeOfTime} amountOfTimer={amountOfTimer} onChangeTimerName={onChangeTimerName} index={index} />
            })}
            </div>
            <div className="text-center w-[10%] h-full flex-row justify-center items-center bg-slate-300 float-left	">
                <div className="h-16 bg-slate-200 flex justify-center items-center">
                    <button className='shadow-sm btn btn-dark btn-sm h-10 px-2 w-[60px]' type='button' onClick={handleClose}>
                        Close
                    </button> 
                </div>
                <div className="h-72 flex-row justify-around pt-[20px]">
                    <div className="h-1/3 flex justify-center items-center pb-3 pt-5">
                        <button className='shadow-sm btn btn-secondary btn-sm h-10 px-2 w-[80px]' type='button' onClick={handleAddTimer}>
                            Add timer
                        </button> 
                    </div>
                    <div className="mt-[20px] pt-3 flex-row justify-center items-center">
                        <div className="w-[80px] mx-auto">
                            <select className='form-select select-status' ref={deleteTimerRef}>
                            {timerConfiguration.map((element, index) => {
                                return <option key={index} value={index}>{index+1}</option>;
                            })}
                            </select>
                        </div>
                        <button className='shadow-sm btn btn-danger btn-sm h-10 px-2 w-[80px] mt-2' 
                        type='button'
                        onClick={handleDeleteTimer}>
                            Del timer
                        </button> 
                    </div>
                </div>
                
            </div>
        </dialog>
    )
})

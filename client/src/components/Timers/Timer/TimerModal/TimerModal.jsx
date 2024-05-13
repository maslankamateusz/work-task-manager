import { forwardRef } from "react"
import TimerModalColumn from "./TimerModalColumn/TimerModalColumn"

export default forwardRef(function TimerModal({timerConfiguration}, ref){

    const handleClose = () => {
        ref.current.close();
    }

    return(
        <dialog ref={ref} className="w-1/2 h-[45%] bg-slate-200 rounded-lg shadow-lg backdrop:bg-stone-900/80  ">
            <div className="text-center w-[90%] h-full flex float-left">
                {timerConfiguration.map((timerConfiguration) => {
                    return <TimerModalColumn timerConfiguration={timerConfiguration}/>
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
                        <button className='shadow-sm btn btn-secondary btn-sm h-10 px-2 w-[80px]' type='button'>
                            Add timer
                        </button> 
                    </div>
                    <div className="mt-[20px] pt-3 flex-row justify-center items-center">
                        <div className="w-[80px] mx-auto">
                            <select className='form-select select-status'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <button className='shadow-sm btn btn-danger btn-sm h-10 px-2 w-[80px] mt-2' type='button'>
                            Del timer
                        </button> 
                    </div>
                </div>
                
            </div>
        </dialog>
    )
})

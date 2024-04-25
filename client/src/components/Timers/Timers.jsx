import Timer from "./Timer/Timer";
import TimerConfiBtn from "./Timer/TimerConfig/TimerConfigBtn";

function Timers(){
    return (
        <>
            <div className='mb-4 lg:mb-0 bg-indigo-300 h-72 w-full p-1 flex'>
                <div className="w-[95%] h-full flex justify-center items-center">
                    <Timer title={"Work"}/>
                    <Timer title={"School"}/>
                    <Timer title={"Learn"}/>
                </div>
            </div>
            <div className="absolute text-right w-[43%] p-1 pe-2 align-top mb-10">
                <TimerConfiBtn />
            </div>
        </>
        )
}

export default Timers;

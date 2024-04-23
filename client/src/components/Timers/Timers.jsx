import Timer from "./Timer/Timer";
import TimerConfiBtn from "./Timer/TimerConfig/TimerConfigBtn";

function Timers(){
    return (
        <div className='mb-4 lg:mb-0 bg-indigo-300 h-72 w-full p-1 flex'>
            <div className="w-full h-full flex justify-center ">
                <Timer />
                <Timer />
                <Timer />
            </div>
            <div className="absolute text-right w-[42%] p-0 align-top ">
                <TimerConfiBtn />
            </div>
        </div>
    )
}

export default Timers;

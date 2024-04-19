import Timer from "./Timer/Timer";

function Timers(){
    return (
        <div className='mb-4 lg:mb-0 bg-indigo-300 h-72 w-full p-1 flex justify-center'>
            <Timer />
            <Timer />
            <Timer />
        </div>
    )
}

export default Timers;

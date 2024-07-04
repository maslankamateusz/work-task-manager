import { useContext } from "react";
import { TimersContext } from "../../../../contexts/Timers/TimersContextProvider";
export default function TimerConfiBtn() {
    
    const { openModal} = useContext(TimersContext);
    
    function handleClick(){
        openModal();
    }
    return (
        <div className="relative">
            <button className="text-gray-700 hover:text-black" onClick={handleClick}>Config</button>
        </div>
    );
}

import { useState } from "react";
import Measurements from "../Measurements/Measurements";
import AdditionalNotes from "./AdditionalNotes/AdditionalNotes";

function Notes(){

    const [additionalNotes, setAdditionalNotes] = useState(false);

    function handleClick(){
        setAdditionalNotes(prev => !prev)
    }

    return (
        <div className="w-3/5 me-3 flex flex-col justify-between " >
            <div className="w-full h-3/4 flex justify-between">
                <div className={additionalNotes ? "bg-blue-300 w-4/5 ": "bg-blue-300 w-full "}>
                    notes
                </div>
                <div className={additionalNotes ? " w-1/6": "w-0"}>
                    {additionalNotes ? <AdditionalNotes /> : null}
                </div>
            </div>
            <div className=" w-full flex justify-end">
                <div className="w-5 cursor-default block" onClick={handleClick}>&nbsp;</div>
            </div>
            <Measurements />
        </div>
    )
}

export default Notes;
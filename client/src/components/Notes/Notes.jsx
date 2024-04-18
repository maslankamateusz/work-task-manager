import { useState } from "react";
import Measurements from "../Measurements/Measurements";
import AdditionalNotes from "./AdditionalNotes/AdditionalNotes";

function Notes(){

    const [additionalNotes, setAdditionalNotes] = useState(false);
    const [notes, setNotes] = useState("");

    function handleClickAdditionalNotes(){
        setAdditionalNotes(prev => !prev)
    }

    function handleChange(event) {
        const textWithNewLines = event.target.value.replace(/\n/g, '\\n'); 
        setNotes(textWithNewLines);
    }

    return (
        <div className="w-3/5 me-3 flex flex-col justify-between " >
            <div className="w-full h-4/5 flex justify-between">
                <div className={additionalNotes ? "bg-yellow-200 w-4/5" : "bg-yellow-200 w-full flex justify-center items-center"}>
                    <textarea 
                        type="text" 
                        className="bg-yellow-200 w-[93%] h-[90%] outline-0 resize-none" 
                        value={notes.replace(/\\n/g, '\n')}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className={additionalNotes ? "w-1/6" : "w-0"}>
                    {additionalNotes ? <AdditionalNotes /> : null}
                </div>
            </div>
            <div className=" w-full flex justify-end">
                <div className="w-5 cursor-default block" onClick={handleClickAdditionalNotes}>&nbsp;</div>
            </div>
            <Measurements />
        </div>
    )
}

export default Notes;

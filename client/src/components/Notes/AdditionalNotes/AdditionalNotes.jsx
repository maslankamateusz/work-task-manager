import { useState } from "react";
import AdditionalNotesInput from "./AdditionalNotesInput/AdditionalNotesInput";

const defaultNotes = {
    "214/01": "",
    "214/02": "",
    "214/03": "",
    "107/01": "",
    "107/02": "",
    "107/03": "",
    "254/01": ""
}
function AdditionalNotes(){
    const [additionalNotes, setAdditionalNotes] = useState(defaultNotes);

    function handleChange(placeholder, newValue){
        const updatedNotes = { ...additionalNotes };
        updatedNotes[placeholder] = newValue;
        setAdditionalNotes(updatedNotes);
    }

    return(
        <div className="w-full h-full bg-yellow-300 py-2 flex flex-col items-center justify-around">
            {Object.keys(additionalNotes).map((key, index) => (
                <AdditionalNotesInput key={index} placeholder={key} value={additionalNotes[key]} onChange={handleChange}/>
            ))}
        </div>
    );
}

export default AdditionalNotes;
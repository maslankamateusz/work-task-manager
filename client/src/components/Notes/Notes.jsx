import React, { useState, useEffect } from "react";
import Measurements from "../Measurements/Measurements";
import AdditionalNotes from "./AdditionalNotes/AdditionalNotes";

function Notes(){

    const [additionalNotes, setAdditionalNotes] = useState(false);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        fetchNotesFromServer();
    }, []);

    async function fetchNotesFromServer() {
        try {
            const response = await fetch('http://localhost:5000/api/notes', {
                method: 'GET',
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch notes');
            }
    
            setNotes(data[0].text);
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    }
    
    async function addOrUpdateNotes() {
        try {
            const response = await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: notes
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update notes');
            }
        } catch (error) {
            console.error('Error updating notes:', error.message);
        }
    }
    

    function handleClickAdditionalNotes() {
        setAdditionalNotes(prev => !prev);
    }

    function handleChange(event) {
        const textWithNewLines = event.target.value.replace(/\n/g, '\\n'); 
        setNotes(textWithNewLines);
    }

    async function handleBlur() {
        await addOrUpdateNotes();
    }

    return (
        <div className="w-3/5 me-3 flex flex-col justify-between">
            <div className="w-full h-4/5 flex justify-between">
                <div className={additionalNotes ? "bg-yellow-200 w-4/5" : "bg-yellow-200 w-full flex justify-center items-center"}>
                    <textarea 
                        type="text" 
                        className="bg-yellow-200 w-[93%] h-[90%] outline-0 resize-none" 
                        value={notes.replace(/\\n/g, '\n')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></textarea>
                </div>
                <div className={additionalNotes ? "w-1/6" : "w-0"}>
                    {additionalNotes ? <AdditionalNotes /> : null}
                </div>
            </div>
            <div className="w-full flex justify-end">
                <div className="w-5 cursor-default block" onClick={handleClickAdditionalNotes}>&nbsp;</div>
            </div>
            <Measurements />
        </div>
    )
}

export default Notes;

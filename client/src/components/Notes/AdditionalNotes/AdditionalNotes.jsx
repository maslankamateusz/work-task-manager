import { useState, useEffect } from 'react';
import AdditionalNotesInput from "./AdditionalNotesInput/AdditionalNotesInput";


function AdditionalNotes(){
    const [additionalNotes, setAdditionalNotes] = useState({});
    const [daySummaryId, setDaySummaryId ] = useState(null);


    useEffect(() => {
        fetchAdditionalNotesFromServer();
    }, []);

    function fetchAdditionalNotesFromServer() {
        fetch('http://localhost:5000/api/daysummary')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch additionalNotes');
                }
                return response.json();
            })
            .then(data => {
                setDaySummaryId(data._id);
                setAdditionalNotes(data.additionalNotes);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    }

    function handleChange(placeholder, newValue){
        const updatedNotes = { ...additionalNotes };
        updatedNotes[placeholder] = newValue;
        setAdditionalNotes(updatedNotes);
        updateAdditionalNotes(updatedNotes);
    }

    function updateAdditionalNotes(updatedNotes){
        fetch('http://localhost:5000/api/daysummary/additionalNotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newNotes: updatedNotes,
                summaryId: daySummaryId 
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update notes');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error  update notes:', error);
            });
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
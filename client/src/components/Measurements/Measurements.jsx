import { useState, useEffect } from 'react';

function Measurements() {
    const [dailyMeasurements, setDailyMeasurements] = useState({});
    const sleepDuration = ["6.0 hours", "6.5 hours", "7.0 hours", "7.5 hours", "8.0 hours", "8.5 hours", "9.0 hours"];

    useEffect(() => {
        fetchMeasurementsFromServer();
    }, []);

    useEffect(() => {
      if (dailyMeasurements.summaryId) {
          addOrUpdateMeasurements();
      }
    }, [dailyMeasurements]);

    function fetchMeasurementsFromServer() {
        fetch('http://localhost:5000/api/daysummary')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                return response.json();
            })
            .then(data => {
                const item = {
                    summaryId: data._id,
                    bodyweight: data.bodyweight,
                    sleepDuration: data.sleepDuration
                }
                setDailyMeasurements(item);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    }

    async function addOrUpdateMeasurements() {
        try {
            const response = await fetch('http://localhost:5000/api/daysummary/dailymeasurements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    summaryId: dailyMeasurements.summaryId,
                    bodyweight: dailyMeasurements.bodyweight,
                    sleepDuration: dailyMeasurements.sleepDuration
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update measurements');
            }
        } catch (error) {
            console.error('Error updating measurements:', error);
        }
    }

    function handleWeightChange(event) {
        const newBodyWeight = event.target.value;
        setDailyMeasurements(prevMeasurements => ({
            ...prevMeasurements,
            bodyweight: newBodyWeight
        }));
    }
    function handleSleepDurationChange(event) {
      const newSleepDuration = event.target.value;
      setDailyMeasurements(prevMeasurements => ({
          ...prevMeasurements,
          sleepDuration: newSleepDuration
      }));
  }

    return (
        <div className="bg-rose-300 w-full h-1/6 flex">
            <div className="w-1/2 h-full flex items-center justify-center">
                <label htmlFor="weight" className="mr-2 text-lg ">Weight: </label>
                <input
                    id="weight"
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="shadow appearance-none border rounded py-2 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/5"
                    defaultValue={dailyMeasurements.bodyweight}
                    onChange={handleWeightChange}
                />
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
                <label className="mr-2 text-lg">Sleep: </label>
                <select
                className="shadow appearance-none border rounded py-2 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/5"
                onChange={handleSleepDurationChange}
                value={dailyMeasurements.sleepDuration}
                >
                {sleepDuration.map((e, index) => (
                    <option key={index}>{e}</option>
                ))}
              </select>

            </div>
        </div>
    );
}

export default Measurements;

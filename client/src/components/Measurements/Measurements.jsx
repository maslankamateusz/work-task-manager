import { useState, useEffect } from 'react';

function Measurements() {

    const [dailyMeasurements, setDailyMeasurements] = useState({});
    const sleepDuration = ["6.0 hours", "6.5 hours", "7.0 hours", "7.5 hours", "8.0 hours", "8.5 hours", "9.0 hours"];
  
    useEffect(() => {
        fetchMeasurementsFromServer();
    }, []);

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

    return (
      <div className="bg-orange-200 w-full h-1/6 flex">
        <div className="w-1/2 h-full flex items-center justify-center">
          <label htmlFor="weight" className="mr-2 text-lg ">Weight: </label>
          <input
            id="weight"
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            className="shadow appearance-none border rounded py-2 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/5"
            value={dailyMeasurements.bodyweight}
          />
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <label className="mr-2 text-lg">Sleep: </label>
          <select
            className="shadow appearance-none border rounded py-2 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/5"
            >
            {dailyMeasurements.sleepDuration && <option className='bg-gray-200'>{dailyMeasurements.sleepDuration}</option> }
            {sleepDuration.map((e, index) => (
              dailyMeasurements.sleepDuration !== e && <option key={index}>{e}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  
  export default Measurements;
  
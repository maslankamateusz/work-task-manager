import { useEffect, useState, useRef } from 'react';
import SummaryColumn from './SummaryColumn/SummaryColumn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Summary() {
    const [summaryData, setSummaryData] = useState(null);
    const [timersName, setTimersName ] = useState(["Work", "School", "Learn"]);
    const fromDateRef = useRef();
    const toDateRef = useRef();

    function fetchDataFromServer() {
        Promise.all([
            fetch('http://localhost:5000/api/daysummary').then(response => {
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać danych z daysummary');
                }
                return response.json();
            }),
            fetch('http://localhost:5000/api/timers').then(response => {
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać danych z timers');
                }
                return response.json();
            })
        ])
        .then(([daysummaryData, timersData]) => {
            const combinedData = daysummaryData.timers.map((timer, index) => ({
                timerName: timersData.timers[index].timerName,
                rotationTime: timer.rotationTime,
                durationTime: timer.durationTime
            }));
            const updatedSummaryData = [{
                ...daysummaryData,
                timers: combinedData
            }];
            setSummaryData(updatedSummaryData);
        })
        .catch(error => {
            console.error('Błąd pobierania:', error);
            throw error;
        });
    }

    useEffect(() => {
        fetchDataFromServer();
    }, []);
    
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleUpdateBtnClick = async () => {
        const fromDate = fromDateRef.current.value; 
        const toDate = toDateRef.current.value; 
        if(fromDate && toDate){
            try {
                const response = await fetch('http://localhost:5000/api/daysummary/dateRange', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fromDate,
                        toDate
                    }),
                });
        
                const data = await response.json();
                setSummaryData(data);
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to update timers');
                }
            } catch (error) {
                console.error('Error updating timers:', error.message);
            }
        }

    }
    


    return (
        <div className="flex justify-center w-full h-[70vh]">
            <div className="w-[80vw] mt-3 flex">
                <div className='flex flex-col w-[80vw]'>
                    <div className='flex w-[80vw]'>
                        <div className='bg-slate-300 w-1/4 h-full'>
                            <h1 className='p-2 px-3'>Podsumowanie</h1>
                        </div>
                        <div className='bg-slate-300 w-3/4 h-full'>
                            <div className='flex w-full h-full justify-center items-center'>
                                <input
                                    type="date"
                                    className='form-control form-control-sm ps-2'
                                    style={{ width: '8vw', height: '4vh' }}
                                    max={getTodayDate()}
                                    ref={fromDateRef}
                                />
                                <FontAwesomeIcon icon={faArrowRight} size='2x' className='px-4'/>
                                <input
                                    type="date"
                                    className='form-control form-control-sm ps-2'
                                    style={{ width: '8vw', height: '4vh' }}
                                    max={getTodayDate()}
                                    ref={toDateRef}
                                /> 
                                <button className='shadow-sm btn btn-primary btn-sm h-[4vh] px-2 w-[80px] ms-3' 
                                type='button'
                                onClick={handleUpdateBtnClick}
                                >
                                    Update
                                </button> 
                            </div>
                        </div> 
                    </div>
                    <div className='flex w-[80vw]'>
                    {summaryData && summaryData.map((element, index) => 
                        <SummaryColumn key={index} summaryData={element} timersName={timersName} index={index}/>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

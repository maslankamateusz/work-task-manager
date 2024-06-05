import { useEffect, useState } from 'react';

export default function Summary() {
    const [summaryData, setSummaryData] = useState(null);

    function fetchDataFromServer() {
        fetch('http://localhost:5000/api/daysummary')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać danych');
                }
                return response.json();
            })
            .then(data => {
                setSummaryData(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Błąd pobierania:', error);
                throw error;
            });
    }

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    return (
        <div className="flex justify-center w-full h-[70vh]">
            <div className="w-[80vw] mt-3 flex">
                <div className='flex flex-col w-[80vw]'>
                    <div className='flex w-[80vw]'>
                        <div className='bg-slate-300 w-1/4 h-full'>
                            <h1 className='p-2 px-3'>Podsumowanie</h1>
                        </div>
                        <div className='bg-slate-300 w-3/4 h-full'>
                            <h1></h1>
                        </div> 
                    </div>
                    <div className='flex '>
                        <div className="px-5 h-full w-1/4 bg-slate-200">
                            <div className="pt-8">
                                <h4 className='text-center '>{summaryData && summaryData.date}</h4>
                                <hr />
                                <h3>Praca</h3>
                                <ul>
                                    <li>Zadania dodane: {summaryData && summaryData.tasksAdded}</li>
                                    <li>Zadania ukończone: {summaryData && summaryData.tasksCompleted}</li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <h3>Timery</h3>
                                {summaryData && (
                                    <table className="table-auto">
                                        <tbody>
                                        {summaryData.timers.map((timer, index) => (
                                                <tr key={index}>
                                                    <td>{index === 0 ? '' : ''}</td>
                                                    <td>Timer {index + 1} | </td>
                                                    <td>{Math.floor(timer.durationTime / 60)}/{Math.floor(timer.rotationTime / 60)} min |</td>
                                                    <td>{((timer.durationTime / timer.rotationTime) * 100).toFixed(2)}%</td> 
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            <div className="mt-8">
                                <h3>Lista zadań</h3>
                                <ul>
                                    <li>Listy kontrolne: {summaryData && summaryData.checklistsAmount}</li>
                                    <li>Listy kontrolne ukończone: {summaryData && summaryData.checklistsCompleted}</li>
                                    <li>Procent ukończenia listy: {summaryData && ((summaryData.checklistsCompleted / summaryData.checklistsAmount) * 100).toFixed(2)}%</li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <h3>Zdrowie</h3>
                                <ul>
                                    <li>Waga: {summaryData && summaryData.bodyweight} kg</li>
                                    <li>Czas snu: {summaryData && summaryData.sleepDuration}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function SummaryColumn({summaryData, timersName, index}){

    return(
        <div className="px-4 h-full w-[16vw] bg-slate-200">
            {console.log(timersName)}
            <div className="pt-8">
                <h4 className='text-center '>{summaryData && summaryData.date}</h4>
                <hr />
                <h3>{index === 0 ? "Work" : String.fromCharCode(160)}</h3>
                <table className='table-auto ms-4 w-full'>
                    <tbody>
                        <tr>
                            <td className='w-2/3'>Task added:</td>
                            <td className='w-1/3 text-left '>{summaryData && summaryData.tasksAdded}</td>
                        </tr>
                        <tr>
                            <td className='w-2/3'>Task completed:</td>
                            <td className='w-1/3 text-left'>{summaryData && summaryData.tasksCompleted}</td>
                        </tr> 
                    </tbody>
                </table>
    
            </div>
            <div className="mt-8">
                <h3>{index === 0 ? "Timers" : String.fromCharCode(160)}</h3>
                {summaryData && (
                    <table className="table-auto ms-4" >
                        <tbody>
                        {summaryData.timers.map((timer, index) => (
                                <tr key={index} >
                                    <td className='w-1/5'>{timersName[index]} </td>
                                    <td className='w-1/4'>| {Math.floor(timer.durationTime / 60)}/{Math.floor(timer.rotationTime / 60)} min |</td>
                                    <td className='w-1/4'>{((timer.durationTime / timer.rotationTime) * 100).toFixed(2)}%</td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="mt-8">
                <h3>{index === 0 ? "Checklist" : String.fromCharCode(160)}</h3>
                <table className='table-auto ms-4'>
                    <tbody>
                        <tr>
                            <td className='w-4/5'>Checklist items:</td>
                            <td>{summaryData && summaryData.checklistsAmount}</td>
                        </tr>
                        <tr>
                            <td className='w-4/5'>Checklist items done:</td>
                            <td>{summaryData && summaryData.checklistsCompleted}</td>
                        </tr>
                        <tr>
                            <td className='w-4/5'>Percentage completed:</td>
                            <td>{summaryData && ((summaryData.checklistsCompleted / summaryData.checklistsAmount) * 100).toFixed(2)}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <h3>{index === 0 ? "Health" : String.fromCharCode(160)}</h3>
                <table className='table-auto ms-4 w-full'>
                    <tbody>
                        <tr>
                            <td className='w-2/3'>Body weight:</td>
                            <td>{summaryData && summaryData.bodyweight && `${summaryData.bodyweight} kg`}</td>
                            </tr>
                        <tr>
                            <td className='w-2/3'>Time of sleep:</td>
                            <td>{summaryData && summaryData.sleepDuration}</td>
                        </tr>  
                    </tbody>
                </table>
            </div>
        </div>
    )
}


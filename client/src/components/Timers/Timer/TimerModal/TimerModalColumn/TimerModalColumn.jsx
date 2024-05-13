
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';


export default function TimerModalColumn({timerConfiguration}){
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return(
        <div className="h-full flex ">
            <div className="text-center w-full">
                <div className='bg-slate-300 h-16 flex justify-center items-center pt-2'>
                   <h3>{timerConfiguration.timerName}</h3> 
                </div>
                <div className='h-[5%] pt-2'>
                    <div className="flex items-center justify-center">
                        <h5 className='pt-1'>{formatTime(timerConfiguration.elapsedTime)}</h5>
                        <FontAwesomeIcon className='ps-3 pb-[2px] text-xl' icon={faArrowRotateRight}/>
                    </div>
                </div>
                <div className='h-1/4 pt-4 mt-1'>
                    <h4>Rotation time: </h4>
                    <div className="flex items-center justify-center">
                        <input type="text" defaultValue={timerConfiguration.rotationTime/60} className='shadow-sm appearance-none border rounded h-10 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/12'/>
                        <button className='shadow-sm btn btn-success btn-sm h-10 px-3 ms-2 ' type='button'>
                            Save
                        </button>
                    </div>
                </div>
                <div className='h-1/4 pt-4'>
                    <h4>Add time: <span className='text-xs'>(HH:MM)</span></h4>
                    <div className="flex items-center justify-center flex-col">
                        <div className='flex w-4/5'>
                            <input
                                type="text"
                                className='form-control form-control-sm me-2 py-2 shadow-sm'
                                placeholder="From:"
                            />
                            <input
                                type="text"
                                className='form-control form-control-sm py-2 shadow-sm'
                                placeholder="To:"
                            /> 
                            <button className='shadow-sm btn btn-primary btn-sm h-10 px-3 ms-2 ' type='button'>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className='h-1/4 pt-4'>
                    <h4>Change color:</h4>
                    <div className="flex items-center justify-center flex-col">
                        <div className='flex w-1/2'>
                            <input
                                type="color"
                                className='form-control form-control-sm me-2 py-2 shadow-sm h-10'
                                defaultValue={`#${timerConfiguration.timerColor}`}
                            />
                            <button className='shadow-sm btn btn-success btn-sm h-10 px-3 ms-2 ' type='button'>
                                Save
                            </button>
                        </div>
                    </div>
                </div>               
            </div>
        </div>
    )
}
import React from 'react';
import "./Main.scss";
import Timers from '../Timers/Timers';
import Notes from '../Notes/Notes';
import Tasks from '../Tasks/Tasks';

function Main(){
    return(
        <div className='mainContainer row pt-md-0 pt-5'>
            <div className='leftZone col-md-6 pe-4'>
                <Timers />
                <Notes />
            </div>
            <div className='rightZone col-md-6 col-12 px-3 '>
                <Tasks  />
            </div>

        </div>
    )
}

export default Main;

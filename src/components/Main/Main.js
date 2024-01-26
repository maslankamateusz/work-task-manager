import React from 'react';
import "./Main.scss";
import Timers from '../Timers/Timers';
import Notes from '../Notes/Notes';
import Tasks from '../Tasks/Tasks';

function Main(){
    return(
        <div className='mainContainer '>
            <div className='leftZone '>
                <Timers />
                <Notes />
            </div>
            <div className='rightZone '>
                <Tasks  />
            </div>

        </div>
    )
}

export default Main;

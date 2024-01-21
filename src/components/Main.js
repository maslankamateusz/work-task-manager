import React, { useState, useEffect } from 'react';
import "./Main.scss";
import Timers from './Timers';
import Notes from './Notes';
import Tasks from './Tasks';

function Main(){
    return(
        <div className='mainContainer bg-primary '>
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

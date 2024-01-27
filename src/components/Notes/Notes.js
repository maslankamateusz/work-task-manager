import React from 'react';
import "./Notes.scss";
import VehicleInfo from '../VehicleInfo/VehicleInfo';

function Notes(){
    return (
        <div className='notesContainer'>
            <div className="vehicleInfo pt-1">
                <VehicleInfo />
            </div>
        </div>
    )
}

export default Notes;
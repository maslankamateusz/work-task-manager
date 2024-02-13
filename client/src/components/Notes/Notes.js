import React from 'react';
import "./Notes.scss";
import VehicleInfo from '../VehicleInfo/VehicleInfo';

function Notes(){

    const [vehicleInfoVisible, setVehicleInfoVisible] = React.useState();

        
    function changeVehicleInfo(){
        let visibility = vehicleInfoVisible;
        setVehicleInfoVisible(!visibility);
    }

    return (
        <div className='notesContainer' onClick={changeVehicleInfo}>
            <div className="vehicleInfo pt-1" >
                {vehicleInfoVisible && <VehicleInfo/>}
            </div>
        </div>
    )
}

export default Notes;
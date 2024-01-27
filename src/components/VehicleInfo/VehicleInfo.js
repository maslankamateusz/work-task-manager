import React, { useEffect, useState } from 'react';

const VehicleInfoComponent = () => {
  const [vehicleInfo, setVehicleInfo] = useState({});

  useEffect(() => {
    const fetchVehicleInfo = async () => {
      try {
        const response = await fetch('http://192.168.55.112:3001/api/vehicleInfo', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setVehicleInfo(data);
      } catch (error) {
        console.error('Error fetching vehicle info:', error);
      }
    };

    if (Object.keys(vehicleInfo).length === 0) {
      fetchVehicleInfo();
    }
  }, [vehicleInfo]);

  return (
    <div>
      <h3>Vehicle Information</h3>
      {Object.keys(vehicleInfo).map((lineNumber) => (
        <div key={lineNumber}>
          {lineNumber}: {Object.values(vehicleInfo[lineNumber]).join(', ')}
        </div>
      ))}
    </div>
  );
};

export default VehicleInfoComponent;

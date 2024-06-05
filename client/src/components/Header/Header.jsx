import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons'; 
import { getWeekdayName, formatDate, formatTime } from './HeaderUtils/headerUtils';


function Header() {
    const [time, setTime] = useState(formatTime());
    const weekdayName = getWeekdayName();
    const todayDate = formatDate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(formatTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); 

    return (
      <div className="header h-48 w-full flex justify-center items-start flex-col md:flex-col">
        <div className='mt-5 w-full h-44 flex justify-center'>
            <span className="text-5xl text-center md:text-7xl px-5  md:mb-0">Hello, today is a {weekdayName}</span>
            <span className="text-4xl mt-[12px] md:text-6xl px-5 ">{todayDate} {time}</span>
        </div>
        <div className='w-full flex justify-end'>
            <div className='h-[7vh] w-1/3 me-[5vw] mb-2 text-center '>
                
                {/* <FontAwesomeIcon icon={faCloud} size='3x'/> */}
                <WeatherInfo />
                </div>
            
        </div>

      </div>   

    
      );
      
}


export default Header;

import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';


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
      <div className="header h-48 w-full flex justify-center items-center flex-col md:flex-row">
        <span className="text-5xl text-center md:text-7xl px-5 mb-3 md:mb-0">Hello, today is a {weekdayName}</span>
        <span className="text-4xl md:text-6xl mb-1 px-5 ">{todayDate} {time}</span>
      </div>   

    
      );
      
}

function getWeekdayName() {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const weekday = date.getDay();
    return weekdays[weekday];
}

function formatDate() {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatTime() {
    const date = new Date();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const time = `${hours}:${minutes}`;
    return time;
}

export default Header;

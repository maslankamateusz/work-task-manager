import React, { useState, useEffect } from 'react';
import "./Header.scss";

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
        <div className="header container-fluid ">
          <div className="row no-gutters d-flex align-items-center justify-content-between">
            <div className="col-md-7 col-12">
              <span className="h1 h1-md text-center text-md-end px-md-5">Hello, today is a {weekdayName}</span>
            </div>
            <div className="col-md-5 col-12 bg">
              <span className="display-4 display-md-4 text-center text-md-start px-md-5">{todayDate} {time}</span>
            </div>
          </div>
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

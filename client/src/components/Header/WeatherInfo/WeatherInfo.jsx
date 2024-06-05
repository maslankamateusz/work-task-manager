import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

export default function WeatherInfo() {
    const [weatherDays, setWeatherDays] = useState([]);

    async function fetchWeatherData() {
        const apiKey = 'HH4F6UJGDBP2WWGLEZN9EAN8N';
        const city = 'Kraków';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&include=days%2Ccurrent&key=${apiKey}&contentType=json`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeatherDays(data.days.slice(0, 3));
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const renderWeatherIcon = (iconType) => {
        switch (iconType) {
            case "partly-cloudy-day":
                return <FontAwesomeIcon icon={faCloudSun} style={{ fontSize: "2.3em" }} />;
            case "rain":
                return <FontAwesomeIcon icon={faCloudShowersHeavy} style={{ fontSize: "2.3em" }} />;
            case "cloudy":
                return <FontAwesomeIcon icon={faCloud} style={{ fontSize: "2.3em" }} />;
            case "clear-day":
                return <FontAwesomeIcon icon={faSun} style={{ fontSize: "2.3em" }} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="flex flex-row pt-1">
                {weatherDays.map((day, index) => (
                    <div key={index} className="w-1/3">
                        <div className="w-full mt-1 text-sm flex justify-center">
                            {daysOfWeek[new Date(day.datetime).getDay()]}
                        </div>
                        <div className="w-full h-[5vh] pt-1 bg-slate-000 flex justify-evenly">
                            {renderWeatherIcon(day.icon)}
                            <p className="text-3xl ">
                                {day.temp}°C
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

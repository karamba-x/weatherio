import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Card from "./Card";
import { IoLocationOutline } from "react-icons/io5";
import { TiWeatherCloudy } from "react-icons/ti";
import { MdOutlineCalendarMonth } from "react-icons/md";
import moment from 'moment-timezone';

const apiKey = import.meta.env.VITE_API_KEY;

const Weather = () => {
  const location = useSelector((state) => state.location.location);
  const [weather, setWeather] = useState(null);

  const iconUrl = new URL(`../assets/weatherIcons/${weather && weather.current.condition.icon}.svg`, import.meta.url).href;

  const getLocaleDate = (timezone) => {
    const dateTime = moment.unix(moment.utc().unix());
    const adjustedDateTime = dateTime.utcOffset(timezone / 60);
    return adjustedDateTime.format('D MMMM, YYYY h:mm A')
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.lat},${location.lon}`
        );
        console.log(response)
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeather();
  }, [location]);


  return (
    <>
      <Card>
        {weather && <>
          <img className="h-32" src={iconUrl} alt="Weather icon" />
          <div className="flex font-semibold">
            <p className="text-7xl">{Math.round(weather.current.temp_c)}</p>
            <p className="text-5xl mt-1 ml-2">℃</p>
          </div>
          <div className="flex gap-2 mt-4">
            <TiWeatherCloudy className="h-6 w-6" />
            <p>{weather.current.condition.text}</p>
          </div>
          <hr className="border-white/35 my-5" />
          <div className="flex gap-2 mt-4">
            <IoLocationOutline className="h-6 w-6" />
            <p>{weather.location.name}, {weather.location.country}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <MdOutlineCalendarMonth className="h-6 w-6" />
            <p>{getLocaleDate(weather.location.tz_id)}</p>
          </div>
        </>}
      </Card>
    </>


  );
};

export default Weather;

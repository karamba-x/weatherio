import { useEffect, useState } from 'react';
import Card from './Card'
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Forecast = () => {
  const [forecast, setForecast] = useState([]);
  const location = useSelector((state) => state.location.location);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
          params: {
            lat: location.lat,
            lon: location.lon,
            appid: apiKey,
            units: 'metric',
          },
        });
        const filteredData = filterDailyForecast(response.data.list);
        setForecast(filteredData);
      } catch (error) {
        console.error('Ошибка при запросе данных: ', error);
      }
    };

    fetchForecast();
  }, [location]);

  const filterDailyForecast = (forecastList) => {
    const dailyData = {};

    forecastList.forEach((entry) => {
      const date = new Date(entry.dt_txt);
      const day = date.toISOString().split('T')[0];

      if (!dailyData[day]) {
        dailyData[day] = {
          icon: entry.weather[0].icon,
          temp_max: entry.main.temp_max,
          temp_min: entry.main.temp_min,
          date: moment.unix(entry.dt).format('D MMMM'),
          weekday: moment.unix(entry.dt).format('dddd'),
        };
      } else {
        dailyData[day].temp_min = Math.min(dailyData[day].temp_min, entry.main.temp_min);
        dailyData[day].temp_max = Math.max(dailyData[day].temp_max, entry.main.temp_max);
      }
    });

    let dailyForecast = Object.values(dailyData).map((dayData) => ({
      icon: dayData.icon,
      temp_max: Math.round(dayData.temp_max),
      temp_min: Math.round(dayData.temp_min),
      date: dayData.date,
      weekday: dayData.weekday,
    }));

    if (dailyForecast.length > 5) {
      dailyForecast = dailyForecast.slice(0, 5);
    } 

    return dailyForecast;
  };
  
  return (
    <Card>
      {forecast && forecast.map((item, index) => {
        return (
          <div key={index} className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <img className='h-16' src={new URL(`../assets/weatherIcons/${item.icon}.svg`, import.meta.url).href} alt="" />
              <p className='text-2xl text-white/70'>{item.temp_max > 0 ? `+${item.temp_max}` : `-${item.temp_max}`} / {item.temp_min > 0 ? `+${item.temp_min}` : `-${item.temp_min}`} </p>
            </div>
            <p className='text-1xl text-white/70'>{item.date}</p>
            <p className='text-1xl text-white/70'>{item.weekday}</p>
          </div>
        )

      })}

    </Card>
  );
};

export default Forecast;

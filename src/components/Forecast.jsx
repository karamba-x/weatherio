import moment from 'moment';
import { useSelector } from 'react-redux';

const Forecast = () => {
  const daysForecast = useSelector(
    (state) => state.weather.data.forecast.forecastday
  );

  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      <h1 className="text-3xl font-semibold">3 Days Forecast</h1>
      <div className="flex flex-col justify-between h-full gap-4">
        {daysForecast.map((item, index) => (
          <div
            key={index}
            className="forecast-item flex items-center justify-between"
          >
            <div className="flex items-center gap-4 text-nowrap">
              <img
                src={`https:${item.day.condition.icon}`}
                className="h-12 w-12"
                alt="Weather icon"
              />
              <p className="text-lg sm:text-2xl text-white">
                {item.day.maxtemp_c} /{' '}
                <span className="text-sm sm:text-lg text-white/70">
                  {item.day.mintemp_c}
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center lg:flex-row sm:justify-end lg:gap-4 2xl:gap-10">
              <p className="text-sm sm:text-md text-white/70">
                {moment(item.date).format('DD MMMM')}
              </p>
              <p className="text-xs sm:text-md text-white/40">
                {moment(item.date).format('dddd')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;

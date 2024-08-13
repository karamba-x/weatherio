const forecastData = [
  {
    date: '25 August',
    day: 'Monday',
    maxTemp: '+29°',
    minTemp: '+19°',
    icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
  },
  {
    date: '25 August',
    day: 'Monday',
    maxTemp: '+29°',
    minTemp: '+19°',
    icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
  },
  {
    date: '25 August',
    day: 'Monday',
    maxTemp: '+29°',
    minTemp: '+19°',
    icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
  },
];

const Forecast = () => {
  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      <h1 className="text-3xl font-semibold">3 Days Forecast</h1>
      <div className="flex flex-col justify-between h-full gap-4">
        {forecastData.map((item, index) => (
          <div key={index} className="forecast-item flex items-center justify-between">
            <div className='flex items-center gap-4 text-nowrap'>
              <img src={item.icon} className='h-10 w-10' alt="Weather icon" />
              <p className='text-lg sm:text-2xl text-white'>{item.maxTemp} / <span className='text-sm sm:text-lg text-white/70'>{item.minTemp}</span></p>
            </div>
            <div className="flex flex-col items-center lg:flex-row sm:justify-end lg:gap-4 2xl:gap-10">
              <p className='text-sm sm:text-md text-white/70'>{item.date}</p>
              <p className='text-xs sm:text-md text-white/40'>{item.day}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;

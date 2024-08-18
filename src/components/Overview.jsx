import { useSelector } from 'react-redux';
import SegmentedControl from './SegmentedControl';
import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import moment from 'moment';
import { useState } from 'react';

const Overview = () => {
  const weatherDay = useSelector(
    (state) => state.weather.data.forecast.forecastday[0].hour
  );
  const [selected, setSelected] = useState('wind_kph');

  const formatTime = (time) => {
    return moment(time).format('HH');
  };

  const options = [
    { value: 'wind_kph', label: 'Wind' },
    { value: 'chance_of_rain', label: 'Rain' },
    { value: 'chance_of_snow', label: 'Snow' }
  ];

  return (
    <div className="h-full w-full flex flex-col p-6 gap-4">
      <SegmentedControl
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="w-full h-[300px] xl:h-full">
        <ResponsiveContainer width="100%" height="95%">
          <BarChart
            width={150}
            height={40}
            data={weatherDay}
            margin={{
              left: -30
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tickFormatter={formatTime} />
            <YAxis />
            <Bar dataKey={selected} fill="url(#colorUv)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;

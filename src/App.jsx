import Header from './components/Header';
import Weather from './components/Weather';
import Overview from './components/Overview';
import Forecast from './components/Forecast.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWeather } from './slices/weatherSlice.js';
import { fetchIp } from './slices/locationSlice.js';
import Search from './components/Search.jsx';
import MapComponent from './components/Map.jsx';

const App = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.data);
  const loading = useSelector((state) => state.weather.loading);
  const isOpenSearch = useSelector((state) => state.weather.isOpenSearch);

  useEffect(() => {
    dispatch(fetchIp());
  }, [dispatch]);

  useEffect(() => {
    if (location) {
      dispatch(fetchWeather(location));
    }
  }, [location, dispatch]);

  return isOpenSearch ? (
    <Search />
  ) : (
    <div className="min-h-screen flex flex-col p-6 font-opensans gap-6">
      <Header />
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <svg
            className="text-gray-300 animate-spin"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
          >
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-teal-500"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 gap-6 md:grid-cols-12 xl:grid-rows-[1fr,1fr]">
          <div className="bg-zinc-800 rounded-3xl md:col-span-12 order-1 xl:col-span-8">
            <Weather />
          </div>
          <div className="bg-zinc-800 rounded-3xl md:col-span-12 order-2 xl:order-3 xl:col-span-8">
            <Overview />
          </div>
          <div className="bg-zinc-800 rounded-3xl md:col-span-6 order-3 xl:order-4 xl:col-span-4">
            <Forecast />
          </div>
          <div className="bg-zinc-800 mask-custom rounded-3xl h-[300px] md:col-span-6 order-4 xl:order-2 xl:col-span-4 xl:h-full">
            <MapComponent />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

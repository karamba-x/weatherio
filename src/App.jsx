import { useSelector } from "react-redux";
import Card from "./components/Card";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const location = useSelector(state => state.location);
  const apiKey = import.meta.env.VITE_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = async () => {
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  }

  useEffect(() => {
    if (location) {
      searchLocation();
    }
  }, [location]);

  return (
    <div className="w-full h-full relative">
      <Header />
      <div className="p-6">
        <Card>
          {location && weatherData && (
            <>
              <h2 className="text-2xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
              <p className="text-6xl font-semibold">
                {Math.round(weatherData.main.temp)} <span className="text-5xl">°C</span>
              </p>
            </>
          )}
          <button onClick={searchLocation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Обновить данные
          </button>
        </Card>
      </div>
    </div>
  )
}

export default App;

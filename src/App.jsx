import Header from "./components/Header";
import Weather from "./components/Weather";
import map from './assets/map.png'
import Overview from "./components/Overview";
import Forecast from "./components/Forecast.jsx";

const App = () => {
  return (
    <div className="w-full h-full min-h-screen p-6 gap-8 font-opensans grid grid-cols-1 md:grid-cols-12 xl:grid-rows-[50px,1fr,1fr]">
      <div className="md:col-span-12">
        <Header />
      </div>
      <div className="bg-zinc-800 rounded-3xl md:col-span-12 order-1 xl:col-span-8">
        <Weather />
      </div>
      <div className="bg-zinc-800 rounded-3xl md:col-span-12 order-2 xl:order-3 xl:col-span-8">
        <Overview />
      </div>
      <div className="bg-zinc-800 rounded-3xl md:col-span-6 order-3 xl:order-4 xl:col-span-4">
        <Forecast />
      </div>
      <div className="bg-zinc-800 rounded-3xl h-[300px] md:col-span-6 order-4 xl:order-2 xl:col-span-4 xl:h-full">
        <div className="flex justify-center items-center h-full">
          map
        </div>
      </div>
    </div>
  );
}

export default App;
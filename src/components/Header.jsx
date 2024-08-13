import { TiWeatherPartlySunny } from "react-icons/ti";
import { CiSearch } from "react-icons/ci"
import { BsDownload } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";

const Header = () => {
  return (
    <header className='h-full flex items-center justify-between'>
      <div className="flex   mr-4">
        <TiWeatherPartlySunny className="text-3xl md:text-4xl text-gray-400 mr-4" />
        <div className="text-2xl md:text-3xl font-semibold">Weather.io</div>
      </div>

      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search city..."
          className="w-[370px] focus:outline-none pl-10 pr-4 py-3 bg-zinc-800 rounded-full placeholder-gray-400"
        />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-3">
          <CiSearch className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 p-3 rounded-full transition-colors duration-200 md:hidden"
        >
          <CiSearch className="text-md md:text-lg" />
        </button>
        <button className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 p-4 hidden md:flex rounded-full transition-colors duration-200 items-center">
          <CiLocationArrow1 className="text-lg"/>
        </button>
        <button className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 p-3 md:p-4 rounded-full transition-colors duration-200 flex items-center">
          <BsDownload className="text-md md:text-lg" />
          
        </button>
      </div>
    </header>
  )
}

export default Header
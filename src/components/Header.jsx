// src/components/Header.js
import { CiSearch } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BsDownload } from "react-icons/bs";
import Search from "./Search";
import { useState } from "react";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="p-6 flex justify-between items-center">
      <div className='flex items-center mr-4'>
        <TiWeatherPartlySunny className="w-8 h-8 text-gray-400 mr-4" />
        <div className="text-3xl font-semibold">Weather.io</div>
      </div>
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search city..."
          className="w-[400px] focus:outline-none pl-10 pr-4 py-3 bg-zinc-800 rounded-full placeholder-gray-400"
        />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-3">
          <CiSearch className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className='flex gap-3 items-center'>
        <div className='items-center mr-8 hidden lg:flex'>
          <IoLocationSharp className="w-5 h-5 text-gray-400 mr-2" />
          <div className="text-lg font-semibold">Chita, Russia</div>
        </div>
        <button onClick={() => setSearchOpen(true)} className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 py-3 px-3 rounded-full transition-colors duration-200 md:hidden">
          <CiSearch className='text-lg'/>
        </button>
        <button className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 py-3 px-3 md:py-4 md:px-4 lg:py-3 rounded-full transition-colors duration-200 flex items-center">
          <BsDownload className='text-lg'/>
          <span className='hidden ml-4 lg:inline text-md'>Download App</span>
        </button>
      </div>
      {searchOpen && <Search onClose={() => setSearchOpen(false)}/>}
    </header>
  );
};

export default Header;

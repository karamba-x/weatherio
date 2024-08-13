import { CiSearch } from "react-icons/ci";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BsDownload } from "react-icons/bs";
import Search from "./Search";
import { useEffect, useRef, useState } from "react";
import { setLocation } from "../slices/locationSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TbDatabaseX } from "react-icons/tb";
import { countries } from 'countries-list';
import { TbLocation } from "react-icons/tb";

const apiKey = import.meta.env.VITE_API_KEY;

const Header = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const getCountryName = (countryCode) => {
    const country = countries[countryCode];
    return country ? country.name : countryCode;
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  const searchCities = async (query) => {
    if (query.length > 2) {
      const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
      try {
        const response = await axios.get(url);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prevIndex) => (prevIndex + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prevIndex) => (prevIndex - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < searchResults.length) {
        handleSelectLocation(searchResults[activeIndex]);
      }
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    searchCities(e.target.value);
  };

  const handleSelectLocation = (location) => {
    dispatch(setLocation({
      name: location.name,
      lat: location.lat,
      lon: location.lon
    }));
    setQuery(location.name);
    setSearchResults([]);
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setLocation({
          name: 'Current Location',
          lat: latitude,
          lon: longitude,
        }));
      },
      (error) => console.error("Error getting current location: ", error)
    );
  };

  const renderSearchResults = () => {
    if (query.length === 0) {
      return null;
    }

    if (query.length <= 2) {
      return (
        <div className="p-4 flex justify-center items-center text-gray-400 gap-2">
          <TbDatabaseX />
          No data
        </div>
      );
    }

    return searchResults.map((result, index) => (
      <li
        key={index}
        onClick={() => handleSelectLocation(result)}
        className={`cursor-pointer p-3 hover:bg-gray-700 ${activeIndex === index ? 'bg-gray-700' : ''
          }`}
      >
        {result.name}, {getCountryName(result.country)}
      </li>
    ));
  };

  return (
    <header className="py-6 flex justify-between items-center">
      <div className="flex items-center mr-4">
        <TiWeatherPartlySunny className="w-8 h-8 text-gray-400 mr-4" />
        <div className="text-3xl font-semibold">Weather.io</div>
      </div>
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={handleSearchChange}
          ref={inputRef}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 100);
          }}
          onKeyDown={handleKeyDown}
          className="w-[400px] focus:outline-none pl-10 pr-4 py-3 bg-zinc-800 rounded-full placeholder-gray-400"
        />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-3">
          <CiSearch className="w-5 h-5 text-gray-400" />
        </div>
        {showDropdown && (
          <ul className="absolute z-10 bg-zinc-800 w-full shadow-lg rounded-lg mt-2 overflow-auto">
            {renderSearchResults()}
          </ul>
        )}
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => setSearchOpen(true)}
          className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 py-3 px-3 rounded-full transition-colors duration-200 md:hidden"
        >
          <CiSearch className="text-lg" />
        </button>
        <button onClick={handleCurrentLocation} className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 py-4 px-4 rounded-full transition-colors duration-200">
          <TbLocation className="text-lg"/>
        </button>
        <button className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 py-3 px-3 md:py-4 md:px-4 lg:py-3 rounded-full transition-colors duration-200 flex items-center">
          <BsDownload className="text-lg" />
          <span className="hidden ml-4 lg:inline text-md">Download App</span>
        </button>
      </div>
      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </header>
  );
};

export default Header;

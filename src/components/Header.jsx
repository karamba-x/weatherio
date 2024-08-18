import { TiWeatherPartlySunny } from 'react-icons/ti';
import { CiSearch } from 'react-icons/ci';
import { BsDownload } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';
import { TbDatabaseX } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { searchCities } from '../slices/searchSlice';
import { fetchWeather, setIsOpenSearch } from '../slices/weatherSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchResults = useSelector((state) => state.search.searchResults);
  const inputRef = useRef();
  const location = useSelector((state) => state.location.data);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      dispatch(searchCities(value));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prevIndex) => (prevIndex + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + searchResults.length) % searchResults.length
      );
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < searchResults.length) {
        dispatch(fetchWeather(searchResults[activeIndex]));
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    }
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
        onClick={() => dispatch(fetchWeather(result))}
        className={`cursor-pointer p-3 hover:bg-gray-700 ${
          activeIndex === index ? 'bg-gray-700' : ''
        }`}
      >
        {result.name}, {result.country}
      </li>
    ));
  };

  return (
    <header className="h-full flex items-center justify-between">
      <div className="flex   mr-4">
        <TiWeatherPartlySunny className="text-3xl md:text-4xl text-gray-400 mr-4" />
        <div className="text-2xl md:text-3xl font-semibold">Weather.io</div>
      </div>

      <div className="relative hidden md:block">
        <input
          ref={inputRef}
          value={query}
          onChange={handleSearchChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 100);
          }}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search city..."
          className="w-[370px] focus:outline-none pl-10 pr-4 py-3 bg-zinc-800 rounded-full placeholder-gray-400"
        />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-3">
          <CiSearch className="w-5 h-5 text-gray-400" />
        </div>

        {showDropdown && (
          <ul className="absolute z-50 bg-zinc-800 w-full shadow-lg rounded-lg mt-2 overflow-auto">
            {renderSearchResults()}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(setIsOpenSearch())}
          className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 p-3 rounded-full transition-colors duration-200 md:hidden"
        >
          <CiSearch className="text-md md:text-lg" />
        </button>
        <button
          onClick={() => dispatch(fetchWeather(location))}
          className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 p-4 hidden md:flex rounded-full transition-colors duration-200 items-center"
        >
          <CiLocationArrow1 className="text-lg" />
        </button>
        <button className="bg-zinc-800 hover:bg-slate-600 active:bg-slate-500 p-3 md:p-4 rounded-full transition-colors duration-200 flex items-center">
          <BsDownload className="text-md md:text-lg" />
        </button>
      </div>
    </header>
  );
};

export default Header;

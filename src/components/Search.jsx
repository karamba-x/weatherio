import { IoArrowBack } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, setIsOpenSearch } from '../slices/weatherSlice';
import { CiLocationArrow1 } from 'react-icons/ci';
import { TbDatabaseX } from 'react-icons/tb';
import { searchCities } from '../slices/searchSlice';
import { useState } from 'react';

const Search = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.data);
  const [query, setQuery] = useState('');
  const searchResults = useSelector((state) => state.search.searchResults);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      dispatch(searchCities(value));
    }
  };

  const handleSearchResult = (result) => {
    dispatch(fetchWeather(result));
    dispatch(setIsOpenSearch());
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
      <div
        key={index}
        onClick={() => handleSearchResult(result)}
        className="bg-zinc-900 p-6 flex gap-4 border-t border-zinc-800 active:bg-zinc-800"
      >
        <p className="pl-9">
          {result.name}, {result.country}
        </p>
      </div>
    ));
  };

  return (
    <div className="absolute top-0 left-0 bg-dark-bg w-full h-screen z-1000">
      <div className="px-4 py-6 flex items-center z-0">
        <IoArrowBack
          onClick={() => dispatch(setIsOpenSearch())}
          className="h-6 w-6 mr-6 active:text-slate-600"
        />
        <input
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 100);
          }}
          onChange={handleSearchChange}
          className="w-full bg-transparent focus:outline-none text-lg"
          placeholder="Search city..."
        />
      </div>

      {showDropdown && query.length !== 0 ? (
        renderSearchResults()
      ) : (
        <div
          onClick={() => handleSearchResult(location)}
          className="bg-zinc-900 p-6 flex gap-4 active:bg-zinc-800"
        >
          <CiLocationArrow1 className="text-lg" />
          <p>
            {location.city}, {location.country_name}
          </p>
          <p className="text-zinc-500">Current Location</p>
        </div>
      )}
    </div>
  );
};

export default Search;

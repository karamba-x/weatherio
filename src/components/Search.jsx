import { IoArrowBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setLocation } from "../slices/locationSlice"; // Путь может отличаться в зависимости от структуры проекта

const Search = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(setLocation(event.target.value));
  };

  return (
    <div className='absolute top-0 left-0 bg-dark-bg w-full h-screen z-50'>
      <div className="px-4 py-6 flex items-center border-b border-gray-800 z-0">
        <IoArrowBack onClick={onClose} className="h-6 w-6 mr-6 active:text-slate-600" />
        <input 
          className="w-full bg-transparent focus:outline-none text-lg" 
          placeholder="Search city..." 
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Search;
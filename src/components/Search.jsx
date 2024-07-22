import { IoArrowBack } from "react-icons/io5";

const Search = ({ onClose }) => {
  return (
    <div className='absolute top-0 left-0 bg-dark-bg w-full h-screen'>
      <div className="px-4 py-6 flex items-center border-b border-gray-800 z-0">
        <IoArrowBack onClick={onClose} className="h-6 w-6 mr-6 active:text-slate-600" />
        <input className="w-full bg-transparent focus:outline-none text-lg" placeholder="Search city..." />
      </div>
    </div>
  )
}

export default Search
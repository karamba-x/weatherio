const SegmentedControl = ({ selected, setSelected, options }) => {
  const handleSelect = (option) => {
    setSelected(option);
  };

  const getTranslateClass = () => {
    switch (selected) {
      case 'wind_kph':
        return 'translate-x-0';
      case 'chance_of_rain':
        return 'translate-x-full';
      case 'chance_of_snow':
        return 'translate-x-[200%]';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center justify-end">
      <div className="relative inline-flex shadow-sm bg-zinc-600 p-1 rounded-full">
        <div
          className={`absolute top-0 bottom-0 left-0 w-1/3 bg-teal-600 rounded-full transition-transform duration-300 ease-in-out transform ${getTranslateClass()}`}
        ></div>
        {options.map((option) => (
          <button
            key={option.value}
            className={`relative z-10 w-1/3 px-4 py-1.5 text-sm font-medium rounded-full focus:outline-none transition-colors duration-300 ${
              selected === option.value ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RiContrastDrop2Line } from "react-icons/ri";
import { TbWind } from "react-icons/tb";

const Weather = () => {
  const swiperRef = useRef(null);
  const [swiperState, setSwiperState] = useState({ isBeginning: true, isEnd: false });
  const [tempC, setTempC] = useState(true);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setSwiperState({
        isBeginning: swiperRef.current.isBeginning,
        isEnd: swiperRef.current.isEnd,
      });
    }
  };

  const createSlides = () =>
    Array.from({ length: 24 }, (_, index) => (
      <SwiperSlide key={index}>
        <div className='bg-zinc-700 h-full flex flex-col justify-between items-center rounded-3xl py-4 overflow-hidden'>
          <p className='text-md'>{`${index + 1}`} pm</p>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" className='h-14 w-14' alt="Weather icon" />
          <p className='text-md'>{`${20 + index}°`}</p>
        </div>
      </SwiperSlide>
    ));

  return (
    <div className='h-full flex flex-col p-6 gap-10'>
      <div className='flex-1 flex flex-col md:flex-row gap-6 items-top justify-between'>

        <div className='flex items-start h-full md:order-last'>
          <div onClick={() => setTempC(!tempC)} className="flex bg-stone-900 cursor-pointer select-none rounded-full relative">
            <div
              className={`absolute rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-300 transform ${tempC ? 'translate-x-0 bg-teal-600' : 'translate-x-full bg-teal-600'}`}
            />
            <div className="w-10 h-10 flex items-center justify-center z-10">°C</div>
            <div className="w-10 h-10 flex items-center justify-center z-10">°F</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className='flex justify-center md:justify-start gap-4'>
            <p className='text-7xl md:text-8xl font-semibold flex flex-start gap-3'>
              +23 <span className='text-4xl font-normal mt-2'>°C</span>
            </p>

            <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" className='h-16 w-16' alt="Weather icon" />

          </div>

          <div className='flex flex-col items-center text-nowrap lg:mt-16 lg:items-start'>
            <p className="text-gray-400">Feels like + 20°</p>
            <p className="text-gray-400">Moscow, Russia</p>
            <p className="text-gray-400">24 July, 2024 <b>5:01</b> AM</p>
          </div>

        </div>


        <div className='flex md:flex-col lg:flex-row justify-evenly gap-10 w-full'>
          <div className='flex flex-col items-center gap-2'>
            <div className="flex items-center gap-2">
              <RiContrastDrop2Line className='h-5 w-5 2xl:h-7 md:w-7' />
              <p className='text-2xl 2xl:text-3xl'>82%</p>
            </div>
            <h1 className='text-md 2xl:text-xl'>Humidity</h1>
          </div>

          <div className='flex flex-col items-center gap-2'>
            <div className="flex items-center gap-2">
              <TbWind className='h-5 w-5 2xl:h-7 md:w-7' />
              <p className='text-2xl 2xl:text-3xl'>6.1 <span className='text-base text-zinc-400'>km/h</span></p>
            </div>
            <h1 className='text-md 2xl:text-xl'>Wind speed</h1>
          </div>
        </div>
      </div>
      <div className='flex-1 flex relative'>
        <Swiper
          slidesPerView={12}
          spaceBetween={20}
          slidesPerGroup={3}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            480: { slidesPerView: 4 },
            640: { slidesPerView: 6 },
            768: { slidesPerView: 8 },
            1024: { slidesPerView: 10 },
            1280: { slidesPerView: 8 },
            1536: { slidesPerView: 12 }
          }}
        >
          {createSlides()}
        </Swiper>
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 ${swiperState.isBeginning ? 'hidden' : 'block'} swiper-button-prev`}
        >
          <button className='bg-slate-500/60 hover:bg-slate-500/80 p-2 rounded-full'><MdChevronLeft /></button>
        </div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 ${swiperState.isEnd ? 'hidden' : 'block'} swiper-button-next`}
        >
          <button className='bg-slate-500/60 hover:bg-slate-500/80 p-2 rounded-full'><MdChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default Weather;

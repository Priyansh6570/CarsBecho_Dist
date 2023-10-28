import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

//Reducers, API
import { clearErrors, getCar } from "../../actions/carAction.js";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
// import axios from 'axios';

//Components
import NumberWithCommas from "../PriceSeperator";
import MetaData from "../Layout/MetaData";
import ImageSlider from "./ImageSlider.jsx";
import NavbarMobileLower from "../Layout/Header/NavbarMobileLower.jsx";
import TestimonialCarousel from "./TestimonialCarousel.jsx";
import Loader from "../Layout/Loader/Loader.jsx";
import Skeleton from "@material-ui/lab/Skeleton";
import { citiesData } from "../cities.js";

//Icons, Stylesheet
import "../../styles/Home.scss";
import { FiCheckCircle, FiThumbsUp } from "react-icons/fi";
import { IoCarSportOutline, IoLocationOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import ScrollToTopOnMount from "../ScrollToTopOnMount";
import { CLEAR_SEARCH_RESULTS } from "../../constants/carConstants";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const Home = () => {
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, cars } = useSelector((state) => state.cars);

  const searchSubmitHandler = (carName) => {
    const formattedKeyword = carName.trim().split(" ").join(" ");
    history.push(`/cars/${formattedKeyword}`);
  };

  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedLocation) {
      inputRef.current.focus();
    }
  }, [selectedLocation]);

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocationValue(value);
    filterCities(value);
  };
  const filterCities = (value) => {
    const filtered = citiesData.filter((city) =>
      city.City.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(filtered);
  };
  const handleLocationBlur = () => {
    setFilteredCities([]);
  };

  const handleCityClick = (city) => {
    history.push("/cars");
    setSelectedLocation(city);
    sessionStorage.setItem("location", JSON.stringify(city));
    document.getElementById("inp").value = city;
    window.location.reload();
  };

  const handleCitySelect = (city) => {
    history.push("/cars");
    setLocationValue(city.City);
    sessionStorage.setItem("location", JSON.stringify(city.City));
    window.location.reload();
  };

  useEffect(() => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
    dispatch(getCar());
  }, [dispatch, alert]);

  const cities = [
    "Indore",
    "Bhopal",
    "Mumbai",
    "New Delhi",
    "Gurgaon",
    "Jabalpur",
    "Noida",
    "Gwalior",
    "Jaipur",
    "Ahmedabad",
  ];
  const cityImages = {
    Indore: "/Cities/indorecity.png",
    Bhopal: "/Cities/bhopal.png",
    Mumbai: "/Cities/mumbai.png",
    "New Delhi": "/Cities/new_delhi.png",
    Gurgaon: "/Cities/gurgaon.png",
    Jabalpur: "/Cities/jabalpur.png",
    Noida: "/Cities/noida.png",
    Gwalior: "/Cities/gwalior.png",
    Jaipur: "/Cities/jaipur.png",
    Ahmedabad: "/Cities/ahmedabad.png",
  };

  const carData = [
    {
      num: 1,
      name: "Creta",
      tagline: "Most loved SUV",
      imageSrc: "/Cars/hyundai.jpg",
      imageSrcSm: "/Cars/hyundai_sm.jpg",
      altText: "Hyundai Creta",
    },
    {
      num: 2,
      name: "Fortuner",
      tagline: "Dream SUV of Indians",
      imageSrc: "/Cars/toyota_fortuner.jpg",
      imageSrcSm: "/Cars/toyota_fortuner_sm.jpg",
      altText: "Toyota Fortuner",
    },
    {
      num: 3,
      name: "Baleno",
      tagline: "Unbeatable Value, Unmatched Style",
      imageSrc: "/Cars/suzuki_baleno.jpg",
      imageSrcSm: "/Cars/suzuki_baleno_sm.jpg",
      altText: "Maruti Suzuki Baleno",
    },
    {
      num: 4,
      name: "Audi",
      tagline: "Luxury Redefined, A4 Style",
      imageSrc: "/Cars/audi_a4.jpg",
      imageSrcSm: "/Cars/audi_a4_sm.jpg",
      altText: "Audi A4",
    },
    {
      num: 5,
      name: "Audi",
      tagline: "Most reliable premium used car",
      imageSrc: "/Cars/audi_q3.jpg",
      imageSrcSm: "/Cars/audi_q3_sm.jpg",
      altText: "Audi Q3",
    },
    {
      num: 6,
      name: "Scorpio",
      tagline: "Dominate the Road Ahead",
      imageSrc: "/Cars/mahindra_scorpio.jpg",
      imageSrcSm: "/Cars/mahindra_scorpio_sm.jpg",
      altText: "Mahindra Scorpio N",
    },
  ];

  const isLargeScreen = window.innerWidth >= 1024;
  const maxCities = isLargeScreen ? 10 : window.innerWidth >= 826 ? 8 : 9;

  const slide1 = [
    {
      id: 0,
      image: "/Images/buy-car-img.jpg",
    },
    {
      id: 1,
      image: "/Images/buy-car2-img.jpg",
    },
    {
      id: 2,
      image: "/Images/bg-car-front.jpg",
    },
  ];

  const isSmallDevice = window.innerWidth <= 768;

  const parentWidth = isSmallDevice ? 470 : 1270;

  return (
    <Fragment>
      <>
        <main className="flex gap-1 md:flex md:gap-0 flex-col md:h-fit md:object-contain md:overflow-hidden">
          <ScrollToTopOnMount />
          <MetaData title="CarsBecho: Buy . Sell . Repair" />

          <section className="carousel_container w-[95vw] sm:mt-[0.3rem] mt-[3rem] h-[75vh] md:h-[45vh] sm:h-[200px] my-0 mx-auto relative sm:flex top-[-55px] sm:top-0">
            <Link to={"/in-progress"}>
              <div className="home-carousel-text-container sm:w-[80%] absolute z-50 h-[80%] bg-[#000000b3] rounded-xl top-[50px] md:left-[100px] sm:top-[10px] px-8 sm:px-1 xs:mx-[5%] left-[50px] xs:left-5 sm:left-[0.5rem] flex flex-col justify-start sm:items-center pt-[100px] sm:pt-6 sm:mt-2 sm:mx-[11%]">
                <h1 className="text-[50px] sm:text-[20px] font-bold text-white">
                  GET BEST PRICE IN
                </h1>
                <h1 className="text-[50px] sm:text-[20px] font-bold text-[#ee3131] mx-auto">
                  10 MINUTES
                </h1>
                <hr className="mt-[20px] md:hidden sm:flex block sm:w-[180px] px-8 w-[400px] mx-auto sm:mt-1" />
                <div className="button-container-evaluate-you-car">
                  <button className="evaluate-button md:mt-8 sm:mt-0 bg-[#ee3131] text-white text-xl xs:w-[300px] font-medium px-8 py-4 rounded flex justify-center items-center mx-auto relative bottom-[-50px] md:bottom-0 sm:bottom-[-5px] sm:left-[0px] hover:shadow-md sm:scale-[0.6]">
                    <span className="whitespace-nowrap">EVALUATE YOUR CAR</span>
                    <BsArrowRight className="pl-4 text-white w-[50px] scale-[1.2]" />
                  </button>
                </div>
              </div>
            </Link>
            <ImageSlider
              slides={slide1}
              parentWidth={parentWidth}
            />

            {/* <Swiper
              className="hidden sm:block swiper_container"
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                clickable: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <img
                    src={slide.image}
                    className="w-[64vw] mx-auto rounded-xl shadow-xl"
                    alt={`carsbecho_slide_${slide.id}`}
                  />
                </SwiperSlide>
              ))}
              <div className="slider-controler">
                <div className="swiper-pagination text-[#ee3131]"></div>
              </div>
            </Swiper> */}
          </section>

          {/* mobile lower nav  */}
          <div className="mobile-lower-nav hidden sm:flex sm:pt-0 sm:mt-8">
            <NavbarMobileLower />
          </div>

          {/* featured_Section  */}
          <section className="featured_Section w-fit sm:mt-8 sm:w-[100vw] h-fit sm:overflow-hidden mx-auto object-contain flex flex-col gap-4 p-4 sm:rounded-2xl my-0 sm:relative z-[10] sm:p-0">
            <h2 className="text-[22px] font-semibold font-[Montserrat] pl-4 sm:pt-4 capitalize sm:text-[18px] sm:font-medium">
              Explore New arrivals!
            </h2>
            <hr />

            <div className="car-container flex w-[1220px] px-[20px] sm:pl-0 sm:w-[90vw] m-auto overflow-x-auto gap-4 mt-4">
              {loading ? (
                <>
                  {[...Array(9)].map((_, index) => (
                    <>
                      <div
                        key={`${index}_car`}
                        className="carCard sm:hidden flex w-[300px] h-fit flex-col gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md sm:w-[154px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"
                      >
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          height={150}
                        />
                        <div className="carDetails flex flex-col gap-[10px] sm:px-2">
                          <Skeleton
                            variant="text"
                            animation="wave"
                            height={20}
                            width="60%"
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            height={20}
                            width="80%"
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            height={20}
                            width="40%"
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            height={20}
                            width="50%"
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            height={20}
                            width="70%"
                          />
                        </div>
                      </div>

                      {/* for mobile  */}
                      <div
                        key={`${index}_car` + "mobile"}
                        className="hidden sm:flex  carCard flex-col gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[294px] sm:w-[164px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"
                      >
                        <Skeleton variant="rect" animation="wave" height={90} />
                        <div className="carDetails-home flex flex-col gap-[10px] mt-4 sm:gap-1 sm:pt-[2px]">
                          <Skeleton
                            variant="text"
                            animation="wave"
                            height={20}
                            width="90%"
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            height={20}
                            width="50%"
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            height={20}
                            width="80%"
                          />
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                cars &&
                cars.map((car) => {
                  return (
                    <Link to={`/car/${car._id}`} key={car._id}>
                      <div className="carCard flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[294px] sm:w-[164px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden">
                        <div className="img-container-car sm:overflow-hidden">
                          <img
                            loading="lazy"
                            src={car.image[0].url}
                            alt={car.model}
                            className="w-[300px] h-[150px] sm:w-[282px] sm:h-[90px] object-cover sm:scale-[1.1] "
                          />
                        </div>

                        <div className="carDetails-home flex flex-col gap-[10px] sm:gap-1 sm:pt-[2px]">
                          <span className="flex gap-1 overflow-ellipsis sm:text-sm sm:font-normal text-lg font-semibold">
                            <h2 className=" overflow-ellipsis whitespace-nowrap">
                              {car.make}
                            </h2>
                            <h2 className=" overflow-ellipsis whitespace-nowrap">
                              {car.model}
                            </h2>
                            <h4 className="font-normal sm:hidden">{`(${car.year})`}</h4>
                          </span>
                          <span className="text-xs mb-2 sm:hidden sm:my-2 sm:text-sm uppercase text-[#3d3d3d] flex">
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <FaGasPump /> {car.fuel} {` | `}
                            </span>
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <SlSpeedometer /> {car.Km_Driven}km{` | `}
                            </span>
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <GiGearStickPattern />
                              {car.transmission}
                            </span>
                          </span>

                          <div className="carPrice">
                            <h3 className="text-2xl sm:text-base font-bold font-sans">
                              ₹ {NumberWithCommas(`${car.price}`)}
                            </h3>
                          </div>
                          <div className="click-to-open flex gap-2 items-center text-[#ee3131] mt-4 font-medium text-base">
                            <h4>View More</h4>
                            <IoIosArrowDroprightCircle />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
            <hr />
            <div className="viewAll flex items-center w-full pl-4 sm:pl-0 sm:justify-center">
              <Link to="/cars">
                <button className="view_marketplace sm:mb-4 text-xl sm:text-lg font-medium ml-4 rounded">
                  View Marketplace
                </button>
              </Link>
            </div>
          </section>

          {/* Popular Cities Section */}
          <section
            onClick={handleLocationBlur}
            className="featured_Section popular_cities w-fit my-8 md:w-[100vw] h-fit sm:overflow-hidden mx-auto object-contain flex flex-col gap-4 p-4 sm:rounded-2xl sm:relative z-[10] sm:p-0"
          >
            <div className="py-8 md:flex flex-col sm:flex hidden">
              <div className="w-[65px] h-[5px] bg-[#ee3131] mx-auto my-4"></div>
              <h2 className="text-xl w-full font-bold justify-center flex pl-4">
                Discover nearby used cars
              </h2>
              <h4 className="text-base flex justify-center py-4 text-[#999]">
                Find the perfect used car close to home
              </h4>
              <hr />
            </div>
            <h2 className="text-[20px] md:hidden sm:hidden font-semibold font-[Montserrat] pl-4 sm:pt-4 capitalize sm:text-[20px] sm:font-medium">
              Find the perfect used car close to home
            </h2>
            <hr className="flex sm:hidden md:hidden" />

            <div className="cities-container flex md:flex-col sm:flex-col w-[1220px] md:w-[90vw] p-6 sm:p-1 h-fit px-[20px] sm:w-[90vw] m-auto overflow-x-auto gap-6 mt-4">
              <div className="popular_cities_left w-[70%] md:w-full justify-between sm:w-full flex flex-wrap gap-6 sm:gap-4 p-6 sm:p-0 h-full">
                {cities.slice(0, maxCities).map((city) => (
                  <div
                    key={city}
                    onClick={() => handleCityClick(city)}
                    className="city flex flex-col cursor-pointer hover:shadow-lg transform transition-all duration-300 rounded-2xl overflow-hidden object-cover h-[150px] w-[135px] sm:w-[25%]"
                  >
                    <div className="h-[90px] w-[90px] mx-auto rounded-xl overflow-hidden">
                      <img
                        loading="lazy"
                        src={cityImages[city]}
                        alt={city}
                        className="object-cover sm:scale-75 sm:mx-auto sm:rounded-xl h-full hover:scale-105 sm:hover:scale-75 w-full transition-all duration-300"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <span className="text-sm pt-4 text-[#6b6b6b] mx-auto">
                      Used car in
                    </span>
                    <h3 className="w-full text-center p-1 pt-0 font-semibold text-base bg-[#ffffff]">
                      {city}
                    </h3>
                  </div>
                ))}
              </div>
              <div className="popular_cities_right overflow-hidden flex flex-col justify-center text-center p-6 sm:p-1 sm:py-4 w-[30%] sm:w-full h-full">
                <h2 className="text-[#313238] my-4 text-[14px] font-[400]">
                  I am looking to buy a second-hand car in
                </h2>
                <div className="form__group field">
                  <label htmlFor="inp" className="inp">
                    <input
                      type="text"
                      id="inp"
                      placeholder="&nbsp;"
                      className="pl-4"
                      value={locationValue}
                      onChange={handleLocationChange}
                      onFocus={() => filterCities(locationValue)}
                    />
                    <ImLocation className="scale-[1.4] text-[#666] absolute -top-1 left-4" />
                    <span className="label">Enter your city</span>
                    <span className="focus-bg"></span>
                  </label>
                </div>
                {filteredCities.length > 0 && (
                  <ul className="mt-2 max-h-52 overflow-y-auto bg-white shadow rounded-md">
                    {filteredCities.map((city) => (
                      <li
                        key={city.City}
                        className="cursor-pointer hover:bg-gray-100 py-2 px-4 text-base text-gray-800"
                        onClick={() => handleCitySelect(city)}
                      >
                        {city.City}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* Top Selling Cars Section */}
          <section className="w-full py-4 flex bg-[url('/Images/bg2.jpg')] bg-cover justify-center items-center">
            <div className="featured_Sectio top_selling w-fit sm:w-[100vw] h-fit sm:overflow-hidden mx-auto object-contain flex flex-col gap-4 p-4 sm:rounded-2xl my-0 sm:relative z-[10] sm:p-0">
              <h2 className="text-[26px] sm:hidden font-bold text-center w-full pb-8 sm:pt-4 capitalize sm:text-[20px] sm:font-semibold">
                Top Selling Cars
              </h2>

              <div className="pt-8 md:flex flex-col sm:flex hidden">
                <div className="w-[65px] h-[5px] bg-[#ee3131] mx-auto my-4"></div>
                <h2 className="text-xl w-full font-bold justify-center flex pl-4">
                  Top Selling Cars
                </h2>
                <h4 className="text-base flex justify-center py-4 text-[#999]">
                  Your Gateway to Top Choices
                </h4>
                <hr />
              </div>

              <div className="car-container flex w-[1220px] snap-mandatory pb-8 px-[20px] sm:pl-0 sm:w-[90vw] mx-auto overflow-x-auto overflow-y-hidden sm:overflow-y-visible">
                {carData.map((car, index) => (
                  <div
                    className="carCar scale-90 justify-between sm:pb-0 flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 transition-all duration-150 ease-in-out w-[394px] sm:w-[300px] sm:h-[372px] sm:p-0 shrink-0 cursor-pointer"
                    key={index}
                    onClick={() => searchSubmitHandler(car.name)}
                  >
                    <div className="img-container-car overflow-hidden rounded-2xl shadow-xl object-contain sm:overflow-hidden">
                      <img
                        src={car.imageSrc}
                        alt={car.altText}
                        className="object-conntain"
                      />
                      <span className="absolute text-[172px] sm:text-[123px] text-[#dddddde7] font-bold left-[-20px] sm:left-[-17px] bottom-[-80px] sm:bottom-[26px]">
                        {car.num}
                      </span>
                    </div>

                    {/* <div className="carDetails-home flex flex-col gap-[10px] sm:gap-1 sm:pt-[2px]">
                    <span className="flex flex-col justify-center gap-1 sm:text-sm sm:font-normal text-lg font-semibold">
                      <h2 className="mx-auto text-lg py-1 font-medium font-[roboto]">
                        {car.name}
                      </h2>
                      <hr />
                      <h2 className="mx-auto py-4 italic text-slate-500 font-normal text-center px-8 sm:px-0 ">
                        "{car.tagline}"
                      </h2>
                    </span>
                  </div> */}
                    {/* <div className="click-to-open pl-8 absolute sm:pb-2 sm:pl-4 sm:text-sm flex gap-2 items-center text-[#ee3131] font-medium text-base">
                    <h4>View All</h4>
                    <IoIosArrowDroprightCircle />
                  </div> */}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CarsBecho EV Revolution Section  */}
          <section className="relative -top-1 py-8">
          <div className="featured_Section w-fit sm:w-[100vw] bg-transparent h-fit sm:overflow-hidden mx-auto object-contain flex flex-col gap-4 p-4 sm:rounded-2xl sm:relative z-[10] sm:p-0">
            <div className="pt-8 flex-col sm:flex hidden">
              <div className="w-[65px] h-[5px] bg-[#ee3131] mx-auto my-4"></div>
              <h2 className="text-xl w-full font-bold justify-center flex pl-4">
                Electric Avenue
              </h2>
              <h4 className="text-base flex justify-center py-4 text-[#222]">
                Exploring the World of EVs on Carsbecho
              </h4>
              <hr />
            </div>
            <h2 className="text-[22px] py-4 text-center items-center justify-center bg-[#ffffff34] flex sm:hidden w-[70vw] mx-auto rounded-xl font-bold capitalize">
              Exploring the World of EVs on Carsbecho
            </h2>

            <div className="ev-container flex w-[1220px] snap-mandatory pb-8 px-[20px] sm:pl-0 sm:w-[90vw] m-auto overflow-x-auto gap-4 mt-4">
              <Link to="/ev/ev-benifits">
                <div className="ev-card justify-between bg-[url('/Cars/ev1.jpg')] bg-cover bg-right bg-no-repeat pb-8 sm:pb-0 flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[340px] h-[200px] sm:w-[300px] sm:h-[200px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"></div>
                <span className="w-full flex h-[100px] text-xl text-black border-1 border-[1px]">
                  <h2 className="text-center font-bold mx-auto my-auto">
                    Benefits of Electric Cars
                  </h2>
                </span>
              </Link>

              <Link to="/ev/ev-charge">
                <div className="ev-card justify-between bg-[url('/Cars/ev2.jpg')] bg-cover pb-8 sm:pb-0 flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[340px] sm:w-[300px] h-[200px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"></div>
                <span className="w-full flex h-[100px] text-xl text-black border-1 border-[1px]">
                  <h2 className="text-center font-bold mx-auto my-auto">
                    Charging Infrastructure
                  </h2>
                </span>
              </Link>

              <Link to="/ev/ev-range">
                <div className="ev-card justify-between bg-[url('/Cars/ev3.png')] bg-cover pb-8 sm:pb-0 flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[340px] sm:w-[300px] h-[200px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"></div>
                <span className="w-full flex h-[100px] text-xl text-black border-1 border-[1px]">
                  <h2 className="text-center font-bold mx-auto my-auto">
                    Range and Battery Technology
                  </h2>
                </span>
              </Link>

              <Link to="/ev/ev-government">
                <div className="ev-card justify-between bg-[url('/Cars/ev4.png')] bg-cover pb-8 sm:pb-0 flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[340px] sm:w-[300px] h-[200px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"></div>
                <span className="w-full flex h-[100px] text-xl text-black border-1 border-[1px]">
                  <h2 className="text-center font-bold px-4 mx-auto my-auto">
                    Government Incentives and Support
                  </h2>
                </span>
              </Link>

              <Link to="/ev/ev-growth">
                <div className="ev-card justify-between bg-[url('/Cars/ev5.png')] bg-center bg-cover pb-8 sm:pb-0 flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[340px] sm:w-[300px] h-[200px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"></div>
                <span className="w-full flex h-[100px] text-xl text-black border-1 border-[1px]">
                  <h2 className="text-center font-bold mx-auto my-auto">
                    EV Models and Market Growth
                  </h2>
                </span>
              </Link>
            </div>
          </div>
          </section>
            
          {/* about section  */}
          <section className="about_Section object-contain sm:my-0 w-full bg-slate-50 sm:relative">
            <div className="about_container w-[1300px] sm:w-[95vw] mx-auto object-contain bg-slate-50 flex flex-col gap-4 p-8  my-8">
              <div className="flex items-center justify-between sm:justify-center sm:w-full">
                <h2 className="text-[40px] sm:text-[28px] pl-4 sm:pl-0 capitalize font-semibold ml-4 sm:ml-0">
                  sell in 3 easy steps!
                </h2>
                <img
                  src={"Images/cbLogo.png"}
                  alt="carsBecho Logo"
                  className="w-24 sm:hidden"
                />
              </div>
              <hr />

              <div className="about_card_container flex flex-wrap items-center sm:gap-0 gap-8 p-4 mx-auto">
                <div className="card1 card m-0 min-h-0 w-[360px] h-[300px] sm:scale-[0.8] bg-white cursor-pointer rounded-2xl flex flex-col p-8 sm:relative sm:left-[-55px]">
                  <h3 className="text-2xl font-bold text-[#ee3131] pt-8 pb-8 mx-auto">
                    Online Price Estimate{" "}
                  </h3>
                  <hr />
                  <p className="ju justify-items-stretch py-8 px-6 text-lg font-normal text-justify">
                    Enter your car details, and get an estimate selling price in
                    a minute.
                  </p>
                  <img
                    src={"Images/priceEstimatelogo.png"}
                    alt="vector image"
                    className="card-image1 relative sm:bottom-[110px] xs:bottom-[80px] xs:left-[148px] sm:left-[250px] z-20 scale-[1.2]"
                  />
                </div>
                <div className="card2 card m-0 min-h-0 w-[360px] h-[300px] xs:w-[309px] xs:h-[270px] sm:scale-[0.8] xs:left-[48px] sm:top-[-30px] bg-white cursor-pointer rounded-2xl flex flex-col p-8 sm:relative sm:left-[60px]">
                  <h3 className="text-2xl font-bold text-[#ee3131] pt-8 pb-8 mx-auto text-center">
                    Inspection at home or branch
                  </h3>
                  <hr className="relative top-[-25px]" />
                  <p className="ju justify-items-stretch pb-8 px-6 text-lg font-normal text-justify">
                    Each car is unique! Our expert evaluates your car to give
                    you the final price.
                  </p>
                  <img
                    src={"Images/inspectionlogo.png"}
                    alt="vector image"
                    className="card-image2 relative sm:bottom-[150px] sm:right-[250px] xs:right-[210px] xs:bottom-[131px] bottom-8 z-20"
                  />
                </div>
                <div className="card3 card m-0 min-h-0 w-[360px] h-[300px] sm:scale-[0.8] sm:top-[-57px] xs:top-[-50px] bg-white cursor-pointer rounded-2xl flex flex-col p-8 sm:relative sm:left-[-55px]">
                  <h3 className="text-2xl font-bold text-[#ee3131] pt-8 pb-8 mx-auto">
                    Sell & get paid!
                  </h3>
                  <hr />
                  <p className="ju justify-items-stretch py-8 px-6 text-lg font-normal text-justify">
                    Get the best price through online auction and get paid
                    instantly. We also take care of the RC Transfer for free.
                  </p>
                  <img
                    src={"Images/selllogo.png"}
                    alt="vector image"
                    className="card-image3 relative bottom-12 xs:bottom-[70px] xs:left-[150px] z-20  sm:bottom-[101px] sm:left-[211px]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* why choose us section  */}
          <section className="whyChooseUs sm:hidden sm:mt-8 object-contain w-full bg-slate-50 flex sm:flex-col sm:justify-center sm:items-center gap-8 mt-12 sm:relative sm:top-[50px]">
            <div className="sm:flex items-center justify-between hidden xs:relative xs:top-14">
              <h2 className="text-[40px] sm:text-[25px] pl-4 capitalize font-semibold ml-4">
                why choose us?
              </h2>
            </div>
            <hr className="w-[80vw] hidden sm:flex xs:relative xs:top-14" />
            <div className="whyChooseUs-container flex flex-wrap gap-8 sm:gap-0 sm:p-1 p-8 mx-auto sm:mx-0 sm:justify-center sm:items-center">
              <div className="card-x card w-[360px] sm:w-full h-[300px] bg-[#ee3131] cursor-pointer rounded-2xl flex flex-col p-8 place-content-center">
                <div className="ico w-[80px] h-[80px] rounded bg-white flex place-content-center items-center place-self-center">
                  <FiCheckCircle className="text-[#ee3131] text-[40px]" />
                </div>
                <div className="relative bottom-[-30px] w-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-[#ffffff] pt-2 pb-2 mx-auto">
                    BEST PRICE{" "}
                  </h3>
                  <p className="ju justify-items-stretch pb-8 pt-4 px-6 text-xl font-normal text-center text-white">
                    Enter your car details, and get an estimate selling price in
                    a minute.
                  </p>
                </div>
              </div>
              <div className="card-x mx-[20px] sm:mx-0 card w-[360px] sm:w-full h-[300px] bg-[#ee3131] cursor-pointer rounded-2xl flex flex-col p-8 place-content-center sm:relative sm:top-[-60px]">
                <div className="ico w-[80px] h-[80px] rounded bg-white flex place-content-center items-center place-self-center">
                  <IoCarSportOutline className="text-[#ee3131] text-[40px]" />
                </div>
                <div className="relative bottom-[-30px] w-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-[#ffffff] pt-2 pb-2 mx-auto">
                    INSTANT PAYMENT{" "}
                  </h3>
                  <p className="ju justify-items-stretch pb-8 pt-4 px-6 text-xl font-normal text-center text-white">
                    The entire amount is tranferred to you even before car
                    pickup!
                  </p>
                </div>
              </div>
              <div className="card-x card w-[360px] sm:w-full h-[300px] bg-[#ee3131] cursor-pointer rounded-2xl flex flex-col p-8 place-content-center sm:relative sm:top-[-110px]">
                <div className="ico w-[80px] h-[80px] rounded bg-white flex place-content-center items-center place-self-center">
                  <FiThumbsUp className="text-[#ee3131] text-[40px]" />
                </div>
                <div className="relative bottom-[-35px] w-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-[#ffffff] pt-2 pb-2 mx-auto">
                    FREE RC TRANSFER{" "}
                  </h3>
                  <p className="ju justify-items-stretch pb-8 pt-4 px-2 text-xl font-normal text-center text-white">
                    We'll handle all the paperwork, from Loan clearance to RC
                    transfer for free
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>{" "}
      </>
    </Fragment>
  );
};

export default Home;

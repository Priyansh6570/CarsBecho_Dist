import React, {
  useEffect,
  Fragment,
  useState,
  useCallback,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import "../../styles/usedCar.scss";
import { useSelector, useDispatch } from "react-redux";
import { getCar, clearErrors } from "../../actions/carAction";
import { HiPlus } from "react-icons/hi";
import Car from "./Car.jsx";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { Collapse, Ripple, initTE } from "tw-elements";
import ScrollToTopOnMount from "../ScrollToTopOnMount";
import { CLEAR_SEARCH_RESULTS } from "../../constants/carConstants";
import Skeleton from "@mui/material/Skeleton";
import { ImLocation } from "react-icons/im";
import MetaData from "../Layout/MetaData";
import InfiniteScroll from "react-infinite-scroll-component";
// import cities from "../cities.js";

const categories = [
  "All",
  "Sedan",
  "Hatchback",
  "SUV",
  "Convertible",
  "Coupe",
  "Premium",
  "Supercar",
];

const fuel_types = ["All", "Petrol", "Diesel", "CNG", "LPG", "Electric"];

const transmission_types = ["All", "Manual", "Automatic"];

const UsedCar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  initTE({ Collapse, Ripple });
  const dispatch = useDispatch();
  const alert = useAlert();

  const { keyword } = useParams();
  const [loadingCars, setLoadingCars] = useState(false);
  const [isEndOfResults, setIsEndOfResults] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);
  const lastCarRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([10000, 50000000]);
  const [isSliding, setIsSliding] = useState(false);

  const [category, setCategory] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");

  const { cars, loading, error, carCount, resultPerPage, totalPages } =
    useSelector((state) => state.cars);

  const city = sessionStorage.getItem("location")?.replace(/"/g, "") || "";
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // let count = filteredCarsCount;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  function priceLabelFormat(value) {
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  }
  const handlePriceChange = useCallback((event, newValue) => {
    setPrice(newValue);
  }, []);

  const handleSliderMouseDown = useCallback(() => {
    event.preventDefault();
    setIsSliding(true);
  }, []);

  const handleSliderMouseUp = () => {
    setIsSliding(false);
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      if (!loadingMore && !isEndOfResults && currentPage < totalPages) {
        setLoadingMore(true);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }, 0);
  };
  useEffect(() => {
    if (!isSliding) {
      dispatch({ type: CLEAR_SEARCH_RESULTS });
      dispatch(
        getCar(keyword, currentPage, price, category, fuel, transmission, city)
      );
    }
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    fuel,
    transmission,
    isSliding,
    city,
  ]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  useEffect(() => {
    if (cars && cars.length < resultPerPage) {
      setIsEndOfResults(true);
    } else {
      setIsEndOfResults(false);
    }
    setLoadingMore(false);
  }, [cars, resultPerPage]);

  useEffect(() => {
    if (
      category === "" &&
      fuel === "" &&
      transmission === "" &&
      keyword === "" &&
      price[0] === 10000 &&
      price[1] === 50000000
    ) {
      setAllCars((prevCars) => [...prevCars, ...cars]);
    } else {
      setFilteredCars((prevCars) => [...prevCars, ...cars]);
    }
  }, [cars, category, fuel, transmission, keyword, price]);

  useEffect(() => {
    setAllCars([]);
    setFilteredCars([]);
    setCurrentPage(1);
    setIsEndOfResults(false);
    setLoadingMore(false);
  }, [category, fuel, transmission, keyword, price]);
  const uniqueCars = [
    ...new Map(allCars.map((car) => [car._id, car])).values(),
  ];
  return (
    <Fragment>
      <Fragment>
        <MetaData title={"CarsBecho Used Cars"} />
        <main className="flex flex-col gap-3 h-fit md:gap-0 mt-8 md:mt-0 sm:mt-0 sm:relative sm:top-[-45px]">
          {/* warrenty info */}
          <div className="warrenty-alert  overflow-hidden sm:flex hidden w-[96%] m-auto h-[50px] rounded-lg bg-[#f1f1f2] relative top-[48px] mb-4">
            {/* // showing current location from session sessionStorage  */}
            <div className="pl-8 flex justify-center items-center">
              <ImLocation className="text-[#ee3131]" />
              <p className="text-[#333] w-full p-2 text-sm font-medium">
                {city ? `Used Cars in ${city}` : "Used Cars from all cities"}
              </p>
            </div>
          </div>

          <div className="banner hidden px-4 pt-2 sm:flex relative top-[35px] w-full">
            <img src="/Images/warrenty-banner.png" alt="warrenty imformation" />
          </div>

          {/* filter */}
          <div className="right-sm hidden sm:flex sm:flex-col sm:relative sm:top-[45px] filters w-[30%] sm:w-full mb-8 h-[200px] sm:h-fit">
            <div className="filter-bt sm:flex sm:gap-[4px] sm:justify-between sm:px-4">
              <button
                className="filter-bt1 whitespace-nowrap px-2 "
                type="button"
                data-te-collapse-init
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-target="#collapseExample1"
                aria-expanded="true"
                aria-controls="collapseExample1"
                data-te-collapse-ignore
              >
                PRICE RANGE
              </button>
              <button
                className="filter-bt1 w-fit"
                type="button"
                data-te-collapse-init
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-target="#collapseExample2"
                aria-expanded="false"
                aria-controls="collapseExample2"
              >
                CATEGORY
              </button>
              <button
                className="filter-bt1 justify-center"
                type="button"
                data-te-collapse-init
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-target="#collapseExample3"
                aria-expanded="false"
                aria-controls="collapseExample3"
              >
                FUEL
              </button>
              <button
                className="filter-bt1"
                type="button"
                data-te-collapse-init
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-target="#collapseExample4"
                aria-expanded="false"
                aria-controls="collapseExample4"
              >
                TRANSMISSION
              </button>
            </div>
            <div
              className="!visible hidden mt-2"
              id="collapseExample1"
              data-te-collapse-item
            >
              <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                <Slider
                  aria-labelledby="range-slider"
                  valueLabelDisplay="auto"
                  min={10000}
                  max={50000000}
                  value={price}
                  onChange={handlePriceChange}
                  onChangeCommitted={handleSliderMouseUp}
                  valueLabelFormat={priceLabelFormat}
                  onMouseDown={handleSliderMouseDown}
                  onMouseUp={handleSliderMouseUp}
                  onTouchStart={handleSliderMouseDown}
                  onTouchEnd={handleSliderMouseUp}
                  style={{ color: "#ee3131" }}
                />
                <div className="price-num flex justify-between">
                  <div className="">
                    <span className="font-semibold">Min Price: </span>
                    <div> {priceLabelFormat(price[0])}</div>
                  </div>
                  <div className="">
                    <span className="font-semibold right-6">Max Price: </span>
                    <div className=""> {priceLabelFormat(price[1])}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="!visible hidden mt-2"
              id="collapseExample2"
              data-te-collapse-item
            >
              <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                  {categories.map((category) => (
                    <li
                      className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="!visible hidden mt-2"
              id="collapseExample3"
              data-te-collapse-item
            >
              <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                  {fuel_types.map((fuel) => (
                    <li
                      key={fuel}
                      onClick={() => setFuel(fuel)}
                      className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                    >
                      {fuel}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="!visible hidden mt-2"
              id="collapseExample4"
              data-te-collapse-item
            >
              <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                  {transmission_types.map((transmission) => (
                    <li
                      key={transmission}
                      onClick={() => setTransmission(transmission)}
                      className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                    >
                      {transmission}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="wrapper sm:min-h-[1100px] flex md:flex-col gap-3 md:gap-0 mt-8 md:m-0 sm:mt-4 relative">
            <div className="right-lg flex sm:hidden sticky top-[200px] md:top-0 sm:relative sm:top-[38px] filters w-[450px] md:w-full sm:w-full mb-8 md:mb-0 h-fit sm:h-fit justify-center md:py-0 py-6">
              <div className="right-filter-secondary-container rounded-xl w-[80%] md:w-full sm:w-full px-8 sm:px-0 py-8 md:py-4 h-fit">
                <div className="filter-bt  flex flex-col md:flex-row gap-4 sm:flex-row sm:flex sm:gap-[4px] md:justify-between sm:px-4">
                  <div className="md:flex md:scale-90 justify-between w-full hidden">
                    <div className="">
                      <button
                        className="filter-bt1 flex justify-between whitespace-nowrap h-16 px-6 font-semibold text-base "
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init="false"
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample1"
                        aria-expanded="true"
                        aria-controls="collapseExample1"
                        data-te-collapse-ignore
                      >
                        PRICE RANGE
                        <HiPlus className="sm:hidden" />
                      </button>

                      <div
                        className="!visible hidden mt-2"
                        id="collapseExample1"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                          <Slider
                            aria-labelledby="range-slider"
                            valueLabelDisplay="auto"
                            min={10000}
                            max={50000000}
                            value={price}
                            onChange={handlePriceChange}
                            onChangeCommitted={handleSliderMouseUp}
                            valueLabelFormat={priceLabelFormat}
                            onMouseDown={handleSliderMouseDown}
                            onMouseUp={handleSliderMouseUp}
                            onTouchStart={handleSliderMouseDown}
                            onTouchEnd={handleSliderMouseUp}
                            style={{ color: "#ee3131" }}
                          />
                          <div className="price-num flex justify-between">
                            <div className="">
                              <span className="font-semibold">Min Price: </span>
                              <div> {priceLabelFormat(price[0])}</div>
                            </div>
                            <div className="">
                              <span className="font-semibold relative right-0">
                                Max Price:{" "}
                              </span>
                              <div className="relative top-0">
                                {" "}
                                {priceLabelFormat(price[1])}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 flex justify-between sm:w- h-16 px-6 font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample2"
                        aria-expanded="false"
                        aria-controls="collapseExample2"
                      >
                        CATEGORY
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="!visible hidden mt-2"
                        id="collapseExample2"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center flex flex-wrap gap-4">
                            {categories.map((category) => (
                              <li
                                className="category-link font-medium text-sm hover:scale-[1.02] active:bg-[#eb5f5f] active:text-white cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 sm:justify-center h-16 flex justify-between px-6 font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample3"
                        aria-expanded="false"
                        aria-controls="collapseExample3"
                      >
                        FUEL
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="!visible hidden mt-2"
                        id="collapseExample3"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                            {fuel_types.map((fuel) => (
                              <li
                                key={fuel}
                                onClick={() => setFuel(fuel)}
                                className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                              >
                                {fuel}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 h-16 px-6 flex justify-between font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample4"
                        aria-expanded="false"
                        aria-controls="collapseExample4"
                      >
                        TRANSMISSION
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="!visible hidden mt-2"
                        id="collapseExample4"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                            {transmission_types.map((transmission) => (
                              <li
                                key={transmission}
                                onClick={() => setTransmission(transmission)}
                                className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                              >
                                {transmission}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 md:hidden">
                    <div className="">
                      <button
                        className="filter-bt1 flex justify-between whitespace-nowrap h-16 px-6 font-semibold text-base "
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init="false"
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample1"
                        aria-expanded="true"
                        aria-controls="collapseExample1"
                        data-te-collapse-ignore
                      >
                        PRICE RANGE
                        <HiPlus className="sm:hidden" />
                      </button>

                      <div
                        className="visible mt-2"
                        id="collapseExample1"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                          <Slider
                            aria-labelledby="range-slider"
                            valueLabelDisplay="auto"
                            min={10000}
                            max={50000000}
                            value={price}
                            onChange={handlePriceChange}
                            onChangeCommitted={handleSliderMouseUp}
                            valueLabelFormat={priceLabelFormat}
                            onMouseDown={handleSliderMouseDown}
                            onMouseUp={handleSliderMouseUp}
                            onTouchStart={handleSliderMouseDown}
                            onTouchEnd={handleSliderMouseUp}
                            style={{ color: "#ee3131" }}
                          />
                          <div className="price-num flex justify-between">
                            <div className="">
                              <span className="font-semibold">Min Price: </span>
                              <div> {priceLabelFormat(price[0])}</div>
                            </div>
                            <div className="">
                              <span className="font-semibold relative right-0">
                                Max Price:{" "}
                              </span>
                              <div className="relative top-0">
                                {" "}
                                {priceLabelFormat(price[1])}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 flex justify-between sm:w- h-16 px-6 font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample2"
                        aria-expanded="false"
                        aria-controls="collapseExample2"
                      >
                        CATEGORY
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="visible mt-2"
                        id="collapseExample2"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center flex flex-wrap gap-4">
                            {categories.map((category) => (
                              <li
                                className="category-link font-medium text-sm hover:scale-[1.02] active:bg-[#eb5f5f] active:text-white cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 sm:justify-center h-16 flex justify-between px-6 font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample3"
                        aria-expanded="false"
                        aria-controls="collapseExample3"
                      >
                        FUEL
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="visible mt-2"
                        id="collapseExample3"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                            {fuel_types.map((fuel) => (
                              <li
                                key={fuel}
                                onClick={() => setFuel(fuel)}
                                className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                              >
                                {fuel}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 h-16 px-6 flex justify-between font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample4"
                        aria-expanded="false"
                        aria-controls="collapseExample4"
                      >
                        TRANSMISSION
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="visible mt-2"
                        id="collapseExample4"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                            {transmission_types.map((transmission) => (
                              <li
                                key={transmission}
                                onClick={() => setTransmission(transmission)}
                                className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                              >
                                {transmission}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cars  */}
            <div className="flex flex-wrap flex-col w-[70%] md:w-full">
            { loading && filteredCars.length === 0 && (
              <>
              <div className="cars left flex justify-start content-start w-full md:px-4 h-fit mt-4 flex-wrap gap-[10px] sm:gap-[2px]">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={`${index}_l1`}
                    className="carCard md:flex md:scale-[0.8] sm:hidden flex w-[300px] h-fit flex-col gap-[4px] md:gap-1 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md sm:w-[154px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"
                  >
                    <Skeleton
                      variant="rectangular"
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
                ))}
              </div>
              <div className="flex flex-col relative top-[30px]">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={`${index}_lo`}
                    className="mobile-carCard hidden mt-4 sm:flex w-[100vw] relative -top-12 h-fit p-1 rounded-xl gap-4 cursor-pointer"
                  >
                    <Skeleton
                      style={{ borderRadius: 4 }}
                      variant="rectangular"
                      animation="wave"
                      width="35%"
                      height={100}
                    />
                    <div className="carDetails justify-center flex self-center flex-col gap-[4px] w-[60%] h-[80%] p-1">
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
                        width="60%"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
            )}
            
            <div className="cars left flex justify-start content-start overflow-x-hidden w-full md:px-4 sm:w-full h-fit mt-4 flex-wrap gap-[10px] sm:gap-[2px] my-6">
              <InfiniteScroll
                dataLength={filteredCars.length + uniqueCars.length}
                next={fetchMoreData}
                hasMore={!loadingMore && currentPage < totalPages}
                scrollThreshold={0.3}
                className="w-[102%]"
                loader={
                  filteredCars.length%9===0 && filteredCars.length !==0 && currentPage < totalPages && (
                  <>
                    <div className="cars left flex justify-start content-start w-full md:px-4 h-fit mt-4 flex-wrap gap-[10px] sm:gap-[2px]">
                      {[...Array(9)].map((_, index) => (
                        <div
                          key={`${index}_l1`}
                          className="carCard md:flex md:scale-[0.8] sm:hidden flex w-[300px] h-fit flex-col gap-[4px] md:gap-1 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md sm:w-[154px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"
                        >
                          <Skeleton
                            variant="rectangular"
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
                      ))}
                    </div>

                    <div className="flex flex-col">
                      {[...Array(9)].map((_, index) => (
                        <div
                          key={`${index}_lo`}
                          className="mobile-carCard hidden mt-4 sm:flex w-[100vw] relative -top-12 h-fit p-1 rounded-xl gap-4 cursor-pointer"
                        >
                          <Skeleton
                            style={{ borderRadius: 4 }}
                            variant="rectangular"
                            animation="wave"
                            width="35%"
                            height={100}
                          />
                          <div className="carDetails justify-center flex self-center flex-col gap-[4px] w-[60%] h-[80%] p-1">
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
                              width="60%"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                  )
                }
                endMessage={
                  <p style={{ textAlign: "center", width: "100%" }}>
                    <br />
                    <b className="text-lg font-medium mx-auto text-slate-500">
                      That is All!
                    </b>
                  </p>
                }
              >
                {filteredCars
      .filter((car) => car.user && car.user.expireLimit > 0)
      .map((car, index) => (
        <div key={car._id}>
          <Car car={car} />
        </div>
      ))}
    {uniqueCars
      .filter((car) => car.user && car.user.expireLimit > 0)
      .map((car, index) => (
        <div key={`${car._id}_un`}>
          <Car car={car} />
        </div>
      ))}
              </InfiniteScroll>
            </div>
            {
              filteredCars && filteredCars.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-start mt-8 py-8 w-full h-[400px]">
                  <p className="text-lg font-medium text-slate-500">{category && category ? `No ${category} cars available` : ``} {fuel && fuel ? `No ${fuel} cars available` : ''} {transmission && transmission ? `No ${transmission} cars available` : ``} {city ? `No cars available in ${city}` : ''}</p>
                </div>
              )
            }
            </div>
          </div>
        </main>
      </Fragment>
    </Fragment>
  );
}; 
export default UsedCar;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPendingCars } from "../../actions/carAction";
import Loader from "../Layout/Loader/Loader";
import "../../styles/carCard.scss";
import {useHistory} from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import NumberWithCommas from "../PriceSeperator";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { Link } from "react-router-dom";
import { GiGearStickPattern } from "react-icons/gi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import "../../styles/carCard.scss";

const PendingCars = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, notVerifiedCars } = useSelector((state) => state.cars);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;
  const maxDisplayedPages = 4;

  useEffect(() => {
    dispatch(getAllPendingCars());
  }, [dispatch]);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === 'POP' && location.pathname === '/admin/cars/pending') {
        // Trigger a reload when coming from the "approve car" page
        window.location.reload();
      }
    });

    return () => {
      unlisten();
    };
  }, [history]);

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = notVerifiedCars

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(notVerifiedCars.length / carsPerPage);

  // Determine the range of page numbers to display
  const getPageRange = () => {
    let startPage;
    let endPage;

    if (totalPages <= maxDisplayedPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxDisplayedPages / 2)) {
        startPage = 1;
        endPage = maxDisplayedPages;
      } else if (
        currentPage >=
        totalPages - Math.floor(maxDisplayedPages / 2)
      ) {
        startPage = totalPages - maxDisplayedPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxDisplayedPages / 2);
        endPage = currentPage + Math.ceil(maxDisplayedPages / 2) - 1;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div>
      <div className="main w-[70vw] sm:w-full bg-[url('/Images/bg-car-side.jpg')] bg-cover mx-auto m-8 h-[200px] sm:h-[150px] rounded-2xl ">
        <h2 className="text-[30px] xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-9 pt-8 justify-center flex">
          {notVerifiedCars.length > 0 ? "Pending Cars" : "No Pending Cars"}
        </h2>
      </div>
      {loading ? (
        <Loader />
      ) : (
       
            <>
              <ul className="flex rounded-2xl mb-14 p-6 sm:flex-col m-4 sm:m-1 sm:mr-2 sm:p-0 gap-6 flex-wrap justify-center w-[70vw] mx-auto">
                {currentCars.map((car) => (
                  <li key={car._id} className="self-center">
                    <Link
                      to={`/admin/cars/pending/${car._id}`}
                      className="h-fit"
                      key={car._id}
                    >
                      <div className="carCard sm:hidden w-[300px] h-fit flex flex-col gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md sm:w-[154px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden">
                        <div className="img-container-car sm:overflow-hidden">
                          <img
                            src={car && car.image[0].url}
                            alt={car.model}
                            className="w-[300px] h-[150px] sm:w-[282px] sm:h-[90px] object-cover sm:scale-[1.1] "
                          />
                        </div>
                        <div className="carDetails flex flex-col gap-[10px] sm:px-2">
                          <span className="flex flex-wrap gap-1 sm:text-sm text-lg font-semibold">
                            <h2>{car.make}</h2>
                            <h2>{car.model}</h2>
                            <h4 className="font-normal sm:hidden">{`(${car.year})`}</h4>
                          </span>
                          <span className="text-xs mb-2 sm:my-2 sm:text-sm uppercase text-[#3d3d3d] flex">
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
                          <div className="carPrice font-bold text-xl">
                            <h3>₹ {NumberWithCommas(`${car.price}`)}</h3>
                          </div>
                          <div className="click-to-open flex gap-2 items-center text-[#ee3131] mt-4 font-medium text-sm">
                            <h4>View More</h4>
                            <IoIosArrowDroprightCircle />
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link
                      to={`/admin/cars/pending/${car._id}`}
                      key={`mobile_car_${car._id}`}
                    >
                      <div className="mobile-carCard hidden sm:flex w-[100vw] h-fit p-1 rounded-xl gap-4 cursor pointer">
                        <div className="image-container w-[35%] h-[100px] p-1">
                          <img
                            src={car && car.image[0].url}
                            alt={car.model}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="carDetails flex flex-col gap-[5px] w-[60%] h-[80%] p-1">
                          <span className="flex gap-1 whitespace-nowrap text-sm">
                            <h2>{car.year}</h2>
                            <h2>{car.make}</h2>
                            <h2>{car.model}</h2>
                            <h2 className="overflow-hidden text-ellipsis varient">
                              {car.varient}
                            </h2>
                          </span>
                          <div className="main-perks text-[#666] flex text-xs items-center gap-2">
                            <span className="flex gap-1 mr-1 justify-center items-center">
                              <FaGasPump /> {car.fuel}
                              {`•`}
                            </span>
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <SlSpeedometer /> {car.Km_Driven}km{`•`}
                            </span>
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <GiGearStickPattern />
                              {car.transmission}
                            </span>
                          </div>
                          <div className="carPrice">
                            <h3 className="text-2xl font-bold font-sans">
                              ₹ {NumberWithCommas(`${car.price}`)}
                            </h3>
                          </div>
                          <div className="click-to-open flex gap-2 items-center text-[#ee3131] mt-1 font-medium text-sm">
                            <h4>Click to View More</h4>
                            <IoIosArrowDroprightCircle />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center my-4 px-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <BsChevronLeft />
                </button>
                <ul className="flex">
                  {getPageRange().map((page) => (
                    <li
                      key={page}
                      className={`px-3 py-2 rounded-lg border-2 ${
                        currentPage === page ? "bg-blue-500 text-white" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </li>
                  ))}
                </ul>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <BsChevronRight />
                </button>
              </div>
            </>
          )}
      
    </div>
  );
};

export default PendingCars;

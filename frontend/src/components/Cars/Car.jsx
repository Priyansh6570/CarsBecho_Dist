import React, {useState, useEffect} from "react";
import NumberWithCommas from "../PriceSeperator";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { Link } from "react-router-dom";
// import { GiGearStickPattern } from "react-icons/gi";
import {FaRegUser} from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import "../../styles/carCard.scss";
import { ImLocation } from "react-icons/im";
import Skeleton from "@mui/material/Skeleton";

const Car = (props) => {
  const { car } = props;
  if (!car) {
    return null;
  }
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = car.image[0].url;

    const handleImageLoad = () => {
      setShowSkeleton(false);
    };

    image.onload = handleImageLoad;

    return () => {
      image.onload = null;
    };
  }, [car.image]);

  return (
    <>
      <Link to={`/car/${car._id}`} className="h-fit" key={car._id}>
        <div className="carCard md:flex md:scale-[0.8] sm:hidden flex w-[300px] h-fit flex-col gap-[4px] hover:border-3 hover:shadow-md shrink-0 cursor-pointer">
          <div className="img-container-car">
            {/* //image skeleton  */}
            {showSkeleton ? (
            <Skeleton
              variant="rectangular"
              width={300}
              height={150}
              animation="wave"
            />
            ) : (
              <img
              src={car && car.image[0].url}
              alt={car.model}
              className="w-[300px] h-[150px] object-cover sm:scale-[1.1]"
            />
            )}
          </div>
          <div className="carDetails flex flex-col gap-[10px] sm:px-2">
            <span className="flex overflow-hidden gap-1 sm:text-sm text-lg font-semibold">
              <h2 className=" whitespace-nowrap">{car.make}</h2>
              <h2 className=" whitespace-nowrap">{car.model}</h2>
              <h4 className="font-normal sm:hidden overflow-ellipsis">{`(${car.year})`}</h4>
            </span>
            <span className="text-xs whitespace-nowrap mb-2 sm:my-2 sm:text-sm uppercase text-[#3d3d3d] flex">
              <span className="flex gap-2 mr-2 justify-center items-center">
                <FaGasPump /> {car.fuel} {` | `}
              </span>
              <span className="flex gap-2 mr-2 justify-center items-center">
                <SlSpeedometer /> {car.Km_Driven}km{` | `}
              </span>
              <span className="flex gap-2 mr-2 justify-center items-center">
              <FaRegUser />
              {car.no_of_owners === 1 && "First Owner"}
                      {car.no_of_owners === '1' && "First Owner"}
                      {car.no_of_owners === 2 && "Second Owner"}
                      {car.no_of_owners === '2' && "Second Owner"}
                      {car.no_of_owners === 3 && "Third Owner"}
                      {car.no_of_owners === '3' && "Third Owner"}
                      {car.no_of_owners === 4 && "Fourth Owner"}
                      {car.no_of_owners === '4'&& "Fourth Owner"}
                      {car.no_of_owners === '4+' && "4+ Owner"}
              </span>
            </span>
            <div className="carPrice font-bold text-xl">
              <h3>₹ {NumberWithCommas(`${car.price}`)}</h3>
            </div>
            <div className="click-to-open flex gap-2 justify-between items-center text-[#ee3131] mt-4 font-medium text-sm">
              <div className="flex items-center">
              <h4>View More</h4>
              <IoIosArrowDroprightCircle />
              </div>
              <div className="city flex items-center">
              <ImLocation className="text-gray-500" />
              <h4>{car.city}</h4>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link to={`/car/${car._id}`} key={`mobile_car_${car._id}`}>
        <div className="mobile-carCard hidden sm:flex w-[95vw] h-fit p-1 rounded-xl gap-4 cursor pointer">
          <div className="image-container w-[35%] h-[100px] p-1">
            {/* // image skeleton  */}
            {showSkeleton ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={100}
              animation="wave"
            />
            ) : (
              <img
              src={car && car.image[0].url}
              alt={car.model}
              loading="lazy"
              className="w-[100%] h-[100%] object-cover"
            />  
            )}
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
            <div className="main-perks text-[#666] flex text-xs items-center gap-1">
              <span className="flex gap-1 justify-center items-center">
                <FaGasPump /> {car.fuel}
              </span>
                {`•`}
              <span className="flex gap-2 justify-center items-center">
                <SlSpeedometer /> {car.Km_Driven}km
              </span>
                {`•`}
              <span className="flex gap-2 justify-center items-center">
                <FaRegUser />
                {car.no_of_owners === 1 && "First Owner"}
                      {car.no_of_owners === '1' && "First Owner"}
                      {car.no_of_owners === 2 && "Second Owner"}
                      {car.no_of_owners === '2' && "Second Owner"}
                      {car.no_of_owners === 3 && "Third Owner"}
                      {car.no_of_owners === '3' && "Third Owner"}
                      {car.no_of_owners === 4 && "Fourth Owner"}
                      {car.no_of_owners === '4'&& "Fourth Owner"}
                      {car.no_of_owners === '4+' && "4+ Owner"}
              </span>
            </div>
            <div className="carPrice">
              <h3 className="text-2xl font-bold font-sans">
                ₹ {NumberWithCommas(`${car.price}`)}
              </h3>
            </div>
            <div className="click-to-open flex gap-2 justify-between items-center text-[#ee3131] mt-1 font-medium text-sm">
              <div className="flex items-center">
              <h4>View More</h4>
              <IoIosArrowDroprightCircle />
              </div>
              <div className="city scale-95 flex items-center px-2 bg-slate-50">
              <ImLocation className="text-gray-500" />
              <h4>{car.city}</h4>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Car;

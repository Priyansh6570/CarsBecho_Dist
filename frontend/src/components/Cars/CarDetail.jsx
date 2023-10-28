import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useHistory } from "react-router-dom";

//Components, APIs, utils
import { WishList, WishListMob } from "./WishList";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import NumberWithCommas from "../PriceSeperator";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_SEARCH_RESULTS } from "../../constants/carConstants";
import { Collapse, Ripple, initTE } from "tw-elements";
import { clearErrors, getCarDetails, getRCar } from "../../actions/carAction";
import { createOrder } from "../../actions/orderAction";
import Modal from "react-modal";
import Skeleton from "@mui/material/Skeleton";
import { BadgeMobile, Badge } from "../Badge";
import ImageGallery from "./ImageGallery";

//Styles, Icons
import "../../styles/carDetail.scss";
import { FaGasPump, FaRegImages } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { VscSymbolColor } from "react-icons/vsc";
import { IoCarSportOutline } from "react-icons/io5";
import { TfiBriefcase } from "react-icons/tfi";
import { IoIosArrowBack, IoIosArrowDroprightCircle } from "react-icons/io";
import { BsCalendar2Check } from "react-icons/bs";
import { BsBuilding } from "react-icons/bs";
import ScrollToTopOnMount from "../ScrollToTopOnMount";
import { HiPlus } from "react-icons/hi";
import { AiOutlineCloseCircle, AiOutlineShareAlt } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { Helmet } from "react-helmet";

const CarDetail = () => {

useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  const scrollup = () => {
    window.scrollTo(0, 0);
  };

  initTE({ Collapse, Ripple });
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [showMakeOfferModal, setShowMakeOfferModal] = useState(false);

  const { id } = useParams();
  const { car, loading, error } = useSelector((state) => state.carDetails);
  const { cars } = useSelector((state) => state.cars);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselInner = useRef(null);

  const slideChanged = useCallback(() => {
    const activeItem = carouselInner.current.querySelector(".active");
    setCurrentSlide(
      Array.from(carouselInner.current.children).indexOf(activeItem)
    );
  }, []);

  const changeSlide = useCallback((position) => {
    Array.from(carouselInner.current.children).forEach((el, i) => {
      if (i !== position) {
        el.classList.remove("active");
      } else {
        el.classList.add("active");
        slideChanged();
      }
    });
  }, []);

  const handleViewAllImages = () => {
    window.scrollTo(0, 0);
    setShowImages(true);
  };

  const handleCloseAllImages = () => {
    setShowImages(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCarDetails(id));
  }, [dispatch, id, error, alert]);

  useEffect(() => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
    dispatch(getRCar(car.category, car.price));
  }, [dispatch, car]);
  const seller = car?.user;

  const handleMakeOffer = () => {
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      setSelectedAction("makeOffer");
      setShowMakeOfferModal(true);
    }
  };

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      history.push("/login");
    }
    setSelectedAction("contactSeller");
    setShowConfirmation(true);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert.success("Link copied to clipboard!");
  };
  const handleMakeOfferConfirmation = async () => {
    try {
      const userOrderId = user._id;
      const carOrderId = car._id;
      const urls = window.location.href;
      if (seller._id === userOrderId) {
        alert.error("You cannot make an offer on your own car");
      } else {
        await dispatch(
          createOrder(seller._id, userOrderId, carOrderId, urls, offerPrice)
        );
        alert.success("Request sent successfully");
      }
      setShowMakeOfferModal(false);
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  const handleConfirmation = async () => {
    if (selectedAction === "makeOffer") {
      handleMakeOfferConfirmation();
    } else if (selectedAction === "contactSeller") {
      try {
        const userOrderId = user._id;
        const carOrderId = car._id;
        if (seller._id === userOrderId) {
          alert.error("You cannot make an offer on your own car");
        } else {
          await dispatch(createOrder(seller._id, userOrderId, carOrderId));
          alert.success("Request sent successfully");
        }
        setShowConfirmation(false);
      } catch (error) {
        alert.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
    dispatch(getRCar(car?.category, car?.price)); // Add car?.category and car?.price as dependencies
  }, [dispatch, car?.category, car?.price]);

  // set loading true for testing

  const defaultTitle = 'Car Details - CarsBecho';
  const defaultDescription = 'Check out this amazing car!';
  const defaultImage = '/Images/bg-car-side.png';

  const ogTitle = car ? `${car.make} ${car.model}` : defaultTitle;
  const ogDescription = car
    ? `Price: $${car.price} - Year: ${car.year} - Ownership: ${car.no_of_owners}`
    : defaultDescription;
  const ogImage = car ? "/Images/cbLogo1.png" : defaultImage;
  const ogUrl = car ? `https://carsbecho.com/car/${car._id}` : 'https://carsbecho.com';


  return (
    <div className="carName">
      <MetaData
              title={`${car.make} ${car.model} ${car.varient} ${car.year}`}
            />
            <Helmet>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <main className="carDetail__mainContainer sm:overflow-hidden flex md:flex-col sm:flex-col gap-10 md:gap-0 overflow-hidden sm:gap-0 my-[50px] md:my-0 sm:my-2 w-[1220px] md:w-full sm:w-[100vw] mx-auto  ">
        {showImages && (
          <div className="fullscreen fullsize bg-[#000000da] absolute z-[100000] w-[100vw] overflow-hidden left-0 top-0 h-[100%]">
            <div className="thumbnails thumbnails-bottom">
              <div className="thumbnails-wrapper">
                <ImageGallery images={car.image.map((img) => img.url)} />
              </div>
              {/* Rest of your code */}
            </div>
            <button
              onClick={handleCloseAllImages}
              className="absolute right-8 text-white font-bold top-8"
            >
              <AiOutlineCloseCircle className="scale-[2]" />
            </button>
          </div>
        )}

        <div className="left w-[800px] sm:w-full text-justify flex flex-col justify-center gap-8 sm:gap-0">
          {/* // skeleton loading for carousel  */}
          {loading ? (
            <div className="carousel w-full h-[372px] xs:h-[200px] sm:h-[230px] bg-[#eae9e9] rounded-2xl">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
          ) : (
            <div className="carousel w-full h-[372px] xs:h-[200px] sm:h-[230px] bg-[#eae9e9] rounded-2xl">
              <Carousel className="h-[372px] xs:h-[200px] sm:h-[230px] rounded-2xl object-contain">
                {car.image &&
                  car.image.map((item, i) => (
                    <div
                      key={item.url}
                      className="carousel-image-container flex justify-center items-center h-full"
                    >
                      <img
                        src={item.url}
                        alt={`${i} Slide`}
                        className="CarouselImage h-[372px] xs:h-[200px] sm:h-[230px] max-w-full object-contain"
                      />
                    </div>
                  ))}
              </Carousel>
              {car.year > 2015 ? <BadgeMobile /> : ""}
              {/* // show all images button  */}
              <div className="flex justify-center sm: w-[15px] items-center gap-4">
                <button
                  className="flex justify-center items-center gap-2 text-black text-xl font-semibold absolute translate-x-[345%] sm:right-[12rem] translate-y-[-65%] bg-[#ffffffa6] sm:bg-[#00000096] rounded-lg px-4 py-2 backdrop-filter backdrop-blur-sm"
                  onClick={handleViewAllImages}
                >
                  <FaRegImages className="sm:text-white" />
                  <span className="text-base font-bold sm:hidden">
                    View All Images
                  </span>
                </button>
              </div>
            </div>
          )}

          <div className="detail w-full object-contain flex flex-col gap-4 sm:gap-2  p-8 sm:p-1 rounded-2xl sm:mt-6 sm:px-4">
            

            <div className="flex justify-between items-center">
              {loading ? (
                <Skeleton variant="text" width={200} height={30} />
              ) : (
                <>
                  <h2 className="text-3xl sm:text-base font-medium">
                    {car.make}
                    {` `}
                    {car.model}
                    {` `}
                    {car.year}
                  </h2>
                  <span className="flex w-fit gap-4 contact_seller text-2xl font-bold rounded">
                    {car.year > 2015 ? <Badge /> : ""}
                    <WishListMob carId={car._id} className="sm:flex hidden" />
                  </span>
                </>
              )}
            </div>

            {loading ? (
              <Skeleton variant="text" width={100} height={30} />
            ) : (
              <p className="text-xl sm:text-base">{car.varient}</p>
            )}

            {loading ? (
              <div className="flex justify-between rounded">
                <div className="flex min-w-fit">
                  <span className="flex gap-2 mr-2 justify-center items-center">
                    <FaGasPump />{" "}
                    <Skeleton variant="text" width={40} height={30} /> {` | `}
                  </span>
                  <span className="flex gap-2 mr-2 justify-center items-center">
                    <SlSpeedometer />{" "}
                    <Skeleton variant="text" width={40} height={30} /> {` | `}
                  </span>
                  <span className="flex gap-2 mr-2 justify-center items-center">
                    <GiGearStickPattern />
                    <Skeleton variant="text" width={40} height={30} />
                  </span>
                </div>
                <Skeleton variant="text" width={100} height={30} />
              </div>
            ) : (
              <span className="text-xl sm:my-4 justify-between sm:text-sm uppercase text-[#666] flex">
                <div className="flex min-w-fit">
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
                </div>
                <button
                  className="flex border-[1px] rounded-full px-2 py-2 bg-[#0000000a] text-[#000000] justify-evenly align-middle text-center text-base font-semibold"
                  onClick={handleCopyLink}
                >
                  <AiOutlineShareAlt className="self-center mr-1" />
                  Share
                </button>
              </span>
            )}
            <div className="hidden mb-4 sm:flex price w-full flex-col justify-start items-center gap-8 rounded-2xl p-8 mt-2">
              {loading ? (
                <>
                  <div className="w-full flex justify-center">
                    <Skeleton variant="text" width="70%" height={80} />
                  </div>
                  <div className="flex gap-4 w-full justify-center text-center">
                    <Skeleton variant="rectangular" width="40%" height={60} />
                    <Skeleton variant="rectangular" width="40%" height={60} />
                  </div>
                </>
              ) : (
                <>
                  <span className="text-3xl text-[#002f34] font-bold">
                    ₹ {NumberWithCommas(`${car.price}`)}
                  </span>
                  <span className="flex gap-4 w-full">
                    <button
                      className="make_offer bg-[#ee3131] text-white text-2xl font-bold rounded"
                      onClick={handleMakeOffer}
                    >
                      Make Offer
                    </button>
                    <button
                      className="contact_seller text-2xl font-bold rounded"
                      onClick={handleContactSeller}
                    >
                      Contact Seller
                    </button>
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="carDetail_carOverview overflow-hidden w-full h-[372px] sm:h-[530px] flex flex-col gap-4 p-8 sm:pl-0 sm:p-2 rounded-2xl">
            {loading ? (
              <>
                <div className="sm:hidden">
                  <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">
                    Overview
                  </h2>
                  <hr className="w-full" />
                  <div className="list-skeleton flex gap-8 sm:gap-6 sm:mx-4 mt-8 sm:text-sm w-[100%] flex-wrap">
                    <div className="uper1 w-[40%] h-fit flex flex-col gap-6">
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                    </div>

                    <div className="uper2 w-[40%] h-fit flex flex-col gap-6">
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                      <div className="flex gap-4 w-full h-fit">
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col">
                  <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">
                    Overview
                  </h2>
                  <hr className="w-full" />
                  <div className="list-skeleton flex gap-8 sm:gap-6 sm:mx-4 mt-4 sm:text-sm w-[100%] flex-wrap">
                    <div className="flex gap-4 w-full h-fit">
                      <Skeleton variant="rectangular" width={200} height={30} />
                      <Skeleton variant="rectangular" width={150} height={30} />
                    </div>
                    <div className="flex gap-4 w-full h-fit">
                      <Skeleton variant="rectangular" width={200} height={30} />
                      <Skeleton variant="rectangular" width={150} height={30} />
                    </div>
                    <div className="flex gap-4 w-full h-fit">
                      <Skeleton variant="rectangular" width={200} height={30} />
                      <Skeleton variant="rectangular" width={150} height={30} />
                    </div>
                    <div className="flex gap-4 w-full h-fit">
                      <Skeleton variant="rectangular" width={200} height={30} />
                      <Skeleton variant="rectangular" width={150} height={30} />
                    </div>
                    <div className="flex gap-4 w-full h-fit">
                      <Skeleton variant="rectangular" width={200} height={30} />
                      <Skeleton variant="rectangular" width={150} height={30} />
                    </div>
                    <div className="flex gap-4 w-full h-fit">
                      <Skeleton variant="rectangular" width={200} height={30} />
                      <Skeleton variant="rectangular" width={150} height={30} />
                    </div>
                    <div className="flex gap-4 w-full h-fit">
                      <Skeleton variant="rectangular" width={200} height={30} />
                      <Skeleton variant="rectangular" width={150} height={30} />
                    </div>
                    <div className="flex gap-4 w-full h-fit">
                      <Skeleton variant="rectangular" width={200} height={30} />
                      <Skeleton variant="rectangular" width={150} height={30} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Overview</h2>
                <hr className="w-full" />
                <ul className="flex gap-8 sm:gap-6 sm:ml-4 sm:text-[0.9rem] w-[100%] flex-wrap sm:pr-12">
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-fit font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <IoCarSportOutline />
                      </span>
                      Model{" "}
                    </span>
                    <span className="w-fit text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.model}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-fit font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <TfiBriefcase />
                      </span>
                      Brand{" "}
                    </span>
                    <span className="w-fit text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.make}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <BsCalendar2Check />
                      </span>
                      Year{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.year}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <SlSpeedometer />
                      </span>
                      Km Driven{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.Km_Driven}km
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <BsBuilding />
                      </span>
                      RTO{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.RTO}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <GiGearStickPattern />
                      </span>
                      Transmission{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.transmission}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center text-[#999]">
                        <FaGasPump />
                      </span>
                      Fuel{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.fuel}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center text-[#999]">
                        <IoPersonCircleOutline className="scale-[1.2]" />
                      </span>
                      Ownership{" "}
                    </span>
                    <span className="w-[35%] sm:w-[30%] text-right font-semibold label-content">
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
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <VscSymbolColor />
                      </span>
                      Color{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.color}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-between">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <BiCategory />
                      </span>
                      Category{" "}
                    </span>

                    <span className="w-[30%] text-right text-base sm:text-[0.9rem]  lable-content">
                      {car.category}
                    </span>
                  </li>
                </ul>
              </>
            )}
          </div>

          <div className="carDescription w-full h-fit sm:h-fit flex flex-col gap-4 p-8 sm:px-2 rounded-2xl">
            <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Description</h2>
            <hr />
            {loading ? (
              <div className="flex flex-col w-full p-4 gap-1">
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="50%" height={20} />
              </div>
            ) : (
              <p className="sm:px-4">{car.description}</p>
            )}
          </div>

          {
            car.year > 2015 ? (
              <div className="carwarranty w-full h-fit sm:h-fit flex flex-col gap-4 p-8 sm:px-2 rounded-2xl">
            <button
              className="filter-bt1 whitespace-nowrap flex justify-between p-8 scale-[1.1] font-semibold text-2xl h-3  "
              type="button"
              data-te-collapse-init
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-target="#collapseExample1"
              aria-expanded="true"
              aria-controls="collapseExample1"
              data-te-collapse-ignore
            >
              warranty
              <HiPlus className="" />
            </button>
            <div
              className="visible mt-2 scale-[1.1] relative top-[-15px] -z-10"
              id="collapseExample1"
              data-te-collapse-item
            >
              <div className="container- items-center bg-[url('/Images/user-action-bg.jpg')] bg-cover flex rounded-lg h-fit p-6 text-sm justify-evenly align-middle font-medium shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <img
                  src="/Images/wax-seal.png"
                  alt="warranty logo"
                  className="w-[60px] h-[60px] place-self-center sm:mr-2"
                />
                <span className=" justify-center text-base sm:p-3 text-black font-semibold w-[70%]">
                  {" "}
                  Get CarsBecho Exclusive 2 Years warranty with your Dream Car
                  Now!{" "}
                </span>
              </div>
            </div>
          </div>
            ) : ""
          }
        </div>

        <div className="right sm:h-[400px] sm:w-full sm:p-1 h-[90vh] w-[480px] p-8 flex gap-4 flex-col">
          {loading ? (
            <div className="flex sm:hidden price rounded-xl flex-col w-full p-6 text-center justify-center gap-4">
              <div className="w-full flex justify-center">
                <Skeleton variant="text" width="70%" height={80} />
              </div>
              <div className="flex gap-4 w-full justify-center text-center">
                <Skeleton variant="rectangular" width="40%" height={80} />
                <Skeleton variant="rectangular" width="40%" height={80} />
              </div>
            </div>
          ) : (
            <div className="price sm:hidden w-full flex flex-col justify-start items-center gap-8 rounded-2xl p-8">
              <span className="text-[45px] text-[#002f34] font-bold">
                ₹ {NumberWithCommas(`${car.price}`)}
              </span>

              <span className="flex gap-4 w-full">
                <button
                  className="make_offer bg-[#ee3131] text-white text-2xl font-bold rounded"
                  onClick={handleMakeOffer}
                >
                  Make Offer
                </button>
                <button
                  className="contact_seller text-2xl font-bold rounded"
                  onClick={handleContactSeller}
                >
                  Contact Seller
                </button>
              </span>

              {/* Confirmation Modal */}
              <Modal
                isOpen={showConfirmation}
                onRequestClose={() => setShowConfirmation(false)}
                className="modal absolute text-[#242424] top-0 bg-[#ffffff] w-full h-[100vh] overflow-hidden p-8 justify-start flex flex-col rounded-lg shadow-inner"
                overlayClassName="modal-overlay overflow-hidden z-[1200] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                contentLabel="Confirmation Modal"
              >
                <div className="absolute top-0 left-0 mt-4 ml-4">
                  <button
                    className="bg-white rounded-full p-2"
                    onClick={() => setShowConfirmation(false)}
                  >
                    <span className="material-icons align-middle text-xl">
                      <IoIosArrowBack />
                    </span>
                  </button>
                </div>

                <div className="flex flex-col items-center w-[400px] sm:w-[370px] xs:w-[300px] mx-auto justify-start gap-10">
                  <img
                    src="/Images/calling.jpg"
                    alt="call image"
                    className="w-[250px]"
                  />
                  <h2 className="text-2xl font-bold w-full py-2 px-4 text-center border-b-[2px] border-[#dcdcdc] ">
                    Confirmation
                  </h2>
                  <p className="text-center">
                    <span className="font-semibold text-sm">"Please Mention CarsBecho for authenticity & better response with the seller
"<br /><br /></span>
                    You will be contacted by CarsBecho Team and the seller of{" "}
                    <strong>
                      {car.make} {car.model}
                    </strong>{" "}
                    will contact you within 4-5 business hours.
                  </p>
                  {/* copiable seller number  */}
                  {car.showMobile && (
                    <div className="flex justify-center items-center gap-4">
                      <span className="text-center">
                      </span>
                      <span className="text-center">
                        {/* // direct call seller using a tel  */}
                        <a
                          href={`tel:${seller && seller.mobile}`}
                          className="flex justify-center items-center gap-2 text-[#000000] text-lg font-bold py-2 px-4 rounded bg-[#efefef]"
                        >
                          <img src="/Images/call.png" alt="click to call seller" className="w-[40px]" />
                          Talk Directly
                        </a>

                        {/* <strong>{seller && seller.mobile}</strong> */}
                      </span>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      className="cancel-btn bg-gray-500 text-white text-lg font-bold py-2 px-4 rounded"
                      onClick={() => setShowConfirmation(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="continue-btn bg-[#2fa520] text-white text-lg font-bold py-2 px-4 rounded"
                      onClick={handleConfirmation}
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              </Modal>
              <Modal
                isOpen={showMakeOfferModal}
                onRequestClose={() => setShowMakeOfferModal(false)}
                className="modal absolute text-[#242424] top-0 bg-[#ffffff] w-full h-[100vh] overflow-hidden p-8 justify-start flex flex-col rounded-lg shadow-inner"
                overlayClassName="modal-overlay overflow-hidden z-[1200] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                contentLabel="Make Offer Modal"
              >
                <div className="absolute top-0 left-0 mt-4 ml-4">
                  <button
                    className="bg-white rounded-full p-2"
                    onClick={() => setShowMakeOfferModal(false)}
                  >
                    <span className="material-icons align-middle text-xl">
                      <IoIosArrowBack />
                    </span>
                  </button>
                </div>
                <div className="flex flex-col items-center w-[400px] sm:w-[370px] xs:w-[300px] mx-auto justify-start gap-10">
                  <img
                    src="/Images/contactSuccess.jpeg"
                    alt="call image"
                    className="w-[300px]"
                  />
                  <h2 className="text-2xl font-bold w-full py-2 px-4 text-center border-b-[2px] border-[#dcdcdc] ">
                    Make an Offer
                  </h2>

                  <p className="text-center">
                    Make a Reasonable Offer for{" "}
                    <strong>
                      {car.make} {car.model} <br />
                    </strong>{" "}
                    Current Price is{" "}
                    <strong>₹ {NumberWithCommas(`${car.price}`)}</strong>. The
                    seller will contact you within 4-5 business hours.
                  </p>
                  <input
                    type="number"
                    value={offerPrice}
                    pattern="[0-9]"
                    inputMode="numeric"
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="Enter your offer price, no commas"
                    className="w-full border border-gray-300 text-black rounded-md px-4 py-4"
                  />
                  <div className="flex space-x-4">
                    <button
                      className="cancel-btn bg-gray-500 text-white text-lg font-bold py-2 px-4 rounded"
                      onClick={() => setShowMakeOfferModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="continue-btn bg-[#2fa520] text-white text-lg font-bold py-2 px-4 rounded"
                      onClick={handleMakeOfferConfirmation}
                    >
                      Make Offer
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          )}

          {loading ? (
            <div className=""></div>
          ) : (
            <WishList carId={car._id} className="flex" />
          )}

          {loading ? (
            <div className="seller_Detai border-[#bebebeb4] cursor-pointer border-[1px] w-full h-[360px] sm:pb-[60px] flex flex-col gap-2 rounded-2xl">
              <div className="top-div w-full overflow-hidden h-[139px]">
                <Skeleton variant="rectangular" width="100%" height={139} />
              </div>

              <div className="bottom-div relative top-[-73px] p-8 w-full h-[50%] flex flex-col gap-4">
                {/* seller image  */}
                <div className="seller-img scale-[1.2] w-full h-[50%] flex justify-center items-center">
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="seller-name mt-8 w-full justify-center px-6 h-fit flex flex-col gap-2">
                  {/* seller name  */}
                  <Skeleton variant="text" width="100%" height={40} />
                  {/* seller email  */}
                  <Skeleton variant="text" width="100%" height={40} />
                  {/* Created At  */}
                  <Skeleton variant="text" width="100%" height={40} />
                </div>
              </div>
            </div>
          ) : (
            seller && (
              <Link
                to={`/sellerCar/${seller && seller._id}`}
                className="sm:px-6"
              >
                <div className="seller_Detai border-[1px] shadow-lg shadow-[#7f7f7f3e] w-full h-[360px] sm:pb-[60px] flex flex-col gap-2 rounded-2xl">
                  <div className="top-div w-full overflow-hidden h-[139px]">
                    <span className="seller-title text-sm m-2 py-1 px-4 rounded-2xl bg-[#ffffff60] font-semibold absolute text-white z-10">
                      SELLER DETAILS
                    </span>
                    <img src={car.image && car.image[0].url} alt={car.name} />
                    <div className="overlay bg-black opacity-40"></div>
                  </div>

                  <div className="bottom-div relative top-[-73px] p-8 w-full h-[50%] flex flex-col gap-4">
                    {/* seller image  */}
                    <div className="seller-img scale-[1.2] w-full h-[50%] flex justify-center items-center">
                      {seller && seller.avatar.length > 0 && (
                        <img
                          src={seller.avatar[0].url}
                          alt={seller.name}
                          className="w-[100px] avatar-image h-[100px] rounded-full border-white border-[5px]"
                         
                        />
                      )}
                    </div>
                    <div className="seller-name w-full h-[50%] flex flex-col gap-0">
                      {/* seller name  */}
                      <h3 className="text-2xl items-center whitespace-nowrap flex gap-2 font-bold place-self-center capitalize pt-6 pb-1">
                        {seller && seller.name}{" "}
                        {seller.role === "dealer" ||
                        seller.role === "broker" ||
                        seller.role === "superUser" ? (
                          <img
                            src="/Images/blue_tick.png"
                            alt={`Verified ${seller.role}`}
                            className="w-6 h-6"
                          />
                        ) : (
                          ""
                        )}
                      </h3>

                      {/* seller email  */}
                      <span className="text-base flex items-center text-[#ee3131] justify-center xs:text-[0.9rem] py-2 px-6 rounded-2xl bg-[#ffffff7c] font-medium">
                        <ImLocation /> {seller.city ? seller.city : car.city}
                      </span>

                      {seller.role === "dealer" ||
                      seller.role === "superUser" ? (
                        <h1 className=" font-semibold flex items-center justify-center text-[#28254d] text-sm">
                          {seller.dealershipName}
                        </h1>
                      ) : (
                        ""
                      )}

                      {seller.role === "dealer" ||
                      seller.role === "superUser" ? (
                        <h1 className=" font-semibold text-center py-2 text-[#000000] text-lg">
                          {seller.tagline}
                        </h1>
                      ) : (
                        ""
                      )}
                      <small className="text-sm pt-2 px-6 rounded-2xl bg-[#ffffff8c] font-normal text-center">
                        Posted on :{" "}
                        {new Date(car.createdAt)
                          .toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          .replace(/(\d+)(?:st|nd|rd|th)/, "$1$2") ||
                          "DD/MM/YYYY"}
                      </small>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </main>
      {cars ? (
        <main className="w-[100vw] h-fit bg-white py-4 mt-4">
          <section className="related_Section w-[1300px] sm:w-[100vw] sm:overflow-hidden mx-auto object-contain flex flex-col gap-4 py-4 rounded-2xl my-0">
            <ScrollToTopOnMount />
            <div className="car-container flex-col flex sm:hidden w-[1220px] sm:w-[90vw] m-auto overflow-x-auto gap-4 mt-4">
              <div className="">
                <h2 className="text-xl font-bold py-4 capitalize sm:text-2xl">
                  Still Can’t Decide? You May Also Like These!
                </h2>
                <hr />
              </div>
              <div className="flex overflow-x-auto mt-4 gap-4">
                {cars.map((relatedCar) => {
                  return (
                    <Link to={`/car/${relatedCar._id}`} key={relatedCar._id} onClick={scrollup}>
                      <div
                        key={relatedCar._id}
                        className="carCard flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[294px] sm:w-[164px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"
                      >
                        <div className="img-container-car sm:overflow-hidden">
                          <img
                            src={relatedCar.image[0].url}
                            alt={relatedCar.model}
                            className="w-[300px] h-[150px] sm:w-[282px] sm:h-[90px] object-cover sm:scale-[1.1] "
                          />
                        </div>

                        <div className="carDetails-home flex flex-col gap-[10px] sm:gap-1 sm:pt-[2px]">
                          <span className="flex gap-1 overflow-ellipsis sm:text-sm sm:font-normal text-lg font-semibold">
                            <h2 className=" overflow-ellipsis whitespace-nowrap">{relatedCar.make}</h2>
                            <h2 className=" overflow-ellipsis whitespace-nowrap">{relatedCar.model}</h2>
                            <h4 className="font-normal sm:hidden">{`(${relatedCar.year})`}</h4>
                          </span>
                          <span className="text-xs mb-2 sm:hidden sm:my-2 sm:text-sm uppercase text-[#3d3d3d] flex">
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <FaGasPump /> {relatedCar.fuel} {` | `}
                            </span>
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <SlSpeedometer /> {relatedCar.Km_Driven}km{` | `}
                            </span>
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <GiGearStickPattern />
                              {relatedCar.transmission}
                            </span>
                          </span>

                          <div className="carPrice">
                            <h3 className="text-2xl sm:text-base font-bold font-sans">
                              ₹ {NumberWithCommas(`${relatedCar.price}`)}
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
                })}
              </div>
            </div>

            <div className="car-container flex-col sm:flex hidden w-[1220px] sm:w-[90vw] m-auto overflow-x-auto gap-4">
              <div className="">
                <div className="w-[65px] h-[5px] bg-[#ee3131] mx-auto my-4"></div>
                <h2 className="text-xl w-full font-bold justify-center flex pl-4">
                  Still Can’t Decide
                </h2>
                <h4 className="text-base flex justify-center py-4 text-[#999]">
                  You may also like these similar options
                </h4>
                <hr />
              </div>
              <div className="flex overflow-x-auto mt-8 gap-4">
                {cars.map((relatedCar) => {
                  return (
                    <Link to={`/car/${relatedCar._id}`} key={relatedCar._id} onClick={scrollup}>
                      <div
                        key={relatedCar._id}
                        className="carCard flex flex-col gap-[4px] mb-0 sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[294px] sm:w-[164px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden"
                      >
                        <div className="img-container-car sm:overflow-hidden">
                          <img
                            src={relatedCar.image[0].url}
                            alt={relatedCar.model}
                            className="w-[300px] h-[150px] sm:w-[282px] sm:h-[90px] object-cover sm:scale-[1.1] "
                          />
                        </div>

                        <div className="carDetails-home flex flex-col gap-[10px] sm:gap-1 sm:pt-[2px]">
                          <span className="flex gap-1 overflow-ellipsis sm:text-sm sm:font-normal text-lg font-semibold">
                            <h2 className=" overflow-ellipsis whitespace-nowrap">{relatedCar.make}</h2>
                            <h2 className=" overflow-ellipsis whitespace-nowrap">{relatedCar.model}</h2>
                            <h4 className="font-normal sm:hidden">{`(${relatedCar.year})`}</h4>
                          </span>
                          <span className="text-xs mb-2 sm:hidden sm:my-2 sm:text-sm uppercase text-[#3d3d3d] flex">
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <FaGasPump /> {relatedCar.fuel} {` | `}
                            </span>
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <SlSpeedometer /> {relatedCar.Km_Driven}km{` | `}
                            </span>
                            <span className="flex gap-2 mr-2 justify-center items-center">
                              <GiGearStickPattern />
                              {relatedCar.transmission}
                            </span>
                          </span>

                          <div className="relatedCarPrice">
                            <h3 className="text-2xl sm:text-base font-bold font-sans">
                              ₹ {NumberWithCommas(`${relatedCar.price}`)}
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
                })}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <>
          <main className="w-[100vw] h-fit bg-white py-4 mt-4">
            <section className="related_Section w-[1300px] sm:w-[100vw] overflow-auto mx-auto object-contain flex gap-4 py-4 rounded-2xl my-0">
              {[...Array(9)].map((_, index) => (
                <>
                  <div className="carCard sm:hidden flex-col flex w-[300px] h-fit gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md sm:w-[154px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden">
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

                  {/* for mobile  */}
                  <div className="hidden sm:flex flex-col carCard gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[294px] sm:w-[164px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      height={90}
                    />
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
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default CarDetail;

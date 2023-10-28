import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getAllCarsBySeller } from "../../actions/carAction";
import { getUserDetails } from "../../actions/userAction";
import MetaData from "../Layout/MetaData";
import NumberWithCommas from "../PriceSeperator";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { Link, NavLink } from "react-router-dom";
import { GiGearStickPattern } from "react-icons/gi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import "../../styles/carCard.scss";
import "../../styles/SellerPage.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineCar, AiOutlineHeart } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";

import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userAction";

const SellerPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { cars, loading, error, carCount } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;
  const maxDisplayedPages = 4;

  // Pagination
  const indexOfLastUser = currentPage * carsPerPage;
  const indexOfFirstUser = indexOfLastUser - carsPerPage;
  const currentUsers = cars.slice(indexOfFirstUser, indexOfLastUser);

  const [verifiedCars, setVerifiedCars] = useState([]);
  const [nonVerifiedCars, setNonVerifiedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filter, setFilter] = useState("all");

  const carCounts = cars.reduce(
    (counts, car) => {
      if (car.verified) {
        counts.verified++;
      } else {
        counts.notVerified++;
      }
      return counts;
    },
    { verified: 0, notVerified: 0 }
  );

  function logoutUser() {
    dispatch(logout());
    history.push("/");
    alert.success("Logout Successfully");
  }

  // Calculate total pages
  const totalPages = Math.ceil(cars.length / carsPerPage);

  // Determine the range of page numbers to display
  const getPageRange = () => {
    let startPage;
    let endPage;

    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleFilterClick = (filter) => {
    setFilter(filter);
    if (filter === "all") {
      setFilteredCars([...verifiedCars, ...nonVerifiedCars]);
    } else if (filter === "verified") {
      setFilteredCars(verifiedCars);
    } else if (filter === "notVerified") {
      setFilteredCars(nonVerifiedCars);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Update the filteredCars array based on the current filter
    if (filter === "all") {
      setFilteredCars([...verifiedCars, ...nonVerifiedCars]);
    } else if (filter === "verified") {
      setFilteredCars(verifiedCars);
    } else if (filter === "notVerified") {
      setFilteredCars(nonVerifiedCars);
    }
  };

  useEffect(() => {
    if (user && user._id != undefined) {
      dispatch(getAllCarsBySeller(user._id));
      dispatch(getUserDetails(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (cars) {
      setVerifiedCars(cars.filter((car) => car.verified));
      setNonVerifiedCars(cars.filter((car) => !car.verified));
      setFilteredCars(cars);
    }
  }, [cars]);

  return (
    <>
      <MetaData title={"Seller Page"} />
      <main className='p-2 flex md:flex-col w-full h-fit gap-8 md:gap-0 bg-[url("/Images/user-action-bg.jpg")] bg-fixed bg-cover overflow-hidden'>
        {user && user.expireLimit < 8 ? (
          <div className="alert_expiration absolute sm:relative z-10 w-full mb-8 sm:mb-0">
            <h1 className="rounded bg-yellow-300 h-fit w-[80%] mx-auto py-2 px-4 flex sm:flex-col sm:flex-wrap text-center justify-center gap-2 align-middle">
              <span className="text-[#ff0000] text-center font-semibold">
                Alert!
              </span>{" "}
              Your Subscription will expire in {user.expireLimit} Days.{" "}
              {user.role === "dealer" ? (
                <Link
                  to="/dealer/subscription"
                  className="text-blue-700 underline"
                >
                  click Here
                </Link>
              ) : (
                <Link
                  to="/broker/subscription"
                  className="text-blue-700 underline"
                >
                  click Here
                </Link>
              )}{" "}
              To Renew your subscription.
            </h1>
          </div>
        ) : (
          <div className=""></div>
        )}
        <section className="seller_details h-fit w-[400px] md:w-full mt-4 sm:mt-0 p-8 md:p-1 rounded-xl bg-[#b7b7b747] shadow-lg sticky top-[50px] md:top-0 mb-8 md:mb-0">
          {user && user.avatar && (
            <div className="profileContainer__left bg-[#ffffff95] sm:h-fit sm:w-full rounded-xl flex flex-col p-1 justify-center gap-6 sm:gap-0 items-center">
              <div className="profile_info w-full p-2 bg-[#ffffff76] rounded-lg flex gap-1 h-[150px]">
                <div className="profile_info__left md:w-[40%] w-[30%] h-full flex flex-col justify-center items-center">
                  <div className="profileContainer__left__imgContainer w-[80px] mr-2 h-[80px] md:w-[100px] md:h-[100px] border-[0.5px] border-[#ee3131] rounded-[100%] overflow-hidden">
                    <img
                      src={user.avatar[0].url}
                      alt={user.name}
                      className="rounded-[100%] w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = "./Images/man.webp"; // fallback image
                        e.target.alt = "Default Avatar"; // fallback alt text
                      }}
                    />
                  </div>
                </div>

                <div className="profile_info__right sm:w-[70%] w-[80%] py-10 h-full flex flex-col gap-1">
                  <h1 className="font-semibold flex items-center gap-2">
                    {user.name}{" "}
                    {user.role === "dealer" ||
                    user.role === "broker" ||
                    user.role === "superUser" ? (
                      <img
                        src="/Images/blue_tick.png"
                        alt={`Verified ${user.role}`}
                        className="w-4"
                      />
                    ) : (
                      ""
                    )}{" "}
                  </h1>
                  {user.role === "dealer" ? (
                    <h1 className=" font-medium">{user.dealershipName}</h1>
                  ) : (
                    ""
                  )}
                  <p className="text-sm font-normal">
                    Joined On :{" "}
                    {new Date(user.createdAt)
                      .toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/(\d+)(?:st|nd|rd|th)/, "$1$2")}
                  </p>
                  <h1 className="text-sm font-normal overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {user.email}
                  </h1>
                </div>
              </div>
              <div className="w-full hidden md:flex h-[50px] relative justify-evenly align-middle rounded bg-slate-50">
                <div className="flex gap-2 self-center">
                  <h1 className="text-sm text-gray-600 font-medium">
                    Credit :{" "}
                  </h1>
                  {user &&
                  (user.role === "admin" || user.role === "superUser") ? (
                    <h1 className="text-sm text-gray-900 font-medium scale-[2]">
                      ∞
                    </h1>
                  ) : (
                    <h1 className="text-sm text-gray-900 font-medium">
                      {user && user.credit}
                    </h1>
                  )}
                </div>
                <div className="flex gap-2 self-center">
                  <h1 className="text-sm text-gray-600 font-medium">
                    Expire Time :{" "}
                  </h1>
                  {user &&
                  (user.role === "admin" || user.role === "superUser") ? (
                    <h1 className="text-sm text-gray-900 font-medium scale-[2]">
                      ∞
                    </h1>
                  ) : (
                    <h1 className="text-sm text-gray-900 font-medium">
                      {user && user.expireLimit} Days
                    </h1>
                  )}
                </div>
                <div className="flex gap-2 self-center">
                  <h1 className="text-sm text-gray-600 font-medium">
                    Total Cars :{" "}
                  </h1>
                  <h1 className="text-sm text-gray-900 font-medium">
                    {cars.length}
                  </h1>
                </div>
              </div>

              <div className="profileContainer__right md:hidden bg-[#fff] rounded-xl text-center w-full md:w-[80%] sm:w-full sm:h-[598px] sm:bg-[#ffffff8f] flex flex-col gap-5 p-6 pl-12">
                <div className="flex flex-col">
                  {user.role === "admin" || user.role === "superUser" ? (
                    <NavLink
                      activeClassName="bg-[#0099ff10] rounded-lg text-[#09f]"
                      to={"/admin/dashboard"}
                    >
                      <div className="quicklink flex items-center justify-between px-2 py-4">
                        <div className="right flex h-full items-center gap-4">
                          <MdDashboard className="scale-[1.6]" />
                          <h2 className="font-medium">Admin Dashboard</h2>
                        </div>
                        <div className="left">
                          <FiChevronRight className=" scale-125" />
                        </div>
                      </div>
                    </NavLink>
                  ) : (
                    ""
                  )}

                  <NavLink
                    activeClassName="bg-[#0099ff10] rounded-lg text-[#09f]"
                    to={"/account"}
                  >
                    <div className="quicklink flex items-center justify-between px-2 py-4">
                      <div className="right flex h-full items-center gap-4">
                        <RiAccountCircleLine className="scale-[1.3]" />
                        <h2 className="font-medium">My Profile</h2>
                      </div>
                      <div className="left">
                        <FiChevronRight className=" scale-125" />
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    activeClassName="bg-[#0099ff10] rounded-lg text-[#09f]"
                    to={"/wishlist/me"}
                  >
                    <div className="quicklink flex items-center justify-between px-2 py-4">
                      <div className="right flex h-full items-center gap-4">
                        <AiOutlineHeart className="scale-[1.3]" />
                        <h2 className="font-medium">Shortlisted Cars</h2>
                      </div>
                      <div className="left">
                        <FiChevronRight className=" scale-125" />
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    activeClassName="bg-[#0099ff10] rounded-lg text-[#09f]"
                    to={`/orders/${user._id}`}
                  >
                    <div className="quicklink flex items-center justify-between px-2 py-4">
                      <div className="right flex h-full items-center gap-4">
                        <BsBoxSeam className="scale-[1.3]" />
                        <h2 className="font-medium">My Orders</h2>
                      </div>
                      <div className="left">
                        <FiChevronRight className=" scale-125" />
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    activeClassName="bg-[#0099ff10] rounded-lg text-[#09f]"
                    to={`/seller`}
                  >
                    <div className="quicklink flex items-center justify-between px-2 py-4">
                      <div className="right flex h-full items-center gap-4">
                        <AiOutlineCar className="scale-[1.6]" />
                        <h2 className="font-medium">My Cars</h2>
                      </div>
                      <div className="left">
                        <FiChevronRight className=" scale-125" />
                      </div>
                    </div>
                  </NavLink>

                  <NavLink to={"/password/update"}>
                    <div className="quicklink flex items-center justify-between px-2 py-4">
                      <div className="right flex h-full items-center gap-4">
                        <RiLockPasswordLine className="scale-[1.3]" />
                        <h2 className="font-medium">Change Password</h2>
                      </div>
                      <div className="left">
                        <FiChevronRight className=" scale-125" />
                      </div>
                    </div>
                  </NavLink>

                  {/* logout button  */}
                  <div className="logout">
                    <button
                      onClick={logoutUser}
                      className="rounded-md text-[#ee3131] border-[1px] w-full font-medium mt-8 border-[#ee313146] h-[50px]"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="seller_cars w-[70%] md:w-full mx-auto mt-5 sm:mt-0">
          <div className="main md:hidden w-full bg-[url('/Images/bg-car-side.jpg')] items-center bg-cover mx-auto m-8 mb-0 sm:m-1 h-[130px] sm:h-[150px] rounded-2xl ">
            <h2 className=" font-semibold text-xl scale-[1.5] sm:text-[#2a2a2a] font-sans relative top-2 pt-8 justify-center flex">
              Your Cars
            </h2>
          </div>

          {/* seller credit details  */}
          <div className="w-full md:hidden h-[50px] flex mb-0 relative top-[-10px] justify-evenly align-middle rounded bg-slate-50">
            <div className="flex gap-2 self-center">
              <h1 className="text-lg text-gray-600 font-medium">Credit : </h1>
              {user && (user.role === "admin" || user.role === "superUser") ? (
                <h1 className="text-lg text-gray-900 font-medium scale-[2]">
                  ∞
                </h1>
              ) : (
                <h1 className="text-lg text-gray-900 font-medium">
                  {user && user.credit}
                </h1>
              )}
            </div>
            <div className="flex gap-2 self-center">
              <h1 className="text-lg text-gray-600 font-medium">
                Expire Time :{" "}
              </h1>
              {user && (user.role === "admin" || user.role === "superUser") ? (
                <h1 className="text-lg text-gray-900 font-medium scale-[2]">
                  ∞
                </h1>
              ) : (
                <h1 className="text-lg text-gray-900 font-medium">
                  {user && user.expireLimit} Days
                </h1>
              )}
            </div>
            <div className="flex gap-2 self-center">
              <h1 className="text-lg text-gray-600 font-medium">
                Total Cars :{" "}
              </h1>
              <h1 className="text-lg text-gray-900 font-medium">
                {cars.length}
              </h1>
            </div>
          </div>

          {/* car filters  */}
          <div className="filters w-full h-[65px] rounded-lg mb-8 md:mb-0 flex gap-2 justify-center items-center p-4">
            <button
              onClick={() => handleFilterClick("all")}
              className={`md:flex-1 w-[200px] h-full p-2 rounded-full  text-black border-[1px] border-[#0000009f] font-medium items-center ${
                filter === "all" ? "bg-[#252525] text-white" : "bg-slate-50"
              }`}
            >
              All ({cars.length})
            </button>
            <button
              onClick={() => handleFilterClick("verified")}
              className={`md:flex-1 w-[200px] h-full p-2 rounded-full  text-black  border-[1px] border-[#0000009f] font-medium items-center ${
                filter === "verified" ? "bg-[#252525] text-white" : "bg-slate-50"
              }`}
            >
              Live ({carCounts.verified})
            </button>
            <button
              onClick={() => handleFilterClick("notVerified")}
              className={`md:flex-1 md:min-w-fit w-[200px] h-full p-2 rounded-full  text-black border-[1px] border-[#0000009f] font-medium items-center ${
                filter === "notVerified" ? "bg-[#252525] text-white" : "bg-slate-50"
              }`}
            >
              Not verified ({carCounts.notVerified})
            </button>
          </div>

          <div className=" grid-cols-1 flex flex-wrap md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center sm:gap-1 sm:mx-1">
            {filteredCars
              .slice(indexOfFirstUser, indexOfLastUser)
              .map((car) => (
                <>
                  <Link
                    to={`/seller/car/${car._id}`}
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
                        <span className="flex gap-1 sm:text-sm text-lg font-semibold">
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
                    to={`/seller/car/${car._id}`}
                    key={`mobile_car_${car._id}`}
                  >
                    <div className="mobile-carCard hidden sm:flex w-[96vw] h-fit p-1 rounded-xl gap-4 cursor pointer">
                      <div className="image-container w-[35%] h-[100px] p-1">
                        <img
                          src={car.image[0].url}
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
                </>
              ))}
          </div>
          {cars && cars.length > carsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <BsChevronLeft />
              </button>
              {getPageRange().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="mx-2">
                    {page}
                  </span>
                ) : (
                  <button
                    key={index}
                    className={`mx-2 ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    } rounded-md p-2`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <BsChevronRight />
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default SellerPage;

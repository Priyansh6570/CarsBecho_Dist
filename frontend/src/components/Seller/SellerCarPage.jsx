import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { getAllCarsBySeller } from "../../actions/carAction";
import MetaData from "../Layout/MetaData";
import Car from "../Cars/Car";
import "../../styles/SellerPage.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { getUserDetails } from "../../actions/userAction";
import Loader from "../Layout/Loader/Loader";
import { AiOutlineShareAlt } from "react-icons/ai";

import { AiOutlineCar, AiOutlineHeart } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { ImLocation } from "react-icons/im";

const SellerCarPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State variable for sidebar visibility

  const history = useHistory();
  const alert = useAlert();

  const logoutUser = () => {
    logout();
    history.push("/");
    alert.success("Logout Successfully");
  };

  const { cars, loading } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.userDetails);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;
  const maxDisplayedPages = 4;

  // Pagination
  const indexOfLastUser = currentPage * carsPerPage;
  const indexOfFirstUser = indexOfLastUser - carsPerPage;
  const currentUsers = cars.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert.success("Link copied to clipboard!");
  };

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

  useEffect(() => {
    dispatch(getAllCarsBySeller(id));
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={"Seller Page"} />
      <main className='p-2 flex sm:flex-col w-full h-fit gap-8 md:gap-0 bg-[url("/Images/user-action-bg.jpg")] bg-fixed bg-cover overflow-hidden'>
        <section className="seller_details sm:pt-8 h-fit w-[400px] md:w-full mt-4 sm:m-0 p-8 md:p-1 rounded-xl bg-[#fffffff7] shadow-lg sticky top-[50px] md:top-0 mb-8 md:mb-0">
          {user && (
            <div className="profileContainer__left bg-[#ffffff95] sm:h-fit sm:w-full rounded-xl flex flex-col p-1 justify-center gap-6 sm:gap-0 items-center">
              <div className="profile_info w-full p-2 bg-[#ffffff76] rounded-lg flex flex-col items-center gap-1">
                <div className="profile_info__left md:w-[40%] w-[30%] h-full flex flex-col justify-center items-center">
                  <div className="profileContainer__left__imgContainer w-[80px] mr-2 h-[80px] md:w-[100px] md:h-[100px] border-[0.5px] border-[#ee3131] rounded-[100%] overflow-hidden">
                    {user.avatar ? (
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
                    ) : (
                      <img
                        src="./Images/man.webp" // fallback image
                        alt="Default Avatar" // fallback alt text
                        className="rounded-[100%] w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="profile_info__right w-[80%] text-center items-center pb-10 pt-2 h-full flex flex-col gap-1">
                  <h1 className="font-semibold text-lg flex items-center gap-2">
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
                  {user.role === "dealer" || user.role === "superUser" ? (
                    <h1 className=" font-normal text-[#28254d] text-sm">
                      {user.dealershipName}
                    </h1>
                  ) : (
                    ""
                  )}
                  <p className=" text-[10px] pb-4 text-[#0000007d] font-normal">
                    Joined On :{" "}
                    {new Date(user.createdAt)
                      .toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/(\d+)(?:st|nd|rd|th)/, "$1$2")}
                  </p>
                  {user.role === "dealer" || user.role === "superUser" ? (
                    <h1 className=" font-medium text-[#000000] text-lg">
                      {user.tagline}
                    </h1>
                  ) : (
                    ""
                  )}
                  <h1 className="text-sm font-normal flex items-center text-[#ee3131] overflow-hidden whitespace-nowrap overflow-ellipsis">
                    <ImLocation /> {user.city}
                  </h1>
                  <button
                    className="flex border-[1px] mt-2 rounded-full px-2 py-2 bg-[#0000000a] text-[#000000] justify-evenly align-middle text-center text-base font-semibold"
                    onClick={handleCopyLink}
                  >
                    <AiOutlineShareAlt className="self-center mr-1" />
                    Share
                  </button>
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

        <section className="seller_cars w-[70%] sm:w-full mx-auto mt-4 sm:mt-4">
          <div className="main w-full md:hidden bg-[url('/Images/bg-car-side.jpg')] bg-cover mx-auto m-8 h-[100px] rounded-2xl ">
            <div className="w-full md:hidden h-full sm:bg-[#00000040] rounded-2xl">
              <h2 className="text-[30px] z-10 sm:text-[#fff] font-sans font-medium pt-8 justify-center flex">
                Cars
              </h2>
            </div>
          </div>
          <div className=" grid-cols-1 flex flex-wrap md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-1 sm:mx-1">
            {currentUsers.map((car) => (
              <Car key={car._id} car={car} />
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

export default SellerCarPage;

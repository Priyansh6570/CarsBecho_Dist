import React from "react";
import { BsSearch } from "react-icons/bs";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { debounce } from "../../helper.js";
import { FaUserCircle } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import { BsLinkedin } from "react-icons/bs";
import { RiDatabaseFill, RiInstagramFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { citiesData } from "../../cities.js";
import { ImLocation } from "react-icons/im";
import "../../../styles/navbarMobile.scss";
import { CgMenuBoxed } from "react-icons/cg";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BsWrenchAdjustableCircle } from "react-icons/bs";
import { BiNews } from "react-icons/bi";
import { TbTopologyStar2 } from "react-icons/tb";
import { AiOutlineFieldTime } from "react-icons/ai";
import { AiOutlineSafety } from "react-icons/ai";
import { GiCarWheel } from "react-icons/gi";
import { PiCarProfileDuotone } from "react-icons/pi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { PiShieldCheckeredDuotone } from "react-icons/pi";

const NavbarMobile = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [activeElement, setActiveElement] = useState("");

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
    >
      <div className="left flex flex-col  md:w-full h-[100vh]">
        <div className="top flex justify-between w-[100%] bg-slate-200 h-[80px]">
          <Link
            to={"/"}
            className="brandName-logo flex items-center scale-[0.8] relative left-[-15px]"
            onClick={showSidebar}
          >
            <img
              src={"/Images/brandNameNew.png"}
              alt="CarsBecho Logo"
              className="brandName w-[375px] md:w-[240px] relative top-1 sm:block"
            />
          </Link>

          {/* login-sidebar */}
          <div className="login flex justify-center items-center pr-8">
            {isAuthenticated ? (
              <Link
                to={"/account"}
                className="flex rounded-full w-16 h-16 items-center"
              >
                <img
                  src={user.avatar[0].url}
                  alt="user profile picture"
                  className="rounded-full w-[50px] h-[50px]"
                />
              </Link>
            ) : (
              <Link to={"/login"}>
                <button
                  className="text-sm scale-[1.05] text-white font-normal bg-[#ee3131] rounded-3xl px-6 py-2"
                  onClick={showSidebar}
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="middle bg-slate-50 h-[400px] w-[100%] flex flex-col">
          <ul className="nav-items-menu flex pl-4 flex-col w-[95%] text-[#222] text-lg font-normal">
            <Link to={"/cars"} className="sidebar-link"
            onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
            >
              <li className="nav-link_sideBar hover:bg-slate-100 border-b-[1px]">
                {" "}
                <div className="menu-item text-[12px] text-[#555]">
                  <p className="text-[#2e054e] text-[15px] font-semibold ">
                    Buy Used Car
                  </p>
                  Quality cars at affordable prices
                </div>
              </li>
            </Link>
            <Link to={"/newcar"} className="sidebar-link"
            onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
            >
              <li className="nav-link_sideBa p-4 hover:bg-slate-100 border-b-[1px]">
                {" "}
                <div className="menu-item flex gap-6 items-center text-[12px] text-[#555]">
                  <img
                    src="./Ico/sell-car-ico.png"
                    className="w-8 h-8 opacity-[0.5]"
                    alt=""
                  />
                  <span className="flex flex-col w-full">
                    <p className="text-[#2e054e] text-[15px] font-semibold ">
                      Sell Car
                    </p>
                    In few easy steps
                  </span>
                </div>
              </li>
            </Link>

            <div id="accordionExample">
      {/* Accordion Item #1 */}
      <div className="">
        <h2 className="mb-0" id="headingOne">
          <button
            className={`${
              activeElement === "element1" &&
              `text-primary`
            } group relative nav-link_sideBa p-4 menu-ite gap-6 text-[12px] text-[#555] hover:bg-slate-100 flex w-full items-center  border-0  px-5 py-4 text-left text-base transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
            type="button"
            onClick={() => handleClick("element1")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <TbTopologyStar2 className="text-[#9a9a9a] text-[20px] font-semibold " />
            <p className="text-[#2e054e] text-[13px] font-semibold ">
            CarsBecho Safal vyapaar
                    </p>
            <span
              className={`${
                activeElement === "element1"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529]`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div className={`${
            activeElement === "element1"
              ? `block`
              : `hidden`
          } p-4 flex flex-col gap-4 items-center text-[12px] text-[#555]`}>
          <Link to={"/in-progress"} className="sidebar-link w-[85%] relative left-[20px]"
          onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
          >
              <li className="nav-link_sideBa hover:bg-slate-100 border-b-[1px] border-[#99999950]">
                {" "}
                <div className="menu-item flex gap-6 items-center pb-4 text-[12px] text-[#555]">
                  <CgMenuBoxed className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#555] text-[12px] font-medium ">
                  Dealer management 
                  </p>
                </div>
              </li>
            </Link>
          <Link to={"/in-progress"} className="sidebar-link w-[85%] relative left-[20px]"
          onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
          >
              <li className="nav-link_sideBa hover:bg-slate-100 border-b-[1px] border-[#99999950]">
                {" "}
                <div className="menu-item flex gap-6 items-center pb-4 text-[12px] text-[#555]">
                  <BsWrenchAdjustableCircle className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#555] text-[12px] font-medium ">
                  Workshop management 
                  </p>
                </div>
              </li>
            </Link>
          <Link to={"/in-progress"} className="sidebar-link w-[85%] relative left-[20px]"
          onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
          >
              <li className="nav-link_sideBa hover:bg-slate-100 border-b-[1px] border-[#99999950]">
                {" "}
                <div className="menu-item flex gap-6 items-center pb-4 text-[12px] text-[#555]">
                  <GiCarWheel className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#555] text-[12px] font-medium ">
                  Tyre shope management
                  </p>
                </div>
              </li>
            </Link>
          <Link to={"/in-progress"} className="sidebar-link w-[85%] relative left-[20px]"
          onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
          >
              <li className="nav-link_sideBa hover:bg-slate-100 border-[#99999950]">
                {" "}
                <div className="menu-item flex gap-6 items-center pb-4 text-[12px] text-[#555]">
                  <PiCarProfileDuotone  className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#555] text-[12px] font-medium ">
                  AutoShop management
                  </p>
                </div>
              </li>
            </Link>
        </div>
      </div>

      <div className="">
        <h2 className="mb-0" id="headingOne">
          <button
            className={`${
              activeElement === "element2" &&
              `text-primary`
            } group relative nav-link_sideBa border-t-[1px] p-4 menu-ite gap-6 text-[12px] text-[#555] hover:bg-slate-100 flex w-full items-center  border-0  px-5 py-4 text-left text-base transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
            type="button"
            onClick={() => handleClick("element2")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <AiOutlineFieldTime className="text-[#9a9a9a] text-[20px] font-semibold " />
            <p className="text-[#2e054e] text-[14px] font-semibold ">
            Auto E-Auction
                    </p>
            <span
              className={`${
                activeElement === "element2"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529]`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div className={`${
            activeElement === "element2"
              ? `block`
              : `hidden`
          } p-4 flex flex-col gap-4 items-center text-[12px] text-[#555]`}>
          <Link to={"/in-progress"} className="sidebar-link w-[85%] relative left-[20px]"
          onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
          >
              <li className="nav-link_sideBa hover:bg-slate-100 border-[#99999950]">
                {" "}
                <div className="menu-item flex gap-6 items-center pb-4 text-[12px] text-[#555]">
                  <MdOutlineWorkspacePremium className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#555] text-[12px] font-medium ">
                  Bid Live auction
                  </p>
                </div>
              </li>
            </Link>
        </div>
      </div>


      <div className="">
        <h2 className="mb-0" id="headingOne">
          <button
            className={`${
              activeElement === "element3" &&
              `text-primary`
            } group relative nav-link_sideBa border-t-[1px] p-4 menu-ite gap-6 text-[12px] text-[#555] hover:bg-slate-100 flex w-full items-center  border-0  px-5 py-4 text-left text-base transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
            type="button"
            onClick={() => handleClick("element3")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <AiOutlineSafety className="text-[#9a9a9a] text-[20px] font-semibold " />
            <p className="text-[#2e054e] text-[14px] font-semibold ">
            Insurance 
                    </p>
            <span
              className={`${
                activeElement === "element3"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529]`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div className={`${
            activeElement === "element3"
              ? `block`
              : `hidden`
          } p-4 flex flex-col gap-4 items-center text-[12px] text-[#555]`}>
          <Link to={"/in-progress"} className="sidebar-link w-[85%] relative left-[30px]"
          onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
          >
              <li className="nav-link_sideBa hover:bg-slate-100 border-[#99999950]">
                {" "}
                <div className="menu-item flex gap-6 items-center pb-4 text-[12px] text-[#555]">
                  <PiShieldCheckeredDuotone className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#555] text-[12px] font-medium ">
                  Become our PosP
                  </p>
                </div>
              </li>
            </Link>
        </div>
      </div>
    </div>

            <Link to={"/about"} className="sidebar-link"
            onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
            >
              <li className="nav-link_sideBar hover:bg-slate-100 border-b-[1px] border-t-[1px]">
                {" "}
                <div className="menu-item flex gap-6 items-center text-[12px] text-[#555]">
                  <CgMenuBoxed className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#2e054e] text-[15px] font-semibold ">
                    About Us
                  </p>
                </div>
              </li>
            </Link>
            <Link to={"/faqs"} className="sidebar-link"
            onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
            >
              <li className="nav-link_sideBar hover:bg-slate-100 border-b-[1px]">
                <div className="menu-item flex gap-6 items-center text-[12px] text-[#555]">
                  <MdOutlineQuestionAnswer className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#2e054e] text-[15px] font-semibold ">
                    FAQs
                  </p>
                </div>
              </li>
            </Link>
            <Link to={"/in-progress"} className="sidebar-link"
            onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
            >
              <li className="nav-link_sideBar hover:bg-slate-100 border-b-[1px]">
                {" "}
                <div className="menu-item flex gap-6 items-center text-[12px] text-[#555]">
                  <BsWrenchAdjustableCircle className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#2e054e] text-[15px] font-semibold ">
                    Workshop
                  </p>
                </div>
              </li>
            </Link>
            <a
              href="https://www.businessworld.in/article/CarsBecho-The-Fastest-Growing-Auto-Tech-Startup-Built-On-5irechain/23-12-2022-459255/"
              target="_blank"
              className="sidebar-link"
            >
              <li className="nav-link_sideBar hover:bg-slate-100 border-b-[1px]">
                {" "}
                <div className="menu-item flex gap-6 items-center text-[12px] text-[#555]">
                  <BiNews className="text-[#9a9a9a] text-[20px] font-semibold " />
                  <p className="text-[#2e054e] text-[15px] font-semibold ">
                    News & Reviews
                  </p>
                </div>
              </li>
            </a>
          </ul>

          <div className="botto py-8 flex flex-col justify-center gap-12 px-8 items-center">
            <div className="links flex gap-8 text-[#888] scale-[0.9]">
              {/* <a href="#" target={"_blank"}>
                {" "}
                <TiSocialFacebook className="scale-[1.9]" />{" "}
              </a>
              <a href="#" target={"_blank"}>
                {" "}
                <TiSocialTwitter className="scale-[2]" />{" "}
              </a> */}
              <a href="https://www.youtube.com/@CarsBecho" target={"_blank"}>
                {" "}
                <TiSocialYoutube className="scale-[2]" />{" "}
              </a>
              <a href="https://www.instagram.com/carsbecho.in/?igshid=YzcxN2Q2NzY0OA%3D%3D" target={"_blank"}>
                {" "}
                <RiInstagramFill className="scale-[1.6]" />{" "}
              </a>
              <a href="https://www.linkedin.com/company/carsbecho/mycompany/" target={"_blank"}>
                {" "}
                <BsLinkedin className="scale-[1.4]" />{" "}
              </a>
            </div>
            <div className="get-it-on flex items-center gap-[20px]">
              <a
                href="https://play.google.com/store/apps/details?id=com.carsbecho.app"
                target="_blank"
              >
                {" "}
                <img
                  src={"/Images/googlePlay.png"}
                  alt="googlePlay Link"
                  className="h-[42px] w-[130px] scale-[1.2] opacity-[0.9] cursor-pointer"
                />
              </a>
              <Link to="/in-progress">
                {" "}
                <img
                  src={"/Images/appStore.png"}
                  alt="appStore Link"
                  className="h-[52px] w-[140px] scale-[1.2] opacity-[0.9] cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );

  const isXsScreen = useMediaQuery("(max-width: 400px)");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/cars/${keyword}`);
    } else {
      history.push("/cars");
    }
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const filterCities = (value) => {
    if (value.trim() === "") {
      setFilteredCities([]);
      return;
    }

    const filtered = citiesData.filter((city) =>
      city.City.toLowerCase().includes(value.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      const scoreA = a.City.toLowerCase().indexOf(value.toLowerCase());
      const scoreB = b.City.toLowerCase().indexOf(value.toLowerCase());
      return scoreA - scoreB;
    });

    setFilteredCities(sorted);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocationValue(value);
    filterCities(value);
  };
  const handleLocationBlur = () => {
    setFilteredCities([]);
  };

  const handleCitySelect = (city) => {
    history.push("/cars");
    setLocationValue(city.City);
    setSelectedCity(city);
    setIsModalOpen(false);
    sessionStorage.setItem("location", JSON.stringify(city.City));
    window.location.reload();
  };
  const [sessionLocation, setSessionLocation] = useState("");

  useEffect(() => {
    const storedLocation = sessionStorage.getItem("location");
    if (storedLocation) {
      setSessionLocation(JSON.parse(storedLocation));
    }
  }, []);

  const showSidebar = () => setSidebar(!sidebar);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const navbarStyles = {
    position: "sticky",
    transition: "top 0.6s",
  };

  return (
    <nav
      className="navbar flex-wrap hidden md:flex sm:flex sm:flex-col sm:gap-0 sm:w-full   "
      style={{ ...navbarStyles, top: visible ? "0" : "-102px" }}
    >
      <div className="upperNav mb-[45px] h-[60px] z-50 w-[95%] p-0">
        {/* search bar  */}
        <div className="w-[100%] h-[50px]  rounded items-center left-[2px] absolute top-[57px] justify-center flex">
          <form
            onSubmit={searchSubmitHandler}
            className="search object-contain mb-2 rounded items-center mx-3 w-[92%] justify-center flex"
            role="search"
          >
            <input
              className="searchInput border h-[42px] pl-[44px] pt-[4px] bg-[#f7f7f7] text-[#222] rounded-3xl text-sm shadow-inner focus:outline-none m-0 w-full relative "
              type="search"
              placeholder="Search Cars by Name, Colour, RTO"
              onChange={(e) => setKeyword(e.target.value)}
              aria-label="Search"
            />
          </form>
        </div>

        <BsSearch className="text-lg text-[#999] absolute sm:left-[34px] md:left-[50px] top-[73px]" />

        <div
          onClick={toggleModal}
          className="location flex absolute scale-110 sm:right-[24px] md:right-[40px] shadow-sm top-[65px] cursor-pointer items-center text-[#ee3131] p-2 bg-[#ffffff] rounded-full"
        >
          <ImLocation />
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex px-2 top-[-200px] justify-center items-center z-50">
            <div
              onClick={handleLocationBlur}
              className=" z-10 w-full px-8 bg-white h-[250px] rounded-lg p-6"
            >
              <label
                htmlFor="location"
                className="block text-lg font-semibold mb-2"
              >
                <div className="py-8 md:flex flex-col sm:flex hidden">
                  <div className="w-[65px] h-[5px] bg-[#ee3131] mx-auto my-4"></div>
                  <h2 className="text-xl w-full font-bold justify-center flex pl-4">
                    Explore Cars in your city
                  </h2>
                  {/* <h4 className="text-base flex justify-center py-4 text-[#999]">
                Find the perfect used car close to home
              </h4> */}
                  {/* <hr /> */}
                </div>
              </label>
              <div className="flex items-center">
                <ImLocation className="text-gray-500 mr-2" />
                <input
                  id="location"
                  type="text"
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                  placeholder="E.g. Bhopal, Indore etc."
                  value={locationValue}
                  onChange={handleLocationChange}
                  onFocus={() => filterCities(locationValue)}
                />
              </div>
              {filteredCities.length > 0 && (
                <ul className="mt-2 max-h-52 overflow-y-auto  shadow rounded-md">
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
            <div
              onClick={toggleModal}
              className="fixed inset-0 bg-[#000000] opacity-60"
            ></div>
          </div>
        )}
        <div className="upper-NavNav flex items-center h-[155px]  justify-between w-full mx-auto">
          <div className="upperNav-left flex items-center w-[60vw] justify-start pl-2">
            {/* hamburger menu  */}
            <Link to={"#"} className="menu-bar-open toggler-open"></Link>
            <div className="hidden md:flex">
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <HiMenuAlt1
                    className="cursor-pointer w-[27px] h-[27px] text-[#555]"
                    onClick={toggleDrawer(anchor, true)}
                  />
                  <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                  >
                    {list(anchor)}
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
            </div>

            {/* carsbecho logo  */}
            <Link to={"/"} className="">
              <div className="navBrand flex shrink-0 items-center scale-[0.75] relative left-[-35px]">
                <img
                  src={"/Images/brandNameNew.png"}
                  alt="CarsBecho Logo"
                  className="brandName w-[375px] md:w-[240px] relative top-1 sm:block"
                />
              </div>
            </Link>
          </div>

          {/* login/register  */}
          <div className="login-dash">
            {isAuthenticated ? (
              <Link to={"/account"} className="flex items-center pr-[8px]">
                <img
                  src={user.avatar[0].url}
                  alt="user profile picture"
                  className="rounded-full w-[40px] h-[40px]"
                  fallbackSrc="/Images/man.webp"
                  onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = "/Images/man.png"; // fallback image
                    e.target.alt = "Default Avatar"; // fallback alt text
                  }}
                />
              </Link>
            ) : (
              <Link to={"/login"}>
                <div className="login pr-2">
                  <span>
                    <FaUserCircle className="w-[23px] h-[23px] text-[#609092]" />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
        {/* <div className="border-b-[1px] w-full"></div> */}
      </div>

      {/* Sidebar Menu */}
    </nav>
  );
};

export default NavbarMobile;

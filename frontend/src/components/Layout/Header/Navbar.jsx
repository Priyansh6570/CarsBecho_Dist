import React from "react";
import { BsSearch } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { RxTriangleDown } from "react-icons/rx";
import { BiLogIn } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { debounce } from "../../helper.js";
import { useSelector } from "react-redux";
import { citiesData } from "../../cities.js";

import "../../../styles/navbar.scss";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      const formattedKeyword = keyword.trim().split(" ").join(" ");
      history.push(`/cars/${formattedKeyword}`);
    } else {
      history.push("/cars");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
      className="navbar flex flex-wrap shadow-md md:hidden sm:hidden"
      style={{ ...navbarStyles, top: visible ? "0" : "-68px" }}
    >
      <div className="upperNav h-[70px] z-50">
        {/* carsbecho logo  */}
        <Link to={"/"}>
          <div className="navBrand flex shrink-0 items-center">
            <img
              src={"/Images/brandNameNew.png"}
              alt="CarsBecho Logo"
              className="brandName h-[70px] relative top-1 sm:block"
            />
          </div>
        </Link>

        {/* search bar  */}
        <form
          onSubmit={searchSubmitHandler}
          className="search object-contain rounded bg-[#24272c] items-center relative left-[-60px] md:left-[0px] justify-center flex"
          role="search"
        >
          <input
            className="searchInput border h-[48px] bg-[#f7f7f7] rounded-l shadow-inner focus:outline-none p-[20px] relative "
            type="text"
            placeholder="Search Cars by Name, Colour, City, RTO"
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="Search"
          />
          <button
            className="searchBtn w-[50px] h-[48px]"
            type="submit"
            value="search"
          >
            <BsSearch className="translate-x-[80%] text-lg invert" />
          </button>
        </form>

        {/* login/register  */}
        <div className="login-dash">
          {isAuthenticated ? (
            <Link to={"/account"}>
            <div className="cursor-pointer" onClick={toggleSidebar}>
              <img
                src={user.avatar[0].url}
                alt={user.name}
                className="rounded-full w-16 h-16"
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = "/Images/man.webp"; // fallback image
                  e.target.alt = "Default Avatar"; // fallback alt text
                }}
              />
            </div>
            </Link>
          ) : (
            <Link to={"/login"}>
              <div className="login flex gap-[4px]">
                <BiLogIn className="relative bottom-[-3px]" />
                <span>Login/Register</span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="border-b-[1px] w-full"></div>

      <div className="lowerNav justify-between h-[50px] relative bottom-[1px] py-[4px] lg:flex font-normal">
        <ul className="flex p-0 SMN_effect-4">
          <li className="p-4">
            <Link to={"/cars"}> USED CAR</Link>
          </li>
          <li className="p-4">
            <Link to={"/newcar"}> SELL CAR</Link>
          </li>
          <li className="p-4">
            <Link to={"/about"}> ABOUT CARSBECHO</Link>
          </li>
          <li className="p-4">
            <Link to={"/in-progress"}> WORKSHOP</Link>
          </li>
          <li className="p-4">
            <a
              href="https://www.businessworld.in/article/CarsBecho-The-Fastest-Growing-Auto-Tech-Startup-Built-On-5irechain/23-12-2022-459255/"
              target="_blank"
            >
              {" "}
              NEWS & REVIEWS
            </a>
          </li>
        </ul>

        {/* location  */}
        <div
          onClick={toggleModal}
          className="location flex cursor-pointer p-4 items-center text-slate-600"
        >
          <ImLocation />
          <a href="#">{sessionLocation || "Select City"}</a>
          <RxTriangleDown />
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
              onClick={handleLocationBlur}
              className="bg-white z-10 w-[600px] h-[200px] rounded-lg p-6"
            >
              <label
                htmlFor="location"
                className="block text-lg font-semibold mb-2"
              >
                Enter your location
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
            <div
              onClick={toggleModal}
              className="fixed inset-0 bg-[#000000] opacity-60"
            ></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

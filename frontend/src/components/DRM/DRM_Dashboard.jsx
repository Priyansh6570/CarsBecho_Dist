import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import { IoIosArrowBack } from "react-icons/io";
import { getAllUsers } from "../../actions/userAction";
import { getAllPendingCars, getCar } from "../../actions/carAction";
import { useSelector, useDispatch } from "react-redux";
import { ImLocation } from "react-icons/im";
import { FiChevronRight } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdPendingActions } from "react-icons/md";
import { GiRupee } from "react-icons/gi";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import {TbBadges} from "react-icons/tb";

import "../../styles/Drm_dashboard.scss";
import MetaData from "../Layout/MetaData";

const DRM_Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { cars, notVerifiedCars,  } = useSelector((state) => state.cars);
  const { userRole, dealers, brokers, dealersWithSilverPlan,  dealersWithPremiumPlan, dealersWithPlatinumPlan} = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);


  // Filter dealers based on user's city
  // const dealers =
  //   users &&
  //   users.filter((user) => user.role === "dealer" && user.city === user.city);

  // // Filter brokers based on user's city
  // const brokers =
  //   users &&
  //   users.filter((user) => user.role === "broker" && user.city === user.city);

  // Filter users based on user's city and role
  const cityUsers = userRole;
    // cars &&
    // cars.filter(
    //   (user1) => user1.city === user.city && user1.user.role === "user"
    //   );


  // Filter notVerifiedCars based on user's city
  const filteredNotVerifiedCars = notVerifiedCars;

  const pendingCars = filteredNotVerifiedCars.length;
  const verifiedCars = cars.length;

  // Count dealers based on plan type
  let silverDealersCount = 0;
  let premiumDealersCount = 0;
  let platinumDealersCount = 0;
  
  if (dealersWithSilverPlan && dealersWithSilverPlan.length > 0) {
    silverDealersCount = dealersWithSilverPlan.length;
  }
  
  if (dealersWithPremiumPlan && dealersWithPremiumPlan.length > 0) {
    premiumDealersCount = dealersWithPremiumPlan.length;
  }
  
  if (dealersWithPlatinumPlan && dealersWithPlatinumPlan.length > 0) {
    platinumDealersCount = dealersWithPlatinumPlan.length;
  }
  

  // Count users from logged-in user's city with role "user"
 let cityUsersCount = 0;
  if (cityUsers && cityUsers.length > 0) {
    cityUsersCount = cityUsers.length;
  }

  useEffect(() => {
    if (user) {
      dispatch(getCar(user.city));
    }
    dispatch(getAllPendingCars(user.city));
    dispatch(getAllUsers(user.city));
  }, [dispatch, user.city]);

  return (
    <main className="md:h-[1080px] h-[100%] overflow-hidden w-full z-[10000] py-24 p-0 bg-[#eeeeee] absolute top-0">
      <MetaData title="Dashboard - DRM Panel" />
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <Link
          className="bg-[#ffffff20] rounded-full p-2"
          to='/account'
        >
          <span className="material-icons flex items-center gap-2 align-middle text-xl">
            <IoIosArrowBack className="text-[#434343]" />
            <h2 className="text-[#434343] text-sm">BACK</h2>
          </span>
        </Link>
      </div>

      <div className="upper px-4 gap-4 flex flex-col w-full h-fit">
        <div className="upper1st w-[80%] mx-auto sm:w-full flex items-center justify-between p-2 heading">
          <h2 className="text-xl text-[#3b3b3b] uppercase font-bold">
            DRM - {user && user.name}!
          </h2>
          <h2 className="text-sm text-[#ee3131] flex items-center gap-1">
            <ImLocation /> {user && user.city}
          </h2>
        </div>

        <div className="lower1st w-[80%] mx-auto sm:m-0 flex gap-2 pl-4 sm:w-[90vw] overflow-x-scroll snap-mandatory overflow-y-hidden rounded-2xl h-[150px] pb-6 infocards">
          <div className="card11 shadow-inner flex justify-center items-start flex-none w-[300px] h-[150px] gap-2 rounded-2xl ">
            <div className="left flex flex-col h-[100px] w-fit p-4 justify-start gap-1 target">
              <h2 className="text-lg text-start whitespace-nowrap font-semibold text-white">
                Monthly Target
              </h2>
              <h2 className="text-sm text-start whitespace-nowrap font-semibold px-2 py-1 bg-[#fff] shadow-sm rounded-lg w-fit text-[#000]">
                35 Dealers
              </h2>
              <h2 className="text-lg mt-2 text-start whitespace-nowrap font-semibold text-white">
                Your Progress
              </h2>
              <h2 className="text-sm text-start whitespace-nowrap font-semibold px-2 py-1 bg-[#fff] shadow-sm rounded-lg w-fit text-[#000]">
                {dealers && dealers.length}/25
              </h2>
            </div>
            <div className="right flex relative top-[20px] shadow-2xl shadow-[#8282824c] justify-center p-2 rounded-full border-[3px] bg-slate-50 border-[#ff5c5c] h-[100px] w-[100px] items-center flex-col target">
              <h1 className="text-2xl font-black text-[#ec3d49] items-center">
                {dealers && (dealers.length * 4)}%
              </h1>
              <div className="progress-meter absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-[#fff] overflow-hidden">
                <div
                  className="progress-bar h-full bg-[#ff666649]"
                  style={{ width: `${dealers && (dealers.length * 4)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="card1 shadow-inner flex flex-none w-[300px] h-[150px] gap-2 rounded-2xl items-center bg-gradient-to-tr from-[#e40a53fd] to-[#ef1d4774]">
            <div className="right flex justify-start p-4 w-[150px] items-center h-full flex-col target">
              <h2 className="text-2xl text-start whitespace-nowrap font-bold text-white">
                Dealers
              </h2>
              <h2 className="text-xl mt-4 text-start whitespace-nowrap font-semibold px-6 py-4 bg-[#fff] shadow-sm w-fit rounded-full text-[#000]">
                {dealers && dealers.length}
              </h2>
            </div>
            <div className="left bg-[#efeeee] rounded-lg shadow-inner flex flex-col h-[130px] w-[130px] p-4 justify-start gap-2 target">
              <div className="plan  flex items-center justify-between">
                <h2 className="text-base text-start whitespace-nowrap font-semibold text-[#000]">
                  Silver
                </h2>
                <h2 className="text-sm text-start whitespace-nowrap font-semibold px-2 py-1 bg-[#fff] shadow-sm rounded-lg w-fit text-[#000]">
                  {silverDealersCount}
                </h2>
              </div>

              <div className="plan flex items-center justify-between">
                <h2 className="text-base mt-2 text-start whitespace-nowrap font-semibold text-[#000]">
                  Premium
                </h2>
                <h2 className="text-sm text-start whitespace-nowrap font-semibold px-2 py-1 bg-[#fff] shadow-sm rounded-lg w-fit text-[#000]">
                  {premiumDealersCount}
                </h2>
              </div>

              <div className="plan flex items-center justify-between">
                <h2 className="text-base mt-2 text-start whitespace-nowrap font-semibold text-[#000]">
                  Platinum
                </h2>
                <h2 className="text-sm text-start whitespace-nowrap font-semibold px-2 py-1 bg-[#fff] shadow-sm rounded-lg w-fit text-[#000]">
                  {platinumDealersCount}
                </h2>
              </div>
            </div>
          </div>

          <div className="card1 shadow-inner flex flex-none w-[300px] h-[150px] gap-2 rounded-2xl items-center bg-gradient-to-tr from-[#e40a53fd] to-[#ef1d4774]">
            <div className="right flex justify-start p-4 w-[150px] items-center h-full flex-col target">
              <h2 className="text-2xl text-start whitespace-nowrap font-bold text-white">
                Total cars
              </h2>
              <h2 className="text-xl mt-4 text-start whitespace-nowrap font-semibold px-6 py-4 bg-[#fff] shadow-sm w-fit rounded-full text-[#000]">
                {cars && cars.length}
              </h2>
            </div>
            <div className="left bg-[#efeeee] rounded-lg shadow-inner flex flex-col h-[130px] w-[130px] p-4 justify-start gap-2 target">
              <div className="plan  flex items-center justify-between">
                <h2 className="text-base text-start whitespace-nowrap font-semibold text-[#000]">
                  Live
                </h2>
                <h2 className="text-sm text-start whitespace-nowrap font-semibold px-2 py-1 bg-[#fff] shadow-sm rounded-lg w-fit text-[#000]">
                  {verifiedCars}
                </h2>
              </div>

              <div className="plan flex items-center justify-between">
                <h2 className="text-base mt-2 text-start whitespace-nowrap font-semibold text-[#000]">
                  Pending
                </h2>
                <h2 className="text-sm text-start whitespace-nowrap font-semibold px-2 py-1 bg-[#fff] shadow-sm rounded-lg w-fit text-[#000]">
                  {pendingCars}
                </h2>
              </div>
            </div>
          </div>
          <div className="card1 shadow-inner flex flex-none w-[300px] h-[150px] gap-2 rounded-2xl items-center bg-gradient-to-tr from-[#19707bfd] to-[#28accaaf]">
            <div className="right flex justify-start p-4 w-[150px] items-center h-full flex-col target">
              <h2 className="text-2xl text-start whitespace-nowrap font-bold text-white">
                Brokers
              </h2>
              <h2 className="text-xl mt-4 text-start whitespace-nowrap font-semibold px-6 py-4 bg-[#fff] shadow-sm w-fit rounded-full text-[#000]">
                {brokers && brokers.length}
              </h2>
            </div>
            <div className="right flex justify-start p-4 w-[150px] items-center h-full flex-col target">
              <h2 className="text-2xl text-start whitespace-nowrap font-bold text-white">
                users
              </h2>
              <h2 className="text-xl mt-4 text-start whitespace-nowrap font-semibold px-6 py-4 bg-[#fff] shadow-sm w-fit rounded-full text-[#000]">
                {cityUsersCount}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="lower p-4 gap-4 flex flex-col w-[95%] h-full mt-8 bg-slate-100 rounded-t-[60px] mx-auto shadow-inner">
        <div className="h-[7px] w-[60px] shadow-inner rounded-lg bg-slate-300 mx-auto mt-4"></div>
        <div className="flex flex-col px-8 py-8">
          <NavLink
            activeClassName="bg-[#0099ff10] rounded-lg text-[#09f]"
            to={`/drm/dashboard/${user && user._id}`}
          >
            <div className="quicklink flex items-center justify-between px-2 py-4">
              <div className="right flex h-full items-center gap-4">
                <MdDashboard className="scale-[1.6]" />
                <h2 className="font-medium">DRM Dashboard</h2>
              </div>
              <div className="left">
                <FiChevronRight className=" scale-125" />
              </div>
            </div>
          </NavLink>
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
          <NavLink to={"/drm/cars/pending"}>
            <div className="quicklink flex items-center justify-between px-2 py-4">
              <div className="right flex h-full items-center gap-4">
                <MdPendingActions className="scale-[1.3]" />
                <h2 className="font-medium">Pending cars</h2>
              </div>
              <div className="left">
                <FiChevronRight className=" scale-125" />
              </div>
            </div>
          </NavLink>
          <NavLink to={"/drm/subscriptions"}>
            <div className="quicklink flex items-center justify-between px-2 py-4">
              <div className="right flex h-full items-center gap-4">
                <GiRupee className="scale-[1.3]" />
                <h2 className="font-medium">Subscription Requests</h2>
              </div>
              <div className="left">
                <FiChevronRight className=" scale-125" />
              </div>
            </div>
          </NavLink>

          <NavLink to={"/drm/trial-requests"}>
            <div className="quicklink flex items-center justify-between px-2 py-4">
              <div className="right flex h-full items-center gap-4">
                <TbBadges className="scale-[1.3]" />
                <h2 className="font-medium">Free Trial Requests</h2>
              </div>
              <div className="left">
                <FiChevronRight className=" scale-125" />
              </div>
            </div>
          </NavLink>

          <NavLink
            activeClassName="bg-[#0099ff10] rounded-lg text-[#09f]"
            to={"/drm/dealers"}
          >
            <div className="quicklink flex items-center justify-between px-2 py-4">
              <div className="right flex h-full items-center gap-4">
                <BsBriefcaseFill className="scale-[1.3]" />
                <h2 className="font-medium">Dealers</h2>
              </div>
              <div className="left">
                <FiChevronRight className=" scale-125" />
              </div>
            </div>
          </NavLink>

          <NavLink
            activeClassName="bg-[#0099ff10] rounded-lg text-[#09f]"
            to={`/drm/brokers`}
          >
            <div className="quicklink flex items-center justify-between px-2 py-4">
              <div className="right flex h-full items-center gap-4">
                <FaUserTie className="scale-[1.3]" />
                <h2 className="font-medium">Brokers</h2>
              </div>
              <div className="left">
                <FiChevronRight className=" scale-125" />
              </div>
            </div>
          </NavLink>

        </div>
      </div>
    </main>
  );
};

export default DRM_Dashboard;

import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader/Loader";
import { Link, NavLink } from "react-router-dom";
import "../../styles/profile.scss";
import { AiOutlineCar, AiOutlineHeart } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import Skeleton from "@mui/material/Skeleton";

import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const alert = useAlert();
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
    history.push("/");
    alert.success("Logout Successfully");
  }
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="LoginSignUpContainer flex justify-center align-top sm:h-fit bg-[#ffffff]">
            <div className="profileContainer p-3 w-[100%] sm:w-full sm:h-fit sm:rounded-none h-full flex flex-col justify-center items-center md:relative gap-3 rounded-2xl">
              <div className="profileContainer__left bg-[#ffffffb7] w-[50%] md:w-[80%] sm:h-fit sm:w-full rounded-xl flex flex-col justify-center gap-6 items-center">
                <Link
                  to="/me/update"
                  className="btn-secondary absolute right-[400px] top-[210px] md:top-[240px] md:right-[100px] sm:right-[-0.7rem] sm:top-[0.7rem] sm:scale-75 bg-[#ee3131] text-white font-semibold font-sans flex place-content-center items-center p-2 rounded justify-center w-[140px] h-[30px]"
                >
                  Edit Profile
                </Link>

                <div className="profile_info w-full p-2 flex gap-1 h-[150px]">
                  <div className="profile_info__left w-[40%] h-full flex flex-col justify-center items-center">
                    <div className="profileContainer__left__imgContainer w-[100px] h-[100px] border-[0.5px] border-[#ee3131] rounded-[100%] overflow-hidden">
                      {/* // image skeleton  */}
        <img
          src={user.avatar[0].url}
          alt={user.name}
          className="rounded-[100%] w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = "/Images/man.webp"; // fallback image
            e.target.alt = "Default Avatar"; // fallback alt text
          }}
        />
                    </div>
                  </div>

                  <div className="profile_info__right w-[70%] py-10 h-full flex flex-col gap-1">
                    <h1 className="font-semibold flex items-center gap-2">
                      {user.name}{" "}
                      {user.role === "dealer" ||
                      user.role === "broker" ||
                      user.role === "superUser" ? (
                        <img
                          src="/Images/blue_tick.png"
                          alt={`Verified ${user.role}`}
                          className="w-6"
                        />
                      ) : (
                        ""
                      )}{" "}
                    </h1>
                    <h1 className=" font-medium">{user.mobile}</h1>
                    <h1 className="text-sm font-normal">{user.email}</h1>
                  </div>
                </div>
              </div>

              <div className="profileContainer__right bg-[#fff] rounded-xl text-center w-[50%] md:w-[80%] sm:w-full sm:h-[598px] sm:bg-[#ffffff8f] flex flex-col gap-5 p-6 pl-12">
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
                  {user.role === "drm" ? (
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

                  {/* <NavLink
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
                  </NavLink> */}

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
                  <div className="become_partners">
                    <Link to={"/sellCar"}>
                      <button className="rounded-md btn text-[#ffffff] border-[1px] bg-[#ee3131] w-full font-medium mt-8 border-[#ffffff00] h-[50px]">
                        Become a Partner
                      </button>
                    </Link>
                  </div>
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

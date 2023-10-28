import React, { useState } from "react";
import "../../styles/sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineCar, AiOutlineHeart } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State variable for sidebar visibility

  const history = useHistory();
  const alert = useAlert();

  const logoutUser = () => {
    logout();
    history.push("/");
    alert.success("Logout Successfully");
  };

  const { user } = useSelector((state) => state.user);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="seller_details h-fit w-[400px] md:w-full md:hidden mt-4 sm:mt-0 p-8 md:p-1 rounded-xl bg-[#b7b7b747] shadow-lg sticky top-[50px] md:top-0 mb-8 md:mb-0">
          {user && (
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
                        e.target.src = "/Images/man.webp"; // fallback image
                        e.target.alt = "Default Avatar"; // fallback alt text
                      }}
                    />
                  </div>
                </div>

                <div className="profile_info__right sm:w-[70%] w-[80%] py-10 h-full flex flex-col gap-1">
                  <h1 className="font-semibold flex items-center gap-4">
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
  );
};

export default Sidebar;

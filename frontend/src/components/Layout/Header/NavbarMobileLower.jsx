import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/navbarMobileLower.scss";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const NavbarMobileLower = () => {
  return (
    <section className="lowerNav flex flex-wrap xs:p-0 gap-4 w-[97vw] object-contain justify-center mx-auto relative">
      <Link
        to={"./cars"}
        className="lower-nav-link active:scale-[0.95] w-[98%] h-[150px] flex justify-center rounded-xl bg-[#222233]"
      >
        <h3 className="text-[26px] xs:text-[22px] absolute top-[50px] left-[50px] font-bold text-white">
         Buy Used Car
        </h3>
        <img
          src={"Images/usedcar-home-stiker.gif"}
          alt="used-car logo"
          className="w-[400px] scale-x-[-1] absolute top-[-114px] opacity-[10%]"
        />
        <img
          src={"Images/usedcar-home-carStiker.gif"}
          alt="used-car logo"
          className="w-[160px] absolute right-[20px]"
        />
        <div className="click-to-open flex place-items-center gap-2 absolute top-[80px] left-[55px] text-[#ee3131] mt-4 font-medium text-base">
          <h4>View More</h4>
          <IoIosArrowDroprightCircle />
        </div>
      </Link>
      <div className="lower_links z-10 grid w-[98%] grid-cols-2 gap-4">
  <Link
    to={"/newcar"}
    className="lower-nav-link active:scale-[0.95] w-[100%] h-[150px] flex flex-col justify-center items-center rounded-xl backdrop-filter backdrop-blur-sm bg-[#e63636]"
  >
    <h3 className="text-2xl xs:text-[18px] font-bold relative top-[-5px] text-white">Sell Car</h3>
    <img src={"Images/car.png"} alt="sell-car logo" className="w-[70px]" />
  </Link>
  <Link
    to={'/in-progress'}
    className="lower-nav-link active:scale-[0.95] w-[100%] h-[150px] flex flex-col justify-center backdrop-filter backdrop-blur-sm items-center rounded-xl bg-[#0967ab]"
  >
    <h3 className="text-[20px] xs:text-[18px] font-bold relative top-[-5px] text-white">Workshop</h3>
    <img
      src={"Images/mechanic.png"}
      alt="mechanic logo"
      className="w-[70px]"
    />
  </Link>
</div>

    </section>
  );
};

export default NavbarMobileLower;

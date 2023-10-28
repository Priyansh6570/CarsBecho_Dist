import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { Link } from "react-router-dom";

const FooterMobile = () => {
  return (
    <section className="footer-mobile hidden sm:flex md:flex md:flex-col sm:flex-col bg-[#171717] pt-[30px] relative top-[100%]">
      <div className="links flex justify-center items-center gap-8 text-[#e9e9e9]">
        <a href="#" target={"_blank"}>
          {" "}
          <TiSocialFacebook className="scale-[1.9]" />{" "}
        </a>
        <a href="#" target={"_blank"}>
          {" "}
          <TiSocialTwitter className="scale-[2]" />{" "}
        </a>
        <a href="https://youtube.com/@CarsBecho" target={"_blank"}>
          {" "}
          <TiSocialYoutube className="scale-[2]" />{" "}
        </a>
        <a href="https://instagram.com/carsbecho.in?igshid=YzcxN2Q2NzY0OA==" target={"_blank"}>
          {" "}
          <RiInstagramFill className="scale-[1.6]" />{" "}
        </a>
        <a href="https://www.linkedin.com/company/carsbecho/mycompany/" target={"_blank"}>
          {" "}
          <BsLinkedin className="scale-[1.4]" />{" "}
        </a>
      </div>

      <div className="footer-bottom-section w-full">
        <div className="footer-copyright-container w-[80%] h-[100%] mx-auto my-4 flex justify-center pt-7">

        </div>
      </div>

      <div className="bottom_div p-2 flex flex-col">
        <div className="w-full flex flex-col p-2 h-fit ">
          <div className="w-full flex flex-col p-2">
            <h1 className="text-[#e9e9e9] w-fit text-xl pb-2 border-b-[1px] border-[#ee3131] font-semibold">
              Services
            </h1>
          </div>
          <div className="flex p-2 text-sm text-[#eee] font-medium gap-2">
            <div className="flex flex-col pl-2 font-semibold gap-4 flex-1">
              <p className="w-white">OES & OEM</p>
              <Link to="/newcar" className="w-white">Sell Car</Link>
              <p className="w-white">Used Car Loan</p>
              <p className="w-white">CarsBecho Workshop</p>
            </div>
            <div className="flex text-sm font-semibold text-[#eee] flex-col gap-4 flex-1">
              <Link to="/cars" className="w-white">Buy Used Car</Link>
              <p className="w-white">CarsBecho Certified</p>
              <p className="w-white">CarsBecho Warranty</p>
              <p className="w-white pb-2"> How Does CarsBecho Workshop Work</p>
            </div>
          </div>
        </div>
        <div className="w- flex-col flex p-2 h-fit pb-4 bg-[#171717]">
          <div className="w-full flex flex-col p-2">
            <h1 className="text-[#e9e9e9] w-fit text-xl pb-2 border-b-[1px] border-[#ee3131] font-semibold">
              About Us
            </h1>
          </div>
          <div className="flex p-2 text-sm text-[#eee] font-medium gap-2">
            <div className="flex flex-col pl-2 font-semibold gap-4 flex-1">
            <Link to="/about" className="w-white">About Us</Link>
              <p className="w-white">Contact Us</p>
              <Link to="/sellcar" className="w-white">Become our Partner</Link>
              <p className="w-white">Career</p>
            </div>
            <div className="flex text-sm font-semibold text-[#eee] flex-col gap-4 flex-1">
              <Link to="/faqs" className="w-white">FAQs</Link>
              <Link to="/sellcar" className="w-white">Advertise with Us</Link>
              <Link to="/info/privacy-policy" className="w-white">Privacy & Policy</Link>
              <p className="w-white"><Link to='/info/terms-and-conditions'>Terms & Conditions</Link></p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-2 h-[150px] mb-2 bg-[#171717]">
          <div className="w-full flex flex-col p-2">
            <h1 className="text-[#e9e9e9] w-fit text-lg font-bold">
              DOWNLOAD THE APP
            </h1>
          </div>
          <div className="get-it-on w-full justify-center p-8 flex items-center gap-[30px]">
            <a
              href="https://play.google.com/store/apps/details?id=com.carsbecho.app"
              target="_blank"
            >
              {" "}
              <img
                src={"/Images/googlePlay.png"}
                alt="googlePlay Link"
                className="h-[42px] w-[130px] scale-[1.2] opacity-[0.9] border-[2px] border-[#999] rounded-lg cursor-pointer"
              />
            </a>
            <a href="">
              {" "}
              <img
                src={"/Images/app-store.png"}
                alt="appStore Link"
                className="h-[52px] scale-[1.9] opacity-[1] cursor-pointer"
              />
            </a>
          </div>
        </div>
        <div className="w-full text-sm text-[#d0d0d0] py-8 px-8 text-center flex p-2 h-fit bg-[#171717]">
        Ramdhan Automotives Pvt. Ltd. also known as CarsBecho.com India's Leading used cars afterSales Auto-marketplace
          inbuilt with blockchain which Completes end to end Used car
          Transactions, From buying a Used car to Ending up at service centre -
          CarsBecho is with you at every corner
        </div>
        <hr className="bg-[#ee3131] w-[150px] mx-auto flex items-center justify-self-center h-[5px]" />
        <p className="text-[#d6d6d6] mx-auto p-8 text-xs">
        © 2023 Ramdhan Automotives Pvt. Ltd.
          </p>
      </div>
      <hr />
    </section>
  );
};

export default FooterMobile;

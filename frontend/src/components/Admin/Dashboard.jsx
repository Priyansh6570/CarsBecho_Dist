import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "../../styles/dashboard.scss";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userAction.js";
import { getAllPendingCars, getCar } from "../../actions/carAction.js";
import MetaData from "../Layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { carCount, notVerifiedCars } = useSelector((state) => state.cars);

  // Get All Users
  const { users } = useSelector((state) => state.allUsers);

  // Get All Users whose Role is Dealer
  const dealers = users && users.filter((user) => user.role === "dealer");

  // Get All Users whose Role is Broker
  const brokers = users && users.filter((user) => user.role === "broker");

  const pendingCars = notVerifiedCars.length;
  const verifiedCars = carCount;

  useEffect(() => {
    dispatch(getCar());
    dispatch(getAllPendingCars());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="dashboard flex md:flex-col gap-1 bg-[url('/Images/user-action-bg.jpg')] bg-cover ">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboard__content overflow-hidden justify-center border-[#999] mx-auto border-[1px] p-8 rounded-xl bg-white h-[90vh] sm:h-fit w-[70%] md:w-full m-4">
        <div className="dashboard__content__title flex justify-between">
          <Typography variant="h4">Dashboard</Typography>
          <Link
            to={"/seller"}
            className="btn bg-[#ee3131] text-white self-center font-medium py-2 px-8"
          >
            My Cars
          </Link>
        </div>

        <hr className="my-8 w-full" />

        <div className="card_container flex flex-col ml-[100px] sm:mx-auto justify-center align-middle w-[300px] bg-slate-300 gap-12 sm:gap-4 my-8 rounded-xl p-4">
          <div className="card card1 w-full h-[50px] bg-white rounded-xl flex gap-8 align-middle p-4">
            <span className="text-xl mr-[90px] font-semibold">
              Total Cars :{" "}
            </span>
            <span className="text-xl flex justify-self-end font-medium mb-4">
              {carCount + notVerifiedCars.length || 0}
            </span>
          </div>
          <div className="card card2 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[65px] text-center font-semibold self-center">
              Pending Cars
            </span>
            <span className="text-xl font-medium mb-5 relative bottom-2">
              {notVerifiedCars.length}
            </span>
          </div>
          <div className="card card3 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[60px] font-semibold self-center">
              Verified Cars :{" "}
            </span>
            <span className="text-xl font-medium mb-4">{carCount}</span>
          </div>
          <div className="card card4 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[120px] font-semibold self-center">
              Users :{" "}
            </span>
            <span className="text-xl font-medium mb-4">{users.length}</span>
          </div>
          <div className="card card5 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[110px] font-semibold self-center">
              Dealers :{" "}
            </span>
            <span className="text-xl font-medium mb-4">{dealers.length}</span>
          </div>
          <div className="card card5 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[110px] font-semibold self-center">
              Brokers :{" "}
            </span>
            <span className="text-xl font-medium mb-4">{brokers.length}</span>
          </div>
        </div>

        <div className="link_to_action_container sm:flex-wrap relative sm:top-[-50px] top-[-500px] right-[-400px] sm:right-0 flex justify-center sm:w-[100%] w-[70%] align-middle bg-slate-50 px-14 sm:px-0 gap-8 my-8 rounded-xl p-4">
          <Link
            to="/admin/cars/pending"
            className="link_to_action link_to_action1 flex justify-center align-middle w-[30%] h-[100px] overflow-hidden text-center btn bg-[#ee3131] text-white rounded-xl p-4"
          >
            <h2 className="text-lg font-semibold p-4 self-center">
              Approve Pending Cars
            </h2>
          </Link>
          <Link
            to="/admin/dealers"
            className="link_to_action link_to_action1 flex justify-center align-middle w-[30%] h-[100px] overflow-hidden text-center btn bg-[#ee3131] text-white rounded-xl p-4"
          >
            <h2 className="text-lg font-semibold p-4 self-center">
              View All Dealers
            </h2>
          </Link>
          <Link
            to="/admin/allUsers"
            className="link_to_action link_to_action1 flex justify-center align-middle w-[30%] h-[100px] overflow-hidden text-center btn bg-[#ee3131] text-white rounded-xl p-4"
          >
            <h2 className="text-lg font-semibold p-4 self-center">
              View All Users
            </h2>
          </Link>
          <Link
            to="/admin/subscriptions"
            className="link_to_action link_to_action1 flex justify-center align-middle w-[30%] h-[100px] overflow-hidden text-center btn bg-[#ee3131] text-white rounded-xl p-4"
          >
            <h2 className="text-lg font-semibold p-4 self-center">
              Subscription Requests
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

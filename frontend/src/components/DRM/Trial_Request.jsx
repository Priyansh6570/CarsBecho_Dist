import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../../actions/subscriptionAction";
import Modal from "react-modal";
import { updateCreditAndExpireLimit } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from '../Layout/Loader/Loader'
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";

const formatDateTime = (dateTimeString) => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleDateString("en-IN", options);
};

const Trial_Request = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


    const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  
  const userCity = user.city;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const openModal = (subscription) => {
    setSelectedSubscription(subscription);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { loading, subscriptions, error } = useSelector(
    (state) => state.subscriptions
  );

  const handleApprove = () => {
    if (selectedSubscription) {
      const user = selectedSubscription.userId._id;
      const updatedCredit = selectedSubscription.planCredits;
      const expireTime = selectedSubscription.planDuration;

      try {
        dispatch(updateCreditAndExpireLimit(user, updatedCredit, expireTime));
        history.push("/account");
        alert.success("Approved Successfully, Refresh the page to see changes");
        closeModal();
      } catch (error) {
        alert.error("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  const filteredSubscriptions = subscriptions.filter(
    (subscription) => subscription.userId.city === userCity && subscription.userId.role === "user"
  );

  return (
    <main className="h-fit min-h-[110%] overflow-hidden w-full z-[10000] py-24 p-0 bg-[#eeeeee] absolute top-0">
      
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <button
          className=" rounded-full p-2"
          onClick={() => window.history.back()}
        >
          <span className="material-icons flex items-center gap-2 align-middle text-xl">
            <IoIosArrowBack className="text-[#434343]" />
            <h2 className="text-[#434343] text-sm">BACK</h2>
          </span>
        </button>
      </div>
      <div>
      <div className="pb-8 md:flex flex-col flex">
              <div className="w-[65px] h-[5px] bg-[#ee3131] mx-auto my-4"></div>
              <h2 className="text-xl w-full font-bold justify-center flex pl-4">
              {subscriptions.length > 0 ? "Trial Requests" : "No Trial Requests"}
              </h2>
              <h4 className="text-base flex justify-center py-4 text-[#999]">
                All Subscription requests
              </h4>
              <hr />
            </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {filteredSubscriptions &&
              filteredSubscriptions.map((subscription) => (
                <div
                  key={subscription._id}
                  className="mb-4 p-2 sm:px-2 sm:py-1 sm:overflow-hidden w-[80vw] sm:border-[2px] sm:border-[#cacaca] sm:w-[98%] mx-auto h-fit border rounded"
                >
                  <h2 className="text-lg flex gap-8 justify-between font-bold bg-slate-100 px-4 py-2 rounded text-center mb-2">
                    <span>Date & Time:</span>{" "}
                    <span>{formatDateTime(subscription.createdAt)}</span>
                  </h2>
                  <div className=" flex flex-row-reverse sm:flex-col-reverse gap-[10px] sm:gap-0 justify-center align-middle">
                    <button
                      onClick={() => openModal(subscription)}
                      className="updateCar w-[200px] mx-auto h-fit sm:w-[80%] sm:self-center sm:mx-auto bg-[#ee3131] btn text-white rounded mt-8 font-semibold text-lg py-2 px-4 sm:text-base"
                    >
                      Approve
                    </button>

                    <div className="bg-slate-100 w-fit min-w-[400px] h-fit self-center rounded p-8">
                      <h3 className="font-bold bg-slate-200 rounded w-full text-center py-2 px-4 text-lg">
                        User Details:
                      </h3>
                      <div className="flex flex-col xs:px-2 gap-4">
                        <div className="flex gap-8 mt-4 justify-between">
                          <span className="font-medium bg-slate-50 rounded w-fit p-2 mx-auto text-center py-1 px-2 text-base">
                          </span>
                        </div>
                        <div className="flex gap-8 mt-4 justify-between">
                          <span className="font-bold">Name:</span>
                          <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                            {subscription.userId.name}
                          </span>
                        </div>

                        {subscription.userId.role === "dealer" && (
                          <div className="flex gap-8 mt-4 justify-between">
                            <span className="font-bold">Dealership Name:</span>
                            <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                              {subscription.userId.dealershipName}
                            </span>
                          </div>
                        )}

                        <div className="flex gap-8 mt-2 justify-between">
                          <span className="font-bold">Location:</span>
                          <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                            {subscription.userId.city}
                          </span>
                        </div>
                        <div className="flex gap-8 mt-2 justify-between">
                          <span className="font-bold">Mobile:</span>
                          <span className="font-medium font-mono  bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                            {subscription.userId.mobile}
                          </span>
                        </div>
                        <div className="flex gap-8 mt-2 justify-center">
                          <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                            {subscription.userId.address}
                          </span>
                        </div>
                        
                      </div>
                    </div>

                    <div className="pt-[10px] flex justify-center">
                      
                      {subscription.planName === "Free Trial Package" && (
                        <div className="w-80 sm:w-[400px] h-fit p-8 sm:pb-8 bg-gray-900 text-center overflow-hidden rounded-3xl text-white border-4 shadow-xl border-white">
                          <h1 className="text-white font-semibold text-2xl">
                          Free Trial Package
                          </h1>
                          <p className="pt-2 tracking-wide">
                            <span className="text-gray-400 align-top">₹ </span>
                            <span className="text-3xl font-semibold">
                              0
                            </span>
                            <span className="text-gray-400 font-medium">
                              / user
                            </span>
                          </p>
                          {/* Features */}
                         
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        className="modal absolute bg-white w-[500px] z-[100001] sm:w-[400px] h-fit p-8 justify-center flex flex-col rounded-lg shadow-lg overflow-hidden"
        overlayClassName="modal-overlay z-[100000] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <h2 className="font-bold bg-slate-200 rounded w-full text-center mb-8 py-2 px-4 text-lg">
          Confirmation
        </h2>
        <p className="modal-message text-base text-center mb-8">
          Please Contact & Validate Payment before Approving Request!
        </p>
        <div className="modal-buttons self-center flex justify-end">
          <button
            onClick={closeModal}
            className="modal-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            className="modal-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Approve
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default Trial_Request;

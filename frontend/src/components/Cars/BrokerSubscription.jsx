import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newSubscription } from "../../actions/subscriptionAction";
import Modal from "react-modal";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAlert } from "react-alert";
import { IoIosArrowBack } from "react-icons/io";
import { citiesData } from "../cities.js";
import { useHistory } from "react-router-dom";

const BrokerSubscription = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [locationValue, setLocationValue] = useState("");

  const { user } = useSelector((state) => state.user);

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocationValue(value);
    setCity(value);
    filterCities(value);
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    setFilteredCities([]);
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

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setIsConfirmationOpen(true);
  };

  const handleConfirmation = () => {
    try {
      const subscription = {
        userId: user._id,
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        planDuration: selectedPlan.duration,
        planCredits: selectedPlan.credits,
        planDescription: selectedPlan.description,
        planType: "True value package",
        role: "broker",
        tagline: "",
        dealershipName: "",
        city,
        address,
      };

      dispatch(newSubscription(subscription));
      history.push("/account");
      setIsConfirmationOpen(false);
      alert.success("Subscription Request Sent successfully");
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };
  return (
    <div className="font-sans bg-gradient-to-tr from-cyan-600 to-[#284c4c] z-[10000] absolute top-0 h-fit w-full sm:overflow-hidden">
      {/* back button  */}
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <button
          className="bg-white rounded-full p-2"
          onClick={() => window.history.back()}
        >
          <span className="material-icons align-middle text-xl">
            <IoIosArrowBack />
          </span>
        </button>
      </div>

      {/* Plan Cards */}
      <div className="min-h-screen pb-[7rem] pt-12 flex justify-center items-start">
        <div className="w-full px-8">
          {/* Plan Details */}
          <div className="text-center font-semibold">
            {/* Title */}
            <h1 className="text-2xl flex flex-col text-center font-bold">
              <span className="text-white tracking-wide">CarsBecho</span>
              <span className="text-white">Authentic Broker Plan</span>
            </h1>
          </div>

          <div className="tab w-full max-w-2xl mx-auto h-[40px] mt-8 gap-2 flex">
            <button
              className={`h-full flex flex-1 justify-center font-bold items-center px-4 py-2 rounded-full text-black bg-white border-2 border-white hover:bg-gray-200 hover:border-gray-200 hover:text-black`}
            >
              True value package
            </button>
          </div>
          {/* Plan Cards */}
          <div className="pt-24 flex flex-row sm:flex-col sm:gap-[10px] justify-center">
            {/* True value package */}
            <div className="md:w-full w-[60%] border-[1px] border-[#ffffff7d] md:border-0 rounded-xl p-8 scale-125 md:scale-1 flex gap-8 md:gap-0 md:flex-col self-center text-center overflow-x-hidden">
              <div className="flex-1 items-center justify-center flex flex-col">
                <div className="icon">
                  <img
                    src="/Images/brokerplan.png"
                    alt=""
                    className="w-[180px] mx-auto"
                    loading="lazy"
                  />
                </div>
                <h1 className="text-white font-bold text-3xl py-4">
                  True value package - Monthly
                </h1>
                <p className="pt-2 tracking-wide">
                  <span className="text-3xl font-semibold text-white">₹ </span>
                  <span className="text-3xl font-semibold text-white">
                    1,299
                  </span>
                  <span className="text-xl font-semibold text-[#dadada]">
                    {" "}
                    / user
                  </span>
                </p>
                {/* Features */}
                <hr className="mt-4 border-1" />
              </div>
              <div className="pt-8 flex flex-1 flex-col gap-2">
                <p className="font-semibold flex justify-between px-4 bg-[#7fdbf24e] items-center rounded-lg text-white py-2">
                  <span className="material-icons align-middle">Credit</span>
                  <span className="pl-2">10 Ads</span>
                </p>
                <p className="font-semibold flex justify-between px-4 bg-[#7fdbf24e] items-center rounded-lg text-white py-2">
                  <span className="material-icons align-middle">Duration</span>
                  <span className="pl-2 flex gap-4">
                    <span className="">30 days</span>
                  </span>
                </p>
                <p className="font-semibold flex justify-between px-4 bg-[#7fdbf24e] items-center rounded-lg text-white py-2">
                  <span className="material-icons align-middle">Location</span>
                  <span className="pl-2">Single location</span>
                </p>
                <p className="font-semibold flex justify-between px-4 bg-[#7fdbf24e] items-center rounded-lg text-white py-2">
                  <span className="material-icons align-middle">
                    Verification
                  </span>
                  <span className="pl-2 flex gap-2 text-black bg-white pr-2 py-1 rounded-lg">
                    Blue Tick{" "}
                    <img src="/Images/blue_tick.png" className="w-6" />
                  </span>
                </p>
                <p className="font-semibold flex justify-center px-4 mt-2 bg-[#7fddf26e] items-center rounded-lg text-white py-2">
                  <span className="material-icons align-middle">
                    Organic Boosting
                  </span>
                </p>
                {/* Choose Plan Button */}
                <button
                  className="w-full py-4 flex gap-1 justify-center align-middle bg-[#fff] font-semibold mt-8 rounded-xl text-[#3069ab]"
                  onClick={() =>
                    handlePlanSelection({
                      name: "True value package",
                      price: "1,299",
                      duration: 30,
                      credits: 10,
                      description: "Single location | Organic boosting",
                    })
                  }
                >
                  <span className="">Choose Plan</span>
                  <span className="pl-2 material-icons my-auto scale-[1.2] align-middle text-sm">
                    <AiOutlineArrowRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmationOpen}
        onRequestClose={() => setIsConfirmationOpen(false)}
        className="modal absolute z-[100002] bg-[#110c2f] w-[500px] sm:w-[400px] h-[400px] p-8 justify-center flex flex-col rounded-lg shadow-lg overflow-hidden"
        overlayClassName="modal-overlay z-[10001] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <h2 className="modal-title text-2xl border-b-2 text-white py-2 px-4 rounded text-center w-full self-center font-bold mb-4">
          Confirm Subscription
        </h2>
        <p className="modal-message text-lg py-2 text-white text-center mb-4">
          On continuing, the CarsBecho team will contact you for further
          verification and activation of{" "}
          <span className="font-semibold">{selectedPlan?.name}</span> plan.
        </p>
        <div className="modal-inputs flex flex-col gap-4 mb-4">
          <div className="">
            <input
              id="location"
              type="text"
              className="border border-gray-300 px-3 py-2 rounded-lg w-full"
              placeholder="E.g. Bhopal, Indore etc."
              value={city}
              onChange={handleLocationChange} // Remove the () from handleLocationChange
              onFocus={() => filterCities(locationValue)}
            />
          </div>
          {filteredCities.length > 0 && (
            <ul className="mt-2 max-h-52 absolute top-[250px] overflow-y-auto bg-white shadow rounded-md">
              {filteredCities.map((city) => (
                <li
                  key={city.City}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-4 text-base text-gray-800"
                  onClick={() => handleCitySelection(city.City)}
                >
                  {city.City}
                </li>
              ))}
            </ul>
          )}
          <input
            id="location"
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-lg w-full"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="modal-buttons self-center flex justify-end">
          <button
            className="modal-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
            onClick={() => setIsConfirmationOpen(false)}
          >
            Cancel
          </button>
          <button
            className="modal-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleConfirmation}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BrokerSubscription;

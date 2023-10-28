import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newSubscription } from "../../actions/subscriptionAction";
import Modal from "react-modal";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAlert } from "react-alert";
import { IoIosArrowBack } from "react-icons/io";
import { citiesData } from "../cities.js";
import { useHistory } from "react-router-dom";

const DealerSubscription = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [dealershipName, setDealershipName] = useState("");
  const [tagline, setTagline] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [locationValue, setLocationValue] = useState("");

  const [selectedPlandis, setSelectedPlandis] = useState("Silver");

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

  const handlePlanSelectiondis = (plan) => {
    setSelectedPlandis(plan);
  };

  const { user } = useSelector((state) => state.user);

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
        planType: selectedPlan.type,
        dealershipName,
        tagline,
        role: "dealer",
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
    <div className="font-sans bg-gradient-to-tr from-[#f00] to-[#ff7e7e] z-[10000] absolute top-0 h-fit w-full sm:overflow-hidden">
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
        <div className="w-full py-8 px-8">
          {/* Plan Details */}
          <div className="text-center font-semibold">
            {/* Title */}
            <h1 className="text-2xl font-bold">
              <span className="text-white tracking-wide">Dealer </span>
              <span className="text-white">Plans</span>
            </h1>
          </div>
          <div className="tab w-full max-w-2xl mx-auto h-[40px] mt-8 gap-2 flex">
            <button
              className={`h-full flex flex-1 justify-center font-bold items-center px-4 py-2 rounded-full ${
                selectedPlandis === "Silver"
                  ? "bg-[#fff] text-lg text-black transition-all duration-100 scale-105"
                  : "bg-[#ffbcbc37] text-white"
              }`}
              onClick={() => handlePlanSelectiondis("Silver")}
            >
              Silver
            </button>
            <button
              className={`h-full flex flex-1 justify-center font-bold items-center px-4 py-2 rounded-full ${
                selectedPlandis === "Premium"
                  ? "text-[#000000] text-lg bg-[#fff] transition-all duration-100  scale-105"
                  : "bg-[#ffbcbc37] text-white"
              }`}
              onClick={() => handlePlanSelectiondis("Premium")}
            >
              Premium
            </button>
            <button
              className={`h-full flex flex-1 justify-center font-bold items-center px-4 py-2 rounded-full ${
                selectedPlandis === "Platinum"
                  ? "bg-[#fff] text-lg text-black transition-all duration-100 scale-105"
                  : "bg-[#ffbcbc37] text-white"
              }`}
              onClick={() => handlePlanSelectiondis("Platinum")}
            >
              Platinum
            </button>
          </div>
          {/* Plan Cards */}
          <div className=" pt-24 w-full flex flex-row sm:flex-col sm:gap-[10px] justify-center">
            {/* Silver Package */}
            {selectedPlandis === "Silver" && (
              <div className="w-full flex justify-center">
                <div className="md:w-full w-[60%] border-[1px] border-[#ffffff7d] md:border-0 rounded-xl p-8 scale-125 md:scale-1 flex gap-8 md:gap-0 md:flex-col self-center text-center overflow-x-hidden">
                  <div className="flex-1">
                    <div className="icon">
                      <img
                        src="/Images/planSilver.png"
                        alt=""
                        className="w-[150px] mx-auto"
                        loading="lazy"
                      />
                      <div className="card-offer w-full gap-4 rounded-2xl bg-[#f36c6c63] p-4 flex justify-center items-center">
                        <div className="right rounded-2xl items-center py-1 px-2 bg-[#f68d24]">
                          <p className="text-white text-2xl font-semibold">
                            50% Extra
                          </p>
                        </div>
                        <div className="left items-center py-1 px-2 flex flex-col">
                          <p className="text-[#ffffffb9] text-xs">
                            SPECIAL OFFER ENDS ON
                          </p>
                          <p className="text-white text-xs">
                            July 14th, 2023 at 23:59
                          </p>
                        </div>
                      </div>
                    </div>

                    <h1 className="text-white font-bold text-3xl py-4">
                      Silver - Monthly
                    </h1>
                    <p className="pt-2 tracking-wide">
                      <span className="text-3xl font-semibold text-white">
                        ₹{" "}
                      </span>
                      <span className="text-3xl font-semibold text-white">
                        5,999
                      </span>
                      <span className="text-xl font-semibold text-[#dadada]">
                        {" "}
                        / user
                      </span>
                    </p>
                    {/* Features */}
                    <hr className="mt-4 hidden md:flex border-1" />
                  </div>
                  <div className="pt-24 flex flex-1 flex-col gap-2">
                    <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                      <span className="material-icons align-middle">
                        Credit
                      </span>
                      <span className="pl-2">50 Ads</span>
                    </p>
                    <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                      <span className="material-icons align-middle">
                        Duration
                      </span>
                      <span className="pl-2 flex gap-4">
                        <span className="line-through text-[#ffffffa5]">
                          30 days
                        </span>
                        <span className="">45 days</span>
                      </span>
                    </p>
                    <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                      <span className="material-icons align-middle">
                        Location
                      </span>
                      <span className="pl-2">Single location</span>
                    </p>
                    <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                      <span className="material-icons align-middle">
                        Verification
                      </span>
                      <span className="pl-2 flex gap-2 text-black bg-white pr-2 py-1 rounded-lg">
                        Blue Tick{" "}
                        <img src="/Images/blue_tick.png" className="w-6" />
                      </span>
                    </p>
                    {/* Choose Plan Button */}
                    <button
                      className="w-full py-4 relative flex gap-1 justify-center align-middle bg-[#fff] font-semibold mt-8 rounded-xl text-[#ee3131]"
                      onClick={() =>
                        handlePlanSelection({
                          name: "Silver",
                          price: "5,999",
                          duration: 45,
                          credits: 50,
                          description: "Single location",
                          type: "Silver",
                        })
                      }
                    >
                      <span className="">Choose Plan</span>
                      <span className="pl-2 my-auto scale-[1.2] material-icons align-middle text-sm">
                        <AiOutlineArrowRight />
                      </span>
                    </button>
                  </div>

                  {/* Popular Tag */}
                </div>
                <div className="absolute top-4 right-4">
                  <p className="bg-[#fff] text-black font-semibold px-4 py-1 rounded-full uppercase text-xs">
                    Popular
                  </p>
                </div>
              </div>
            )}

            {/* Premium Package */}
            {selectedPlandis === "Premium" && (
              <div className="md:w-full w-[60%] border-[1px] border-[#ffffff7d] md:border-0 rounded-xl p-8 scale-125 md:scale-1 flex gap-8 md:gap-0 md:flex-col self-center text-center overflow-x-hidden">
                <div className="flex-1 items-center justify-center flex flex-col">
                  <div className="icon">
                    <img
                      src="/Images/planGold.png"
                      alt=""
                      className="w-[200px] mx-auto"
                      loading="lazy"
                    />
                  </div>
                  <h1 className="text-white font-bold text-3xl py-4">
                    Premium - Monthly
                  </h1>
                  <p className="pt-2 tracking-wide">
                    <span className="text-3xl font-semibold text-white">
                      ₹{" "}
                    </span>
                    <span className="text-3xl font-semibold text-white">
                      8,999
                    </span>
                    <span className="text-xl font-semibold text-[#dadada]">
                      {" "}
                      / user
                    </span>
                  </p>
                  {/* Features */}
                  <hr className="mt-4 border-1" />
                </div>
                <div className="pt-8 flex-1 flex flex-col gap-2">
                  <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">Credit</span>
                    <span className="pl-2">60 Ads</span>
                  </p>
                  <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Duration
                    </span>
                    <span className="pl-2 flex gap-4">
                      <span className="">45 days</span>
                    </span>
                  </p>
                  <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Location
                    </span>
                    <span className="pl-2">Single location</span>
                  </p>
                  <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Verification
                    </span>
                    <span className="pl-2 flex gap-2 text-black bg-white pr-2 py-1 rounded-lg">
                      Blue Tick{" "}
                      <img src="/Images/blue_tick.png" className="w-6" />
                    </span>
                  </p>
                  <p className="font-semibold flex justify-center px-4 mt-2 bg-[#f27f7f6e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Store Branding & PR
                    </span>
                  </p>
                  <p className="font-semibold flex justify-center px-4 bg-[#f27f7f6e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Inventory shoot
                    </span>
                  </p>
                  {/* Choose Plan Button */}
                  <button
                    className="w-full py-4 flex gap-1 justify-center align-middle bg-[#fff] font-semibold mt-8 rounded-xl text-[#ee3131]"
                    onClick={() =>
                      handlePlanSelection({
                        name: "Premium",
                        price: "8,999",
                        duration: 30,
                        credits: 60,
                        description:
                          "Single location, Store Branding & PR, Inventory shoot",
                        type: "Premium",
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
            )}

            {/* Platinum Package */}
            {selectedPlandis === "Platinum" && (
              <div className="md:w-full w-[60%] border-[1px] border-[#ffffff7d] md:border-0 rounded-xl p-8 scale-125 md:scale-1 flex gap-8 md:gap-0 md:flex-col self-center text-center overflow-x-hidden">
                <div className="flex-1 items-center justify-center flex flex-col">
                  <div className="icon">
                    <img
                      src="/Images/planPlatinum.png"
                      alt=""
                      className="w-[200px] mx-auto"
                      loading="lazy"
                    />
                  </div>
                  <h1 className="text-white font-bold text-3xl py-4">
                    Platinum - 3 Months
                  </h1>
                  <p className="pt-2 tracking-wide">
                    <span className="text-3xl font-semibold text-white">
                      ₹{" "}
                    </span>
                    <span className="text-3xl font-semibold text-white">
                      12,999
                    </span>
                    <span className="text-xl font-semibold text-[#dadada]">
                      {" "}
                      / user
                    </span>
                  </p>
                  {/* Features */}
                  <hr className="mt-4 border-1" />
                </div>
                <div className="pt-8 flex-1 flex flex-col gap-2">
                  <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">Credit</span>
                    <span className="pl-2">60 Ads</span>
                  </p>
                  <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Duration
                    </span>
                    <span className="pl-2 flex gap-4">
                      <span className="">45 days</span>
                    </span>
                  </p>
                  <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Location
                    </span>
                    <span className="pl-2">Single location</span>
                  </p>
                  <p className="font-semibold flex justify-between px-4 bg-[#f27f7f4e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Verification
                    </span>
                    <span className="pl-2 flex gap-2 text-black bg-white pr-2 py-1 rounded-lg">
                      Blue Tick{" "}
                      <img src="/Images/blue_tick.png" className="w-6" />
                    </span>
                  </p>
                  <p className="font-semibold flex justify-center px-4 mt-2 bg-[#f27f7f6e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Store Branding & PR
                    </span>
                  </p>
                  <p className="font-semibold flex justify-center px-4 bg-[#f27f7f6e] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      Inventory shoot
                    </span>
                  </p>
                  <p className="font-semibold flex justify-center mt-2 px-4 bg-[#f27f7f9b] items-center rounded-lg text-white py-2">
                    <span className="material-icons align-middle">
                      CRM Support
                    </span>
                  </p>
                  {/* Choose Plan Button */}
                  <button
                    className="w-full flex gap-1 justify-center align-middle py-4 bg-[#fff] mt-8 rounded-xl text-[#ee3131] font-semibold"
                    onClick={() =>
                      handlePlanSelection({
                        name: "Platinum",
                        price: "12,999",
                        duration: 90,
                        credits: 60,
                        description:
                          "Single location, Store Branding & PR, Inventory shoot, CRM support",
                        type: "Platinum",
                      })
                    }
                  >
                    <span className="">Choose Plan</span>
                    <span className="pl-2 material-icons my-auto scale-[1.2] text-sm">
                      <AiOutlineArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmationOpen}
        
        onRequestClose={() => setIsConfirmationOpen(false)}
        className="modal absolute z-[100002] bg-[#110c2f] w-[500px] sm:w-[400px] h-[500px] p-8 justify-center flex flex-col rounded-lg shadow-lg overflow-hidden"
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
          <input
            id="dealershipName"
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-lg w-full"
            placeholder="Dealership Name"
            value={dealershipName}
            onChange={(e) => setDealershipName(e.target.value)}
          />
          <input

            id="tagline"
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-lg w-full"
            placeholder="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
          <div className="">
            <input
              id="location"
              type="text"
              className="border border-gray-300 px-3 py-2 rounded-lg w-full"
              placeholder="City"
              value={city}
              onChange={handleLocationChange} // Remove the () from handleLocationChange
              onFocus={() => filterCities(locationValue)}
            />
          </div>
          {filteredCities.length > 0 && (
            <ul className="mt-2 max-h-52 absolute top-[345px] overflow-y-auto bg-white shadow rounded-md">
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

export default DealerSubscription;

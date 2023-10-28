import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import Modal from "react-modal";

// Components, APIs, utils
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import NumberWithCommas from "../PriceSeperator";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getCarDetails,
  deleteCar,
  approvePendingCar, // Import the action
} from "../../actions/carAction";

// Styles, Icons
import "../../styles/carDetail.scss";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { VscSymbolColor } from "react-icons/vsc";
import { IoCarSportOutline } from "react-icons/io5";
import { TfiBriefcase } from "react-icons/tfi";
import { BsCalendar2Check } from "react-icons/bs";
import { BsBuilding } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { ImLocation } from "react-icons/im";

const ApproveCar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { id } = useParams();
  const { car, loading, error } = useSelector((state) => state.carDetails);
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  
  const handleDeleteCar = async () => {
    try {
      setIsDeleting(true);
      const response = await dispatch(deleteCar(id));
      if (response && response.success) {
        alert.success("Car deleted successfully");
        history.push("/admin/cars/pending");
      } else {
        const errorMessage =
          response && response.data && response.data.message
          ? response.data.message
          : "Error deleting car";
          alert.error(errorMessage);
        }
      } catch (error) {
        alert.error(error.message);
      } finally {
        setIsDeleting(false);
        setIsConfirmationOpen(false);
      }
    };
    
    
    const handleConfirmationOpen = () => {
      setIsConfirmationOpen(true); // Open the confirmation modal
    };
    
    const handleConfirmationClose = () => {
      setIsConfirmationOpen(false); // Close the confirmation modal
    };
    
    useEffect(() => {
      let isMounted = true;
      
      const fetchCarDetails = async () => {
        try {
          if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
          
          const response = await dispatch(getCarDetails(id));
          
          if (isMounted) {
            // Perform actions only if the component is still mounted
            if (response && response.success) {
              setIsButtonDisabled(false);
            }
          }
        } catch (error) {
          alert.error(error.message);
        }
      };
      
      fetchCarDetails();
      return () => {
        // Cleanup function to cancel any ongoing tasks
        isMounted = false;
      };
    }, [dispatch, id, error, alert]);
    
    
    
    const handleApprove = async () => {
    setIsButtonDisabled(true);
    try {
      await dispatch(approvePendingCar(id));
      alert.success('Car approved successfully!');
      history.push('/cars');
    } catch (error) {
      alert.error(error.message);
    } finally {
      setIsButtonDisabled(false);
    }
  };
  
  

  const seller = car?.user;

  return (
    <div className="carName">
      <main className="carDetail__mainContainer sm:overflow-hidden flex sm:flex-col gap-10 sm:gap-0 my-[50px] sm:my-2 w-[1220px] sm:w-[100vw] mx-auto  ">
        <div className="left w-[800px] sm:w-full text-justify flex flex-col justify-center gap-8 sm:gap-0">
          <div className="carousel w-full h-[372px] xs:h-[200px] sm:h-[230px] bg-[#eae9e9] rounded-2xl">
            <Carousel className="h-[372px] xs:h-[200px] sm:h-[230px] rounded-2xl">
              {car.image &&
                car.image.map((item, i) => (
                  <div
                    key={item.url}
                    className="carousel-image-container flex justify-center items-center h-full"
                  >
                  <img
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                    className="CarouselImage h-[372px] xs:h-[200px] sm:h-[230px] max-w-full object-contain"
                  /></div>
                ))}
            </Carousel>
          </div>

          <div className="detail w-full object-contain flex flex-col gap-4 sm:gap-2  p-8 sm:p-1 rounded-2xl sm:mt-6 sm:px-4">
            <MetaData
              title={`${car.make} ${car.model} ${car.varient} ${car.year}`}
            />

            <div className="flex justify-between items-center">
              <h2 className="text-3xl sm:text-base font-medium">
                {car.make}
                {` `}
                {car.model}
                {` `}
                {car.year}
              </h2>
            </div>
            <p className="text-xl sm:text-base">{car.varient}</p>
            <span className="text-xl sm:my-4 sm:text-sm uppercase text-[#666] flex">
              <span className="flex gap-2 mr-2 justify-center items-center">
                <FaGasPump /> {car.fuel} {` | `}
              </span>
              <span className="flex gap-2 mr-2 justify-center items-center">
                <SlSpeedometer /> {car.Km_Driven}km{` | `}
              </span>
              <span className="flex gap-2 mr-2 justify-center items-center">
                <GiGearStickPattern />
                {car.transmission}
              </span>
            </span>
            <div className=" hidden mb-4 sm:flex price w-full flex-col justify-start items-center gap-8 rounded-2xl p-8 mt-2">
              <span className="text-3xl text-[#002f34] font-bold">
                ₹ {NumberWithCommas(`${car.price}`)}
              </span>
            </div>
          </div>

          <div className="carDetail_carOverview w-full h-[372px] sm:h-[500px] flex flex-col gap-4 p-8 sm:p-2 rounded-2xl">
            <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Overview</h2>
            {/* <hr /> */}
            <ul className="flex gap-8 sm:gap-6 sm:ml-4 sm:text-sm w-[100%] flex-wrap sm:pr-12">
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <IoCarSportOutline />
                      </span>
                      Model{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.model}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <TfiBriefcase />
                      </span>
                      Brand{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.make}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <BsCalendar2Check />
                      </span>
                      Year{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.year}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <SlSpeedometer />
                      </span>
                      Km Driven{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.Km_Driven}km
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <BsBuilding />
                      </span>
                      RTO{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.RTO}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <GiGearStickPattern />
                      </span>
                      Transmission{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.transmission}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center text-[#999]">
                        <FaGasPump />
                      </span>
                      Fuel{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.fuel}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center text-[#999]">
                        <IoPersonCircleOutline className="scale-[1.2]" />
                      </span>
                      Ownership{" "}
                    </span>
                    <span className="w-[35%] sm:w-[30%] text-right font-semibold label-content">
                    {car.no_of_owners === 1 && "First Owner"}
                      {car.no_of_owners === '1' && "First Owner"}
                      {car.no_of_owners === 2 && "Second Owner"}
                      {car.no_of_owners === '2' && "Second Owner"}
                      {car.no_of_owners === 3 && "Third Owner"}
                      {car.no_of_owners === '3' && "Third Owner"}
                      {car.no_of_owners === 4 && "Fourth Owner"}
                      {car.no_of_owners === '4'&& "Fourth Owner"}
                      {car.no_of_owners === '4+' && "4+ Owner"}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <VscSymbolColor />
                      </span>
                      Color{" "}
                    </span>
                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.color}
                    </span>
                  </li>
                  <li className="flex gap-4 items-center justify-evenly">
                    <span className="w-[55%] font-medium flex gap-4 overview-label">
                      <span className=" font-semibold self-center">
                        <BiCategory />
                      </span>
                      Category{" "}
                    </span>

                    <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                      {car.category}
                    </span>
                  </li>
                </ul>
          </div>

          
          <div className="carDescription w-full h-fit sm:h-fit flex flex-col gap-4 p-8 sm:px-2 rounded-2xl">
            <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Description</h2>
            {/* <hr /> */}
            <p className="sm:px-4">{car.description}</p>
          </div>
        </div>

        <div className="right price sm:h-fit sm:my-8 sm:w-full sm:p-1 h-fit w-[480px] p-8 flex gap-4 flex-col">
          <h2 className="font-semibold text-lg sm:my-4 sm:p-4">Car Verification</h2>
          {isButtonDisabled ? (
          <Loader />
        ) : (
          <button
            className="btn bg-[#ee3131] text-white font-semibold text-lg p-4"
            onClick={handleApprove}
            disabled={isButtonDisabled}
          >
            Approve Car
          </button>
        )}
        <button
            className="updateCar w-full h-[50px] sm:h-[50px] bg-[#002f34] text-white rounded-xl font-semibold text-xl sm:text-base"
            onClick={handleConfirmationOpen}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Car"}
          </button>

          {/* Confirmation Modal */}
          <Modal
            isOpen={isConfirmationOpen}
            onRequestClose={handleConfirmationClose}
            contentLabel="Confirmation Modal"
            className="modal absolute bg-white w-[400px] h-[200px] p-8 justify-center flex flex-col rounded-lg shadow-lg overflow-hidden"
            overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <h2 className="modal-title text-2xl self-center font-bold mb-4">
              Confirm Deletion
            </h2>
            <p className="modal-message text-lg text-center mb-8">
              Are you sure you want to delete this car? This action is
              irreversible.
            </p>
            <div className="modal-buttons self-center flex justify-end">
              <button
                className="modal-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
                onClick={handleConfirmationClose}
              >
                Cancel
              </button>
              <button
                className="modal-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleDeleteCar}
              >
                Delete Car
              </button>
            </div>
          </Modal>


          <div className="price sm:hidden w-full flex flex-col justify-start items-center gap-8 rounded-2xl p-8">
            <span className="text-[45px] text-[#002f34] font-bold">
              ₹ {NumberWithCommas(`${car.price}`)}
            </span>
          </div>
          {
            seller && (
              <Link to={`/sellerCar/${seller && seller._id}`} className="sm:px-6">
              <div className="seller_Detai border-[1px] shadow-lg shadow-[#7f7f7f3e] w-full h-[360px] sm:pb-[60px] flex flex-col gap-2 rounded-2xl">
                <div className="top-div w-full overflow-hidden h-[139px]">
                  <span className="seller-title text-sm m-2 py-1 px-4 rounded-2xl bg-[#ffffff60] font-semibold absolute text-white z-10">
                    SELLER DETAILS
                  </span>
                  <img src={car.image && car.image[0].url} alt={car.name} />
                  <div className="overlay bg-black opacity-40"></div>
                </div>

                <div className="bottom-div relative top-[-73px] p-8 w-full h-[50%] flex flex-col gap-4">
                  {/* seller image  */}
                  <div className="seller-img scale-[1.2] w-full h-[50%] flex justify-center items-center">
                    {seller && seller.avatar.length > 0 && (
                      <img
                        src={seller.avatar[0].url}
                        alt={seller.name}
                        className="w-[100px] avatar-image h-[100px] rounded-full border-white border-[5px]"
                        onError={(e) => {
                          e.target.onerror = null; // prevent infinite loop
                          e.target.src = "/Images/man.webp"; // fallback image
                          e.target.alt = "Default Avatar"; // fallback alt text
                        }}
                      />
                    )}
                  </div>
                  <div className="seller-name w-full h-[50%] flex flex-col gap-0">
                    {/* seller name  */}
                    <h3 className="text-2xl items-center flex gap-2 font-bold place-self-center capitalize pt-6 pb-1">
                      {seller && seller.name} {seller.role === "dealer" ||
                    seller.role === "broker" ||
                    seller.role === "superUser" ? (
                      <img
                        src="/Images/blue_tick.png"
                        alt={`Verified ${seller.role}`}
                        className="w-6 h-6"
                      />
                    ) : (
                      ""
                    )}
                    </h3>

                    {/* seller email  */}
                    <span className="text-base flex items-center text-[#ee3131] justify-center xs:text-[0.9rem] py-2 px-6 rounded-2xl bg-[#ffffff7c] font-medium">
                     <ImLocation /> {seller.city ? seller.city : car.city}
                    </span>

                    {seller.role === "dealer" || seller.role === "superUser" ? (
                    <h1 className=" font-semibold flex items-center justify-center text-[#28254d] text-sm">{seller.dealershipName}</h1>
                  ) : (
                    ""
                  )}
                  
                      {seller.role === "dealer" || seller.role === "superUser" ? (
                        <h1 className=" font-semibold text-center py-2 text-[#000000] text-lg">{seller.tagline}</h1>
                      ) : (
                        ""
                      )}
                    <small className="text-sm pt-2 px-6 rounded-2xl bg-[#ffffff8c] font-normal text-center">
                      Posted on :{" "}
                      {new Date(car.createdAt)
                        .toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/(\d+)(?:st|nd|rd|th)/, "$1$2") ||
                        "DD/MM/YYYY"}
                    </small>

                  </div>
                </div>
              </div>
            </Link>
            )
          }
        </div>
      </main>
    </div>
  );
};

export default ApproveCar;

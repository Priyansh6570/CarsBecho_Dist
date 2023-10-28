import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCar, clearErrors } from "../../actions/carAction";
import { FaGasPump, FaRegImages } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { loadUser } from "../../actions/userAction";
import { SlSpeedometer } from "react-icons/sl";
import MetaData from "../Layout/MetaData";
import NumberWithCommas from "../PriceSeperator";
import Carousel from "react-material-ui-carousel";
import { NEW_CAR_RESET } from "../../constants/carConstants";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { IoPersonCircleOutline } from "react-icons/io5";
import { VscSymbolColor } from "react-icons/vsc";
import { BiCategory } from "react-icons/bi";
import { IoCarSportOutline } from "react-icons/io5";
import { TfiBriefcase } from "react-icons/tfi";
import { BsCalendar2Check } from "react-icons/bs";
import { BsBuilding } from "react-icons/bs";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { citiesData } from "../cities.js";

const categories = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Convertible",
  "Coupe",
  "Premium",
  "Supercar",
];

const bodyTypes = {
  SUV: "/Cars/suv.png",
  Sedan: "/Cars/sedan.png",
  Hatchback: "/Cars/hatchback.png",
  Convertible: "/Cars/convertible.png",
  Coupe: "/Cars/coupe.png",
  Premium: "/Cars/premium.png",
  Supercar: "/Cars/supercar.png",
};

const fuelTypes = ["Petrol", "Diesel", "CNG", "LPG", "Electric"];

const transmissionTypes = ["Manual", "Automatic"];

const carBrands = {
  car_brands: [
    "Abarth",
    "Alfa Romeo",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Chevrolet",
    "Chrysler",
    "Citroen",
    "Datsun",
    "Ferrari",
    "Force Motors",
    "Ford",
    "Honda",
    "Hyundai",
    "Isuzu",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Mahindra",
    "Maruti Suzuki",
    "Maserati",
    "Mercedes-Benz",
    "MG",
    "Nissan",
    "Porsche",
    "Renault",
    "Tata Motors",
    "Toyota",
    "Volvo",
    "Ashok Leyland",
    "Aston Martin",
    "Bajaj",
    "Brilliance",
    "Cadillac",
    "Daewoo",
    "Daihatsu",
    "Daimler",
    "Dongfeng",
    "Eicher",
    "Eicher Polaris",
    "Foton",
    "Fuso",
    "GAC",
    "Geely",
    "GMC",
    "Great Wall",
    "Haima",
    "Haval",
    "Hindustan Motors",
    "ICML",
    "Iveco",
    "JAC",
    "Kinetik",
    "Lada",
    "Lancia",
    "Leyland",
    "Mahindra Electric",
    "MAN",
    "McLaren",
    "Merkel",
    "Mitsubishi Fuso",
    "Polaris",
    "Ravon",
    "Roewe",
    "Scion",
    "Senova",
    "Suzuki",
    "Tata Daewoo",
    "UD",
    "Ural",
    "VinFast",
    "Yutong",
    "Zotye",
    "Ampere",
    "Avan",
    "BGauss",
    "Benling",
    "Hero Electric",
    "Jawa Electric",
    "Kabira Mobility",
    "Komaki",
    "Li-ions Elektrik",
    "Odysse Electric",
    "Okaya",
    "One Electric",
    "Okinawa",
    "Pure EV",
    "Revolt",
    "Techo Electra",
    "Tron Motors",
    "Tunwal",
    "Ultraviolette",
    "Aira",
    "Altigreen",
    "Ankush",
    "Auto Electro",
    "AYO",
    "BattRE Electric",
    "Bhalla",
    "Calbom",
    "Celerra",
    "Celite",
    "Cellestial",
    "Ceva",
    "Devot Motors",
    "Dhas",
    "Evolet",
    "Fame Electric",
    "Gemopai",
    "Greenvolt",
    "Infraprime",
    "Joy E-Bike",
    "Karpowership",
    "Kinetic Green",
    "Lohia Auto",
    "M2GO",
    "Meera",
    "Menza Motors",
    "NDS Eco Motors",
    "Prana",
    "Skyline",
    "Spero",
    "Spice Electric",
    "Tara International",
    "UL",
    "Ultra Motion",
    "Velev Motors",
    "Yadea",
    "Yo Bykes",
    "Yukie",
    "Zip",
    "3M",
    "4X4 Motors",
    "ABT",
    "Acura",
    "Adler",
    "AEC",
    "AIM Motorsport",
    "Airbus",
    "Airstream",
    "Alta",
    "Amber",
    "AME",
    "American",
    "AMG",
    "Apal",
    "Ariel",
    "ARO",
    "Artega",
    "Ascari",
    "Asia Motors",
    "Aspid",
    "Aston Martin Racing",
    "ATK",
    "Audi Sport",
    "Austin",
    "Austin-Healey",
    "Autobianchi",
    "Autosan",
    "Auverland",
    "Avia",
    "Bajaj-Tempo",
    "Balaton",
    "Beijing",
    "Beijing Automotive",
    "Beijing Hyundai",
    "Beijing Jeep",
    "Beijing-Benz",
    "Bell Aurens",
    "Bentley Mulliner",
    "Bering",
    "Bernard",
    "Bertrandt",
    "Bertone",
    "Blonell",
    "Blue Bird",
    "BMW Alpina",
    "Bolloré",
    "Bowler",
    "Brabus",
    "Bradley",
    "Bricklin",
    "Bristol",
    "British Leyland",
    "Bronto",
    "Bufori",
    "Bugatti Automobiles",
    "Buick",
    "BYD",
    "BYD Daimler",
    "Callaway",
    "Campagna",
    "Caparo",
    "CARBODIES",
    "Carbontech",
    "Caterham",
    "Chana",
    "Chery",
    "Cisitalia",
    "Citroën",
    "Cizeta",
    "Cobretti",
    "Connaught",
    "Covini",
    "Crosley",
    "Cupra",
    "Dacia",
    "DAF",
    "Dartz",
    "Dauer",
    "De Lorean",
    "De Tomaso",
    "Delage",
    "Delahaye",
    "Delta",
    "Denza",
    "Derways",
    "DeSoto",
    "Detro-T",
    "Devon Motor Works",
    "Dodge",
    "Dongfeng Fengshen",
    "Dongfeng Sokon",
    "Duesenberg",
    "DuraCar",
    "Eagle",
    "Eagle Cars",
    "Elfin",
    "Englon",
    "Enigma",
    "Etios",
    "Eunos",
    "FAW",
    "Fiat",
    "Fioravanti",
    "Fisker",
    "Fleetwood",
    "FPV",
    "FSO",
    "Fuqi",
    "GAC Changfeng",
    "GAC Gonow",
    "Gac Gonow",
    "Gaz",
    "General Motors",
    "Genesis",
    "Geo",
    "Gilbern",
    "Gillet",
    "Ginetta",
    "Gonow",
    "Gordon Murray",
    "Graham-Paige",
    "Grinnall",
    "Groz",
    "Gumpert",
    "Hanomag",
    "Hawtai",
    "Healey",
    "Heinkel",
    "Hennessey",
    "Hindustan",
    "Holden",
    "Hommell",
    "Hongqi",
    "Horch",
    "Hotchkiss",
    "Hummer",
    "Hurtan",
    "Husqvarna",
    "Imperial",
    "Infiniti",
    "Innocenti",
    "International",
    "Intrepid",
    "Iran Khodro",
    "Isdera",
    "Izh",
    "Jannarelly",
    "Jensen",
    "Jensen-Healey",
    "Jetcar",
    "Jiangling",
    "Jiangnan",
    "Jinbei",
    "Joss",
    "Joylong",
    "Karosa",
    "Koenigsegg",
    "KTM",
    "Kurashiki Kako",
    "Lagonda",
    "Laraki",
    "Li Nian",
    "Lifan",
    "Lightning",
    "Lincoln",
    "Lloyd",
    "Lobini",
    "Lotec",
    "Lotus",
    "Luxgen",
    "Marcos",
    "Marlin",
    "Matra",
    "Maybach",
    "Mazda",
    "MCLaren",
    "Melkus",
    "Mercury",
    "Micro",
    "Mini",
    "Mitsubishi",
    "Mitsuoka",
    "Morgan",
    "Morris",
    "Moskvitch",
    "Noble",
    "Nysa",
    "Oldsmobile",
    "Opel",
    "Orca",
    "Osca",
    "Packard",
    "Pagani",
    "Panoz",
    "Panther",
    "Peugeot",
    "PGO",
    "Piaggio",
    "Pininfarina",
    "Plymouth",
    "Polarsun",
    "Pontiac",
    "Portaro",
    "Proton",
    "Puma",
    "Puritalia",
    "Qiantu",
    "Qoros",
    "Quant",
    "Quattro",
    "Radical",
    "Reliant",
    "Reva",
    "Riley",
    "Rolls-Royce",
    "Rover",
    "Ruf",
    "Saab",
    "Saipa",
    "Saleen",
    "Samsung",
    "Santana",
    "Scania",
    "SEAT",
    "Shelby",
    "Shuanghuan",
    "Simca",
    "Singer",
    "Skoda",
    "Smart",
    "Sokon",
    "Somua",
    "Spyker",
    "SsangYong",
    "Standard",
    "Stanguellini",
    "Steyr",
    "Studebaker",
    "Subaru",
    "Sunbeam",
    "SWM",
    "Syrena",
    "Talbot",
    "TAM",
    "Tata",
    "Tatra",
    "TD Cars",
    "Tesla",
    "Thunder Power",
    "Tiger",
    "Tofaş",
    "Toniq",
    "Trabant",
    "Tramontana",
    "Troller",
    "Trucks",
    "TVR",
    "Ultima",
    "UVA",
    "Vandenbrink",
    "Vauxhall",
    "Vector",
    "Venturi",
    "Vespa",
    "Volkswagen",
    "Wallyscar",
    "Wartburg",
    "Westfield",
    "Wiesmann",
    "Willam",
    "Willys",
    "Wuling",
    "Xin Kai",
    "Yamaha",
    "Yuejin",
    "Yulon",
    "Zagato",
    "Zaporožec",
    "Zastava",
    "ZAZ",
    "Zhonghua",
    "ZiL",
    "Zimmer",
    "Zundapp",
  ],
};
const years = Array.from(
  { length: new Date().getFullYear() - 1989 },
  (_, index) => (new Date().getFullYear() - index).toString()
);
const NewCar = () => {
  const history = useHistory();
  const alert = useAlert();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    varient: "",
    year: "",
    Km_Driven: "",
    showMobile: false,
    fuel: "",
    transmission: "",
    color: "",
    no_of_owners: "",
    RTO: "",
    city: "",
    price: "",
    description: "",
    image: [],
    category: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newCar);

  const user = useSelector((state) => state.user);
  const { id } = user;

  const handleBrandChange = (event, value) => {
    setFormData({
      ...formData,
      make: value,
    });
  };
  const handleFuelSelection = (selectedFuel) => {
    setFormData({ ...formData, fuel: selectedFuel });
  };
  const handleTransmissionSelection = (selectedTransmission) => {
    setFormData({ ...formData, transmission: selectedTransmission });
  };
  const handleYearChange = (event, value) => {
    setFormData({ ...formData, year: value });
  };
  const handleImageClick = (image) => {
    const selectedImageIndex = formData.image.findIndex(
      (img) => img.url === image.url
    );
    const updatedImages = [...formData.image];

    // Remove the selected image from its current position
    updatedImages.splice(selectedImageIndex, 1);

    // Insert the selected image at the beginning of the array
    updatedImages.unshift(image);

    setFormData({ ...formData, image: updatedImages });
  };

  const filterOptions = (options, { inputValue }) => {
    const input = inputValue.toLowerCase();

    return options.filter((option) => option.toLowerCase().includes(input));
  };
  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isBelowMinimum = value < 1;
    const isbelowPrice = value < 10000;
    if (name === "RTO" && value !== "") {
      const regex = /^[A-Za-z]{0,2}\d{0,2}$/;

      if (!regex.test(value)) {
        return; // Exit early if the input value doesn't match the format
      }
    }
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCityChange = (event, value) => {
    setFormData({
      ...formData,
      city: value,
    });
  };
  const handleOwnerSelection = (selectedOwner) => {
    setFormData({ ...formData, no_of_owners: selectedOwner });
  };
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyConditions = () => {
    let isFormValid = true; // Initialize form validity variable

    // Check if any input field is empty, excluding city
    for (const key in formData) {
      if (
        key !== "city" &&
        (formData[key] === "" ||
          (key === "image" && formData[key].length === 0))
      ) {
        if (key === "image") {
          alert.error("Please select an image");
        } else {
          alert.error(`Please fill the ${key} field`);
        }
        isFormValid = false; // Set form validity to false
      }
    }

    // Check if category is selected
    if (formData.category === "All" || !formData.category) {
      alert.error("Please select Category");
      isFormValid = false; // Set form validity to false
    }

    // Check if fuel is selected
    if (formData.fuel === "All" || !formData.fuel) {
      alert.error("Please select Fuel");
      isFormValid = false; // Set form validity to false
    }

    // Check if transmission is selected
    if (formData.transmission === "All" || !formData.transmission) {
      alert.error("Please select Transmission");
      isFormValid = false; // Set form validity to false
    }

    if (isFormValid) {
      setIsVerified(true); // Set verification status to true
    } else {
      setIsVerified(false); // Set verification status to false
    }
  };
  const handleShowMobileToggle = () => {
    setFormData({ ...formData, showMobile: !formData.showMobile });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageArray = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          imageArray.push({ public_id: Date.now(), url: reader.result });
          setFormData({ ...formData, image: imageArray });
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsAdding(true);

    // Set the city value
    const cityValue = user.user.city || formData.city;

    // Update the city value in the formData
    const updatedFormData = { ...formData, city: cityValue };

    try {
      const userId = user.user._id;
      await dispatch(createCar(userId, updatedFormData));
      history.push("/");
      dispatch(loadUser());
      alert.success("Car Sent for Approval");
      window.location.reload();
    } catch (error) {
      alert.error("Something went wrong, please try again later");
      console.log(error);
    } finally {
      setIsAdding(false);
      dispatch({ type: NEW_CAR_RESET });
    }
  };

  return (
    <div className="flex sm:flex-col-reverse p-8 bg-white sm:p-1">
      {user.user.role === "user" && user.user.credit === 1 ? (
        <h1 className="text-gray-600 absolute top-[130px] z-10 bg-yellow-200 rounded py-4 sm:py-8 sm:w-[90%] sm:px-2 text-center w-[70%] left-[50%] translate-x-[-50%]">
          You have only <strong>{user.user.credit} credit</strong>, use it
          wisely. Later you can buy more credits from your profile.
        </h1>
      ) : (
        <></>
      )}
      {user.user.credit > 0 ||
      user.user.role === "admin" ||
      user.user.role === "superUser" ? (
        <>
          <div className="w-1/2 p-6 sm:hidden flex flex-col gap-4">
            <div className="main w-[90%] sm:w-full bg-[url('/Images/user-action-bg.jpg')] bg-cover  mx-auto m-8 sm:m-0 sm:mb-8 h-[200px] sm:h-[80px] rounded-2xl ">
              <h2 className="text-[30px] w-full text-center xs:top-[0rem] xs:text-black sm:top-[1.4rem] font-sans font-bold relative top-9 pt-8 justify-center flex">
                Detail Preview
              </h2>
            </div>

            <div className="left w-full sm:w-full text-justify flex flex-col justify-center gap-8 sm:gap-0">
              <div className="carousel w-full h-[372px] xs:h-[200px] sm:h-[230px] bg-slate-900 rounded-2xl">
                <Carousel className="h-[372px] xs:h-[200px] sm:h-[230px] rounded-2xl object-contain">
                  {formData.image &&
                    formData.image.map((item, i) => (
                      <div
                        key={item.url}
                        className="carousel-image-container flex justify-center items-center h-full"
                      >
                        <img
                          src={item.url}
                          alt={`${i} Slide`}
                          className="CarouselImage h-[372px] xs:h-[200px] sm:h-[230px]"
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            </div>

            <div className="detail w-full object-contain flex flex-col gap-4 sm:gap-2  p-8 sm:p-1 rounded-2xl sm:mt-6 sm:px-4">
              <MetaData title={`Sell Car`} />

              <div className="flex justify-between items-center">
                <h2 className="text-3xl sm:text-base font-medium">
                  {formData.make}
                  {` `}
                  {formData.model}
                  {` `}
                  {formData.year}
                </h2>
              </div>
              <p className="text-xl sm:text-base">{formData.varient}</p>
              <span className="text-xl sm:my-4 sm:text-sm uppercase text-[#666] flex">
                <span className="flex gap-2 mr-2 justify-center items-center">
                  <FaGasPump /> {formData.fuel} {` | `}
                </span>
                <span className="flex gap-2 mr-2 justify-center items-center">
                  <SlSpeedometer /> {formData.Km_Driven}km{` | `}
                </span>
                <span className="flex gap-2 mr-2 justify-center items-center">
                  <GiGearStickPattern />
                  {formData.transmission}
                </span>
              </span>
              <div className=" hidden mb-4 sm:flex price w-full flex-col justify-start items-center gap-8 rounded-2xl p-8 mt-2">
                <span className="text-3xl text-[#002f34] font-bold">
                  ₹ {NumberWithCommas(`${formData.price}`)}
                </span>
              </div>
            </div>

            <div className="carDetail_carOverview w-full h-[372px] sm:h-[500px] flex flex-col gap-4 p-8 sm:p-2 rounded-2xl">
              <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Overview</h2>

              <ul className="flex gap-8 sm:gap-6 sm:ml-4 sm:text-sm w-[100%] flex-wrap sm:pr-12">
                <li className="flex gap-4 items-center justify-evenly">
                  <span className="w-[55%] font-medium flex gap-4 overview-label">
                    <span className=" font-semibold self-center">
                      <IoCarSportOutline />
                    </span>
                    Model{" "}
                  </span>
                  <span className="w-[30%] text-right text-base sm:text-sm  lable-content">
                    {formData.model}
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
                    {formData.make}
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
                    {formData.year}
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
                    {formData.Km_Driven}km
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
                    {formData.RTO}
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
                    {formData.transmission}
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
                    {formData.fuel}
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
                    {formData.no_of_owners === 1 && "First Owner"}
                    {formData.no_of_owners === 2 && "Second Owner"}
                    {formData.no_of_owners === 3 && "Third Owner"}
                    {formData.no_of_owners === 4 && "Fourth Owner"}
                    {formData.no_of_owners === 5 && "Fifth Owner"}
                    {formData.no_of_owners === 6 && "Sixth Owner"}
                    {formData.no_of_owners === 7 && "Seventh Owner"}
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
                    {formData.color}
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
                    {formData.category}
                  </span>
                </li>
              </ul>
            </div>

            <div className="carDescription w-full h-fit sm:h-fit flex flex-col overflow-hidden gap-4 p-8 sm:px-2 rounded-2xl">
              <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">
                Description
              </h2>
              <hr className="p-4 w-full relative left-[0px]" />
              <div className="descriptionContainer sm:px-4">
                <p className="whitespace-normal">{formData.description}</p>
              </div>
            </div>

            <div className="price sm:hidden w-full flex flex-col justify-start items-center gap-8 rounded-2xl p-8">
              <span className="text-[45px] text-[#002f34] font-bold">
                ₹ {NumberWithCommas(`${formData.price}`)}
              </span>
            </div>
          </div>

          <div className="w-1/2 p-6 sm:w-full">
            <div className="main w-[90%] sm:w-full sm:shadow-sm sm:shadow-[#99999954] sm:bg-none bg-[url('/Images/bg-car-side.jpg')] bg-cover mx-auto m-8 sm:m-0 sm:mb-8 h-[200px] sm:h-[80px] rounded-2xl ">
              <h2 className="text-[30px] sm:text-2xl sm:font-semibold sm:top-0 w-full text-center xs:top-[0rem] xs:text-black font-sans font-bold relative top-9 pt-8 justify-center flex">
                Add New Car
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:w-full"
              encType="multipart/form-data"
            >
              {/* Form inputs for each field */}
              <div className="flex flex-col gap-1 py-2">
                <Autocomplete
                  disablePortal
                  id="make"
                  options={carBrands.car_brands}
                  value={formData.make}
                  onChange={handleBrandChange}
                  filterOptions={filterOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand"
                      required
                      className="w-full border font-semibold capitalize border-gray-300 rounded-md px-3 py-2"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="model" className="block font-semibold">
                  Model*
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full border capitalize border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="variant" className="block font-semibold">
                  Variant*
                </label>
                <input
                  type="text"
                  id="variant"
                  name="varient"
                  value={formData.varient}
                  onChange={handleChange}
                  required
                  className="w-full border capitalize border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="year" className="block font-semibold">
                  Year*
                </label>
                <Autocomplete
                  id="year"
                  name="year"
                  options={years}
                  value={formData.year}
                  onChange={handleYearChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{ ...params.inputProps, pattern: "[0-9]*" }}
                    />
                  )}
                  renderOption={(props, option) => <li {...props}>{option}</li>}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 py-2">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="images"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        and Click to choose Main Image
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG (MAX. 1920x1080px)
                      </p>
                    </div>
                    <input
                      id="images"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>

                <div
                  className={`h-fit border-dashed ${
                    formData.image[0] ? "border-black border-[1px]" : ""
                  }  rounded-b-xl border-t-0 flex justify-center flex-wrap gap-1 p-4 w-fit z-0`}
                >
                  {formData.image.map((image, index) => (
                    <div key={image.public_id} className="relative">
                      <img
                        src={image.url}
                        alt="Selected Image"
                        className={`object-cover w-[100px] ${
                          index === 0 ? "border-2 border-blue-500" : ""
                        }`}
                        onClick={() => handleImageClick(image)}
                      />
                      <div className="absolute top-1 right-1 bg-gray-800 text-white rounded-full px-1 text-xs">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                  <h2
                    className={`font-medium ${
                      formData.image[0] ? "flex" : "hidden"
                    } text-sm py-1 px-2 mt-2 rounded-full bg-slate-100`}
                  >
                    Choose Main Image by clicking on any Image
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-1 py-2">
  <label htmlFor="category" className="block font-semibold py-2 mb-2">
    Category
  </label>
  <div className="flex md:overflow-x-scroll flex-wrap md:flex-nowrap">
    {categories.map((category) => (
      <div
        key={category}
        className={`flex flex-col items-center justify-center mb-4 w-36 h-36 rounded-md border border-gray-300 cursor-pointer mx-2 ${
          formData.category === category ? "bg-yellow-100" : ""
        }`}
        onClick={() => handleCategoryChange(category)}
      >
        <div className="flex items-center justify-center">
          <img
            src={bodyTypes[category]}
            alt={category}
            className="w-16 h-16 object-contain"
          />
        </div>
        <span className="text-center text-sm font-medium w-[150px]">{category}</span>
      </div>
    ))}
  </div>
</div>

              <div>
                <div className="flex flex-col gap-1 py-2">
                  <label
                    htmlFor="Km_Driven"
                    className={`block font-semibold ${
                      formData.kmError ? "text-red-500" : ""
                    }`}
                  >
                    Km Driven*
                  </label>
                  <input
                    type="number"
                    id="Km_Driven"
                    name="Km_Driven"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Example: 15000, no commas"
                    value={formData.Km_Driven}
                    onChange={handleChange}
                    required
                    min="1"
                    className={`w-full border ${
                      formData.kmError ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 transition-all duration-300`}
                  />
                </div>
                {formData.kmError && (
                  <p className="text-red-500">
                    Please enter a value equal to or greater than 1.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="fuel" className="block font-semibold">
                  Fuel
                </label>
                <div className="flex flex-row gap-1 py-2">
                  {fuelTypes.map((fuelType) => (
                    <div
                      key={fuelType}
                      className={`flex items-center justify-center w-full capatalize border ${
                        formData.fuel === fuelType
                          ? "bg-yellow-100 font-semibold"
                          : "border-gray-300"
                      } rounded-md px-3 py-2`}
                      onClick={() => handleFuelSelection(fuelType)}
                    >
                      {fuelType}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="transmission" className="block font-semibold">
                  Transmission
                </label>
                <div className="flex flex-row gap-4 py-2">
                  {transmissionTypes.map((transmissionType) => (
                    <div
                      key={transmissionType}
                      className={`flex items-center justify-center w-full capitalize border ${
                        formData.transmission === transmissionType
                          ? "bg-yellow-100 font-semibold"
                          : "border-gray-300"
                      } rounded-md px-3 py-2`}
                      onClick={() =>
                        handleTransmissionSelection(transmissionType)
                      }
                    >
                      {transmissionType}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="color" className="block font-semibold">
                  Color*
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  className="w-full capitalize border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* ownership  */}
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="no_of_owners" className="block font-semibold">
                  Ownership*
                </label>
                <div className="flex flex-row gap-1 py-2">
                  <div
                    className={`flex items-center justify-center w-full uppercase border ${
                      formData.no_of_owners === "1"
                        ? "bg-yellow-100"
                        : "border-gray-300"
                    } rounded-md px-3 py-2`}
                    onClick={() => handleOwnerSelection("1")}
                  >
                    1
                  </div>
                  <div
                    className={`flex items-center justify-center w-full uppercase border ${
                      formData.no_of_owners === "2"
                        ? "bg-yellow-100"
                        : "border-gray-300"
                    } rounded-md px-3 py-2`}
                    onClick={() => handleOwnerSelection("2")}
                  >
                    2
                  </div>
                  <div
                    className={`flex items-center justify-center w-full uppercase border ${
                      formData.no_of_owners === "3"
                        ? "bg-yellow-100"
                        : "border-gray-300"
                    } rounded-md px-3 py-2`}
                    onClick={() => handleOwnerSelection("3")}
                  >
                    3
                  </div>
                  <div
                    className={`flex items-center justify-center w-full uppercase border ${
                      formData.no_of_owners === "4"
                        ? "bg-yellow-100"
                        : "border-gray-300"
                    } rounded-md px-3 py-2`}
                    onClick={() => handleOwnerSelection("4")}
                  >
                    4
                  </div>
                  <div
                    className={`flex items-center justify-center w-full uppercase border ${
                      formData.no_of_owners === "4+"
                        ? "bg-yellow-100"
                        : "border-gray-300"
                    } rounded-md px-3 py-2`}
                    onClick={() => handleOwnerSelection("4+")}
                  >
                    4+
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="RTO" className="block font-semibold">
                  RTO*
                </label>
                <input
                  type="text"
                  id="RTO"
                  name="RTO"
                  placeholder="Example: MP04"
                  value={formData.RTO}
                  onChange={handleChange}
                  required
                  maxLength={4}
                  className="w-full uppercase border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="city" className="block py-2 font-semibold">
                  City
                </label>
                <Autocomplete
                  disablePortal
                  id="city"
                  options={citiesData.map((city) => city.City)}
                  value={user.user.city || formData.city}
                  onChange={handleCityChange}
                  disabled={user.user.city ? true : false}
                  filterOptions={filterOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      required
                      className="w-full border font-semibold capitalize border-gray-300 rounded-md px-3 py-2"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="price" className="block  font-semibold">
                  Price*
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Example: 1000000, no commas"
                  value={formData.price}
                  min={10000}
                  onChange={handleChange}
                  required
                  className="w-full uppercase border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-1 py-2">
                <label htmlFor="description" className="block  font-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Any Extra Information about the car"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={500}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* // checkbox to assk if user whats to show his number or not  */}
              <label htmlFor="category" className="block font-semibold">
                Allow customer to directly contact you.
              </label>
              <div
                className={`flex py-4 mb-4 w-full justify-center bg-slate-100 items-center gap-2 cursor-pointer ${
                  formData.showMobile ? "bg-green-100" : ""
                }`}
                onClick={handleShowMobileToggle}
              >
                {/* <h2>By default your mobile is not visible to customer</h2> */}
                <input
                  type="checkbox"
                  id="showMobile"
                  name="showMobile"
                  checked={formData.showMobile}
                  className="w-4 h-4"
                  onChange={handleChange}
                />

                <label htmlFor="showMobile">Show Number</label>
              </div>
              {!isVerified && (
                <button
                  type="button"
                  onClick={handleVerifyConditions}
                  className="btn-secondary secondary-btn text-[#ee3131] bg-white border-1 border-[#ee3131] border-[1px] rounded-md py-4 px-4 w-full mx-auto transition-colors"
                  disabled={isAdding} // Disable the Verify button when already adding
                >
                  Verify Conditions
                </button>
              )}

              {isVerified && (
                <button
                  type="submit"
                  disabled={isAdding}
                  className="btn bg-[#ee3131] text-white rounded-md py-4 px-4 w-full mx-auto transition-colors"
                >
                  {isAdding ? (
                    <Stack
                      sx={{ color: "white" }}
                      spacing={2}
                      direction="row"
                      className="flex justify-center h-[20px] items-center"
                    >
                      <CircularProgress color="inherit" />
                    </Stack>
                  ) : (
                    "Add Car"
                  )}
                </button>
              )}
            </form>
          </div>
        </>
      ) : (
        <div className="main w-[70vw] sm:w-full bg-[url('/Images/bg-car-side.jpg')] bg-cover mx-auto m-8 h-[200px] sm:h-[150px] rounded-2xl ">
          <h2 className="text-[30px] xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-9 pt-8 justify-center flex">
            You Have Used up all your Credits
          </h2>
          {history.push("/sellcar")}
        </div>
      )}
    </div>
  );
};

export default NewCar;

import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dialogClasses } from "@mui/material";
import { getAllUsers } from "../../actions/userAction";

const City_Dealers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  //filter users according to city
  const dealers =
    users &&
    users.filter(
      (user1) => user1.role === "dealer" && user1.city === user.city
    );

  return (
    <main className="h-fit min-h-[100%] overflow-hidden w-full z-[10000] py-24 p-0 bg-[#fafafa] absolute top-0">
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
      <div className="h-full">
        <div className="pb-8 md:flex flex-col flex">
          <div className="w-[65px] h-[5px] bg-[#ee3131] mx-auto my-4"></div>
          <h2 className="text-xl w-full font-bold justify-center flex pl-4">
            Dealers
          </h2>
          <h4 className="text-base flex justify-center py-4 text-[#999]">
            All Dealers in {user.city}
          </h4>
          <hr />
        </div>

        {/* // mapping over dealers  */}
        <div className="flex flex-col p-4 bg-gradient-to-tr overflow-y-scroll overflow-x-hidden from-[#ff184a] to-[#ff6c6cb6] rounded-t-[50px] pt-28 shadow-xl shadow-[#13131336] h-fit min-h-screen w-[96%] mx-auto flex-wrap justify-start gap-4">
          {dealers &&
            dealers.map((dealer) => (
              <Link to={`/sellerCar/${dealer._id}`} key={dealer._id}>
                <div className="profile_info w-full p-2 bg-[#eee] flex gap-1 h-[150px] shadow-lg rounded-xl">
                  <div className="profile_info__left w-[40%] h-full flex flex-col justify-center items-center">
                    <div className="profileContainer__left__imgContainer w-[100px] h-[100px] border-[0.5px] border-[#ee3131] rounded-[100%] overflow-hidden">
                      <img
                        src={dealer.avatar[0].url}
                        alt={dealer.name}
                        className="rounded-[100%] w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null; // prevent infinite loop
                          e.target.src = "./Images/man.webp"; // fallback image
                          e.target.alt = "Default Avatar"; // fallback alt text
                        }}
                      />
                    </div>
                  </div>

                  <div className="profile_info__right w-[70%] py-10 h-full flex flex-col gap-1">
                    <h1 className="font-semibold flex items-center gap-2">
                      {dealer.name}
                      <img
                        src="/Images/blue_tick.png"
                        alt={`Verified ${dealer.role}`}
                        className="w-4"
                      />
                    </h1>
                    <h1 className=" font-medium">{dealer.mobile}</h1>
                    <h1 className="text-sm font-normal">{dealer.email}</h1>
                  </div>
                </div>
                  <div className="w-full md:hidden h-[50px] flex mb-0 relative top-[-10px] justify-evenly align-middle rounded bg-slate-50">
                    <div className="flex gap-2 self-center">
                      <h1 className="text-lg text-gray-600 font-medium">
                        Credit :{" "}
                      </h1>

                      <h1 className="text-lg text-gray-900 font-medium">
                        {dealer && dealer.credit}
                      </h1>
                    </div>
                    <div className="flex gap-2 self-center">
                      <h1 className="text-lg text-gray-600 font-medium">
                        Expire Time :{" "}
                      </h1>
                      <h1 className="text-lg text-gray-900 font-medium">
                        {dealer && dealer.expireLimit} Days
                      </h1>
                    </div>
                  </div>

                  <div className="w-full  hidden md:flex h-[50px] relative bottom-2 justify-evenly align-middle rounded bg-slate-50">
                    <div className="flex gap-2 self-center">
                      <h1 className="text-sm text-gray-600 font-medium">
                        Credit :{" "}
                      </h1>
                      <h1 className="text-sm text-gray-900 font-medium">
                        {dealer && dealer.credit}
                      </h1>
                    </div>
                    <div className="flex gap-2 self-center">
                      <h1 className="text-sm text-gray-600 font-medium">
                        Expire Time :{" "}
                      </h1>
                      <h1 className="text-sm text-gray-900 font-medium">
                        {dealer && dealer.expireLimit} Days
                      </h1>
                    </div>
                  </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
};

export default City_Dealers;

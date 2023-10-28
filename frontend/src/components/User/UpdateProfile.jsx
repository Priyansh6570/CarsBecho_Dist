import React, { Fragment, useState, useEffect } from "react";
import "../../styles/UpdateProfile.scss";
import Loader from "../Layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../Layout/MetaData";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dealershipName, setDealershipName] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Images/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("dealershipName", dealershipName);
    myForm.set("address", address);
    if (avatar) {
      myForm.set("avatar", avatar);
    } else {
      myForm.set("avatar", "");
    }
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const avatarImg = user.avatar[0].url ? user.avatar[0].url : "/Images/Profile.png";

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setDealershipName(user.dealershipName);
      setAddress(user.address);
      setAvatarPreview(avatarImg);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />


          <div className="LoginSignUpContainer flex justify-center align-top pt-[80px] sm:h-[890px] sm:p-0 bg-[#202e44]">
            <div className="profileContainer p-3 bg-slate-200 w-[60%] sm:w-full sm:h-[930px] sm:rounded-none h-[500px] flex sm:flex-col gap-3 rounded-2xl">
              <div className="profileContainer__left w-[50%] sm:h-[458px] sm:w-full rounded-xl flex flex-col justify-center gap-6 items-center bg-[#ffffff00]">
                <h1 className="text-[30px] font-sans font-bold">Update Profile</h1>
                <div className="profileContainer__left__imgContainer border-[0.5px] border-[#ee3131] w-[200px] h-[200px] rounded-[100%] overflow-hidden">
                <div id="updateProfileImage" className="h-full w-full">
                  <img src={avatarPreview} alt="" className="rounded-[100%] w-full h-full object-cover" />
                </div>
                </div>
              <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    className="input-image"
                  />
              </div>

              <div className="profileContainer__right rounded-xl w-[50%] sm:w-full sm:h-[558px] bg-[#ffffff8f] flex flex-col gap-5 p-6">
                <div className="profileContainer__right__top flex flex-col gap-4 items-center h-full justify-evenly">
                <form
                className="updateProfileForm gap-4 h-[200px] m-0 p-0 w-full sm:relative sm:top-[-100px] sm:gap-4"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[120%]"
                  />
                </div>
                {/* dealership name if user role is dealer  */}
                {user.role === "dealer" && (
                  <div className="updateProfileName">
                    <MdDriveFileRenameOutline />
                    <input
                      type="text"
                      placeholder="Dealership Name"
                      required
                      name="dealershipName"
                      value={dealershipName}
                      onChange={(e) => setDealershipName(e.target.value)}
                      className="w-[120%]"
                    />
                    </div>
                    )} 
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[120%]"
                  />
                </div>

                {(user.role === "dealer" || user.role === "broker") && (
                <div className="updateProfileAddress">
                  <textarea
                    type="text"
                    placeholder="Address"
                    required
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-[120%] px-4 pt-4 border-[1px] border-[#7b7b7b77] rounded"
                  />
                </div>
                )}

                  <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn bg-[#ee3131] w-[60%] btn relative bottom-[-40px]"
                  />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
import React, { Fragment, useState, useEffect } from "react";
import "../../styles/UpdatePassword.scss";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../Layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      history.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer sm:p-0 sm:h-[60vh] xs:h-[70vh] flex justify-center align-start">
            <div className="main-container sm:flex-col sm:w-full w-[60%] rounded-xl justify-evenly p-6 h-[550px] flex">
              <div className="updatePass_left h-full w-[50%] rounded-xl">
                <img src='/Images/padlock.png' alt="password procted" className=" scale-[0.8] relative sm:absolute sm:top-[-40px] sm:scale-[0.1] sm:right-[-100px] bottom-[-50px]" />
              </div>

              <div className="updatePass_right h-full px-[5%] py-[1%] w-[50%] sm:w-full justify-center">
              <div className="updatePasswordBox h-[500px] sm:w-full bg-[#ffffff67] rounded-xl place-self-center">
              <h2 className="updatePasswordHeading sm:text-2xl">Update Profile</h2>

              <form
                className="updatePasswordForm sm:p-0"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    className=""
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    className=""
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    className=""
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn btn text-lg font-sans font-semibold bg-[#ee3131] relative bottom-[-80px]"
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

export default UpdatePassword;
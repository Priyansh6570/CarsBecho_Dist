import React, { Fragment, useState, useEffect } from "react";
import "../../styles/ForgotPassword.scss";
import Loader from "../Layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />

          <div className="updatePasswordContainer sm:p-0 sm:h-[60vh] xs:h-[70vh] flex justify-center align-start">
            <div className="main-container sm:flex-col sm:w-full w-[60%] rounded-xl justify-evenly p-6 h-[550px] flex">
              <div className="updatePass_left h-full w-[50%] rounded-xl">
                <img
                  src="/Images/forgot-password.png"
                  alt="password procted"
                  className=" scale-[0.6] relative sm:absolute xs:top-[0px] sm:top-[-30px] sm:scale-[0.1] sm:right-[-100px] bottom-[-50px]"
                />
              </div>

              <div className="updatePass_right h-full place-content-center px-[5%] sm:px-0 py-[50px] xs:py-0 sm:py-0 w-[50%] sm:w-full justify-center">
                <div className="updatePasswordBox relative sm:top-[-100px] sm:py-6 h-[400px] sm:w-full bg-[#ffffff67] rounded-xl place-self-center">
                  <h2 className="forgotPasswordHeading sm:text-xl">Forgot Password</h2>

                  <form
                    className="forgotPasswordForm sm:p-0"
                    onSubmit={forgotPasswordSubmit}
                  >
                    <div className="forgotPasswordEmail">
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="sm:p-0"
                      />
                    </div>

                    <input
                      type="submit"
                      value="Send"
                      className="forgotPasswordBtn bg-[#ee3131] sm:p-3"
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

export default ForgotPassword;

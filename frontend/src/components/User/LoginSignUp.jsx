import React, { Fragment, useRef, useState, useEffect } from "react";
import "../../styles/LoginSignUp.scss";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Register_Mobile from "./Register_Mobile";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

const LoginSignUp = ({ history, location }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "user",
    verifyButton: false,
    verifyOtp: false,
    otp: "",
  });

  const { name, email, password, mobile, role } = user;

  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dtwkhnkns/image/upload/v1690036284/avatars/man_ejk2wq.webp"
  );
  const [avatarPreview, setAvatarPreview] = useState("/Images/Profile.png");

  const handleOtpVerification = () => {
    setOtpVerified(true);
  };

  // Login Submition

  const loginSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(login(loginEmail, loginPassword));
  };

  // Register Submition

  const registerSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);

    if (avatar) {
      myForm.set("avatar", avatar);
    } else {
      myForm.set(
        "avatar",
        "https://res.cloudinary.com/dtwkhnkns/image/upload/v1690036284/avatars/man_ejk2wq.webp"
      );
    }

    myForm.set("mobile", mobile);
    myForm.set("role", role);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  const [showForm, setShowForm] = useState(false);

  const showFormComponent = () => {
    setShowForm(true);
  };

  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if (error) {
      console.log(error);
      setIsSubmitting(false);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    setActiveTab(tab);
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      if (registerTab.current) {
        registerTab.current.classList.remove("shiftToNeutralForm");
      }

      if (loginTab.current) {
        loginTab.current.classList.remove("shiftToLeft");
      }
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      if (registerTab.current) {
        registerTab.current.classList.add("shiftToNeutralForm");
      }

      if (loginTab.current) {
        loginTab.current.classList.add("shiftToLeft");
      }
    }
  };

  return (
    <Fragment>
      (
      <Fragment>
        <div className="LoginSignUpContainer pt-[50px] overflow-x-hidden flex justify-center">
          <div id="recaptcha-container"></div>
          <div className="left-main-container sm:relative sm:top-[-100px] sm:h-[920px] p-3 flex flex-row h-[550px] w-[60vw] sm:w-[100vw] sm:flex-col sm:justify-center sm:align-baseline">
            <img
              src="./Images/user-action-bg.jpg"
              alt=""
              className="user-action-img w-[880px] sm:w-full sm:object-cover sm:scale-[1.3] blur-[2px] sm:right-1 sm:rounded-none absolute h-[70%] rounded-3xl"
            />
            <img
              src="./Images/monitoring-login.png"
              alt="login-logo"
              className="login-img sm:hidden relative scale-[0.5] left-[-20px] bottom-[-60px]"
            />
            <div className="LoginSignUpBox overflow-x-hidden overflow-y-auto relative right-[50px] sm:top-[-14px] sm:right-0 shrink-0 scale-[1] self-center">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              {/* login  */}
              {activeTab === "login" && (
                <form
                  className="loginForm xs:px-10"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  {isSubmitting ? (
                    <div className="flex justify-center mt-2">
                      <CircularProgress size={40} style={{ color: "#ee3131" }} />
                    </div>
                  ) : (
                    <>
                      <div className="loginEmail">
                        <MailOutlineIcon />
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                      <div className="loginPassword">
                        <LockOpenIcon />
                        <input
                          type="password"
                          placeholder="Password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>
                      <Link to="/password/forgot">Forgot Password ?</Link>
                      <input
                        type="submit"
                        value={isSubmitting ? "Logging in..." : "Login"}
                        className="loginBtn sm:scale-[1] bg-[#ee3131] text-white text-xl sm:text-sm sm:h-[30px] font-bold rounded font-sans"
                        disabled={isSubmitting}
                      />
                    </>
                  )}
                </form>
              )}

              {/* signup or Register  */}
              {activeTab === "register" && showForm ? (
                <form
                  className="signUpForm sm:h-[330px] mb-16 xs:px-6 flex flex-col gap-2 mt-4 sm:mt-20"
                  ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  {isSubmitting ? (
                    <div className="flex justify-center mt-2">
                    <CircularProgress size={40} style={{ color: "#ee3131" }} />
                  </div>
                  ) : (
                    <>
                  {/* Name input */}
                  <div className="signUpName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={user.name}
                      onChange={registerDataChange}
                    />
                  </div>

                  {/* Email input */}
                  <div className="signUpEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={user.email}
                      onChange={registerDataChange}
                    />
                  </div>

                  {/* Password */}
                  <div className="signUpPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={user.password}
                      onChange={registerDataChange}
                    />
                  </div>
                  {/* <div id="registerImage" className="mt-6">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className=""
                      />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div> */}
                  <input
                    type="submit"
                    value={
                      isSubmitting ? (
                        "Registering..."
                      ) : (
                        "Register"
                      )
                    }
                    className="loginBtn sm:scale-[1] bg-[#ee3131] text-white text-xl sm:text-sm sm:h-[30px] font-bold rounded font-sans"
                    disabled={isSubmitting}
                  /></>
      )}
                </form>
              ) : (
                activeTab === "register" && (
                  <div>
                    <Register_Mobile
                      onNext={showFormComponent}
                      user={user}
                      setUser={setUser}
                      onOtpVerification={handleOtpVerification}
                    />
                    <button
                      className="btn-next w-full relative left-[160px]"
                      onClick={showFormComponent}
                      disabled={!otpVerified}
                    >
                      Next
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Fragment>
      )
    </Fragment>
  );
};

export default LoginSignUp;

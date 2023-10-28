import React, {useState} from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import app from "../firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useAlert } from "react-alert";
import { CircularProgress } from "@material-ui/core";

const Register_Mobile = ({user, setUser, onOtpVerification }) => {

  const alert = useAlert();

 

 // Firebase Phone Auth
 const auth = getAuth(app);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");
 const [isVerifying, setIsVerifying] = useState(false);

 const onCaptchVerify = () => {
   window.recaptchaVerifier = new RecaptchaVerifier(
     "recaptcha-container",
     {
       'size': "invisible",
       'callback': () => {
         alert.success("Captcha verified");
       },

       'expired-callback': () => {
         alert.error("Captcha expired");

         window.recaptchaVerifier.render().then((widgetId) => {
           window.recaptchaVerifier.reset(widgetId);
         });
       }
     },
     auth
   );
 };


 const onSignInSubmit = (e) => {
   if(user.mobile && user.mobile.length === 10){
    setIsSubmitting(true);
    onCaptchVerify();
    const phoneNumber = "+91" + user.mobile;
    const appVerifier = window.recaptchaVerifier;
 
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert.success("OTP sent successfully");
        setIsSubmitting(false);
      })
      .catch((error) => {
        alert.error("Failed to send OTP");
        setIsSubmitting(false);
      });
   } else {
    setErrorMessage("Please enter a 10-digit mobile number");
  }
 };

 const onVerifyOtp = (e) => {
  setIsVerifying(true);
  window.confirmationResult
    .confirm(user.otp)
    .then((result) => {
      const userData = result.user;
      alert.success("OTP verified successfully");
      onOtpVerification(true);
      setIsVerifying(false);
    })
    .catch((error) => {
      alert.error("Invalid OTP");
      onOtpVerification(false);
      setIsVerifying(false);
    });
};

 const mobileChange = (e) => {
  const mobileNumber = event.target.value.replace(/\s/g, "");
   setUser({ ...user, mobile: e.target.value });
 };

  return (
    <div>
      {/* Mobile input */}
      <div className="signUpMobile flex flex-col px-4 sm:h-[330px] h-[280px] mt-[10px]">
        <PhoneIcon className="top-[3.4rem] left-[1.1rem] relative text-slate-500" />
        <input
        type="text"
        placeholder="Mobile"
        required
        name="mobile"
        value={user.mobile}
        onChange={mobileChange}
        className={`mobileInput pl-[50px] border-[#c3c2c2] border-[1px] focus:border-[1px] focus:border-[#999] py-4 bg-white mt-3 ${
          errorMessage ? "error" : ""
        }`}
      />
      {errorMessage && <p className="errorMessage text-4xl">{errorMessage}</p>}
      {user.mobile && user.mobile.length === 10 ? (
        <button
          type="button"
          className="signUpBtn sm:p-4 verify sm:pr-0 bg-[#b9b5b500] mb-4 text-[#ee3131] text-xl sm:scale-[1] font-bold font-sans rounded"
          onClick={onSignInSubmit}
        >
          {isSubmitting ? (
            <CircularProgress size={20} style={{ color: "#ee3131" }} />
          ) : (
            "Send OTP"
          )}
        </button>
        ) : null}
        {/* OTP Verification */}
        <div className="signup-field">
          <div className="signUpOTP flex flex-col">
            <input
              type="number"
              placeholder="OTP"
              onChange={(e) => setUser({ ...user, otp: e.target.value })}
              className="OTPInput border-[#c3c2c2] border-[1px] mt-3 focus:border-[1px] focus:border-[#999] p-4 bg-white"
            />
            <button
      type="button"
      onClick={onVerifyOtp}
      className="signUpBtn sm:p-4 verify sm:pr-0 bg-[#b9b5b500] text-[#ee3131] sm:text-xl sm:scale-[1] font-bold font-sans rounded"
      disabled={isVerifying}
    >
      {isVerifying ? (
        <CircularProgress size={20} style={{ color: "#ee3131" }} />
      ) : (
        "Verify"
      )}
    </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register_Mobile;

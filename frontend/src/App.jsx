import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Layout/Header/Navbar";
import UsedCar from "./components/Cars/UsedCar";
import Footer from "./components/Layout/Footer/Footer";
import NavbarMobile from "./components/Layout/Header/NavbarMobile";
import CarDetail from "./components/Cars/CarDetail";
import FooterMobile from "./components/Layout/Footer/FooterMobile";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile.jsx";
import store from "./store";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import UpdatePassword from "./components/User/UpdatePassword";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import DRM_Protected_Route from "./components/Route/DRM_Protected_Route";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdateCar from "./components/Cars/UpdateCar";
import SellerPage from "./components/Seller/SellerPage.jsx"
import SellerCarDetail from "./components/Seller/SellerCarDetail";
import axios from "axios";
import GetWishlist from "./components/Cars/GetWishlist";
import Dashboard from "./components/Admin/Dashboard";
import AllUser from "./components/Admin/AllUser";
import AllDealer from "./components/Admin/AllDealer";
import AllSubscriptions from "./components/Admin/AllSubscriptions";
import PendingCars from "./components/Admin/PendingCars";
import ApproveCar from "./components/Admin/ApproveCar.jsx";
import SellerCarPage from "./components/Seller/SellerCarPage";
import InProgress from "./components/Layout/Progress/InProgress";
import About from "./components/Layout/About/About";
import FAQs from "./components/Layout/About/FAQs";
import Orders from "./components/Order/Orders";
import Become_Partners from "./components/Cars/Become_Partners";
import DealerSubscription from "./components/Cars/DealerSubscription";
import BrokerSubscription from "./components/Cars/BrokerSubscription";
import Error404Page from "./components/Layout/NotFound/Error404Page";
import Ev_Benifits from "./components/Layout/About/Ev_Benifits";
import PrivacyPolicy from "./components/Layout/About/PrivacyPolicy";
import TermsAndConditions from "./components/Layout/About/TermsAndConditions";
import Ev_Charge from "./components/Layout/About/Ev_Charge";
import Ev_Government from "./components/Layout/About/Ev_Government";
import Ev_Growth from "./components/Layout/About/Ev_Growth";
import Ev_Range from "./components/Layout/About/Ev_Range";
import NewCar from "./components/Cars/NewCar";
import DRM_Dashboard from "./components/DRM/DRM_Dashboard";
import Trial_Request from "./components/DRM/Trial_Request";
import City_PendingCars from "./components/DRM/City_PendingCars";
import FreeTrial from "./components/Cars/FreeTrial";
import SubscriptionReq from "./components/DRM/SubscriptionReq";
import City_Brokers from "./components/DRM/City_Brokers";
import City_Dealers from "./components/DRM/City_Dealers";
axios.defaults.withCredentials=true;

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
      window.scrollTo(0, 0);
    store.dispatch(loadUser());
  }, []);

  //prevent right click on website
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return (
    <Router>
      <Navbar />
      <NavbarMobile />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route strict path="/car/:id" component={CarDetail} />
        <Route exact path="/cars" component={UsedCar} />
        <Route exact path="/cars/:keyword?" component={UsedCar} />
        <Route exact path="/about" component={About} />
        <Route exact path="/faqs" component={FAQs} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/wishlist/me" component={GetWishlist} />
        <Route exact path="/sellerCar/:id" component={SellerCarPage} />
        <Route exact path="/seller" component={SellerPage} />
        <Route exact path="/in-progress" component={InProgress} />
        <ProtectedRoute exact path="/sellCar" component={Become_Partners} />
        <ProtectedRoute exact path="/newCar" component={NewCar} />
        <ProtectedRoute exact path="/seller/car/update/:id" component={UpdateCar} />
        <ProtectedRoute exact path="/seller/car/:id" component={SellerCarDetail} />
        <Route exact path="/orders/:id" component={Orders} />
        <Route exact path="/dealer/subscription" component={DealerSubscription} />
        <Route exact path="/broker/subscription" component={BrokerSubscription} />
        <Route exact path="/free/trial" component={FreeTrial} />
        <Route exact path="/ev/ev-benifits" component={Ev_Benifits} />
        <Route exact path="/ev/ev-charge" component={Ev_Charge} />
        <Route exact path="/ev/ev-government" component={Ev_Government} />
        <Route exact path="/ev/ev-growth" component={Ev_Growth} />
        <Route exact path="/ev/ev-range" component={Ev_Range} />
        <Route exact path="/info/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/info/terms-and-conditions" component={TermsAndConditions} />

        <DRM_Protected_Route exact path="/drm/dashboard/:id" component={DRM_Dashboard} />
        <DRM_Protected_Route exact path="/drm/cars/pending" component={City_PendingCars} />
        <DRM_Protected_Route exact path="/drm/brokers" component={City_Brokers} />
        <DRM_Protected_Route exact path="/drm/dealers" component={City_Dealers} />
        <DRM_Protected_Route exact path="/drm/subscriptions" component={SubscriptionReq} />
        <DRM_Protected_Route exact path="/drm/trial-requests" component={Trial_Request} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/allUsers"
          component={AllUser}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dealers"
          component={AllDealer}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/cars/pending"
          component={PendingCars}
        />
         <DRM_Protected_Route
          isAdmin={true}
          exact
          path="/admin/cars/pending/:id"
          component={ApproveCar}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/subscriptions"
          component={AllSubscriptions}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route component={Error404Page} />
      </Switch>
      <Footer />
      <FooterMobile />
    </Router>
  );
}

export default App;

import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LoginModal from "../components/Log/Modal/loginModal";
import { SignUpModal } from "../components/Log/Modal/registerModal";
import SideBar from "../components/SideBar/sideBar";
// import { ProgressBar } from "../components/progressBar/progressbar";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import "./Home.css";
import { UidContext } from "../components/AppContext";
import LogOut from "../components/Log/formLog/logOut";

import rootReducers from "../js/reducers";
//............................

function Home() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  //useState login
  const [showLoginModal, setShowLoginModal] = useState(false);
  //reff openLoginModal
  const openLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };
  //useState signup
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  //reff openSignupModal
  const openSignUpModal = () => {
    setShowSignUpModal((prev) => !prev);
  };
  //   //useState progressbar
  //   const [showProgressBar, setShowProgressBar] = useState(false);
  //   //reff openprogressbar
  //   const openProgressBar = () => {
  //     setShowProgressBar((prev) => !prev);
  //   };

  const LogLinks = (
    <div className="AuthButton">
      <FaRegUserCircle size={22} className="userPhoto" />
      <button className="b1" onClick={openLoginModal}>
        {" "}
        Connexion
      </button>
      <button className="b2" onClick={openSignUpModal}>
        {" "}
        S'inscrire
      </button>
    </div>
  );

  return (
    <div>
      {/* <ProgressBar
        showProgressBar={showProgressBar}
        setShowProgressBar={setShowProgressBar}
      /> */}
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <SignUpModal
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
      />

      <div className="bgAcceuil">
        <div role="navigation" className="navLeft">
          <Link to="/">
            <img
              className="logoHome"
              src="/img/wecoepiLogo.png"
              alt="logo wecoepi"
            />
          </Link>
          <SideBar />
        </div>

        <div role="main" className="navMiddle">
          {" "}
          {/* <button className="b1" onClick={openProgressBar}>
            {" "}
            Progress
          </button> */}
        </div>

        <div role="complementary" className="navRight">
          <div className="Container">
            <div className="Auth">
              {uid ? (
                <div className="loginNav">
                  {" "}
                  <NavLink className="navHomeProfil" to="/profil">
                    <div className="loginName">
                      {" "}
                      <div>
                        <img
                          class="circular--userPc"
                          src={userData.userPicture}
                          alt="user-pic"
                        />
                      </div>
                      <div className="userNameAcc">
                        <div className="userLastNameHome">
                          {userData.userLastName}
                        </div>
                        <div className="userNameHome">
                          {" "}
                          {userData.userName}{" "}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <LogOut />
                </div>
              ) : (
                <div> {LogLinks} </div>
              )}
            </div>
            <div className="SearchClub"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;

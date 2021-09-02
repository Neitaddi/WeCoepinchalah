import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import LoginModal from "../components/Log/Modal/loginModal";
import { SignUpModal } from "../components/Log/Modal/registerModal";
import { ProgressBar } from "../components/progressBar/progressbar";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import "./Home.css";
import { UidContext } from "../components/AppContext";
import LogOut from "../components/Log/formLog/logOut";
import { FiHome } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import ThreadHome from "../components/ThreadHome/ThreadHome";

//............................

function Home() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const [isLoadPost, setIsLoadPost] = useState(true);
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
  const [showProgressBar, setShowProgressBar] = useState(false);
  //reff openprogressbar
  // const openProgressBar = () => {
  //   setShowProgressBar((prev) => !prev);
  // };
  useEffect(() => {
    if (isLoadPost) {
      setIsLoadPost(false);
      setShowProgressBar((prev) => !prev);
    }
  }, [isLoadPost]);

  const LogLinks = (
    <div className="AuthButton">
      <FaRegUserCircle size={22} className="userPhoto" />
      <label className="b1" onClick={openLoginModal}>
        {" "}
        Connexion
      </label>
      <label className="b2" onClick={openSignUpModal}>
        {" "}
        S'inscrire
      </label>
    </div>
  );

  return (
    <div>
      {isLoadPost ? (
        <ProgressBar
          showProgressBar={showProgressBar}
          setShowProgressBar={setShowProgressBar}
        />
      ) : (
        <div>
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
              {/* <SideBar /> */}
              {uid ? (
                <nav className={"side-menu active"}>
                  <ul className="side-menu-items">
                    <li className="side-text">
                      <Link to={"/acceuil"} className="linkP">
                        <FiHome className="icons" />
                        <span className="title">Acceuil</span>
                      </Link>
                    </li>
                    <li className="side-text">
                      <Link to={"/profil"} className="linkP">
                        <IoPersonOutline className="icons" />
                        <span className="title">Profil</span>
                      </Link>
                    </li>
                    <li className="side-text">
                      <Link to={"/clubs"} className="linkP">
                        <AiOutlineTeam className="icons" />
                        <span className="title">Clubs</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              ) : (
                <nav className={"side-menu active"}>
                  <ul className="side-menu-items">
                    <li className="side-text">
                      <Link to={"/acceuil"} className="linkP">
                        <FiHome className="icons" />
                        <span className="title">Acceuil</span>
                      </Link>
                    </li>

                    <li className="side-text">
                      <Link to={"/clubs"} className="linkP">
                        <AiOutlineTeam className="icons" />
                        <span className="title">Clubs</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              )}
            </div>

            <div role="main" className="navMiddle">
              {" "}
              <ThreadHome />
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
      )}
    </div>
  );
}
export default Home;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { UidContext } from "../components/AppContext";
import SideBarProfilClub from "../components/Club/SideBarProfilClub";
import "./Club.css";

const Club = () => {
  //validate user login
  // const uid = useContext(UidContext);

  return (
    <div className="bgAcceuilCb">
      <div role="navigation" className="navLeftCb">
        <Link to="/">
          <img src="/img/wecoepiLogo.png" alt="logo wecoepi" />
        </Link>
        <SideBarProfilClub />
      </div>
      <div role="main" className="navMiddleCb">
        {" "}
        <div role="main" className="topCb"></div>
        <div role="main" className="buttomCb"></div>
      </div>
    </div>
  );
};

export default Club;

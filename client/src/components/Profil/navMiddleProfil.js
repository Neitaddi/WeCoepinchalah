import "./navMiddleProfil.css";
import React from "react";
import { useSelector } from "react-redux";
import { IoMailOutline } from "react-icons/io5";

const NavMiddleProfil = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="userInoProfil">
      <div className="compUserNameProfil">
        <div className="userNameProfil">
          <h3>{userData.userName}</h3>
        </div>
        <div className="userLastNameProfil">
          <h3>{userData.userLastName}</h3>
        </div>
      </div>
      <div className="userBioProfil">{userData.userBio}</div>
      <div className="userEmailProfil">
        {" "}
        <IoMailOutline />
        {userData.userEmail}
      </div>
      <div className="userFlwProfil">
        <div className="userFlowingProfil">{userData.userFollowing}</div>
        <div className="userFlowersProfil">{userData.userFollowers}</div>
      </div>
    </div>
  );
};
export default NavMiddleProfil;

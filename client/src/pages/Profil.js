import rootReducers from "../js/reducers";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ModalUpdateProfil from "../components/Profil/ModalUpdateProfil";
import "./Profil.css";
import UploadImg from "../components/Profil/uploadeImg";
import NavMiddleProfil from "../components/Profil/navMiddleProfil";
import { FiEdit } from "react-icons/fi";

const Profil = () => {
  //useState login
  const [showModalUpdateProfil, setShowModalUpdateProfil] = useState(false);
  //reff openModalUpdateProfil
  const openModalUpdateProfil = () => {
    setShowModalUpdateProfil((prev) => !prev);
  };
  const LogLinks = (
    <button className="ModifierProfil" onClick={openModalUpdateProfil}>
      {" "}
      <FiEdit /> Modifier le Profil
    </button>
  );

  //stock userData from store
  const userData = useSelector((state) => state.userReducer);
  console.log("userData", userData);
  return (
    <div className="bgAcceuilpf">
      <ModalUpdateProfil
        showModalUpdateProfil={showModalUpdateProfil}
        setShowModalUpdateProfil={setShowModalUpdateProfil}
      />
      <div role="navigation" className="navLeftpf">
        <NavLink to="/" exact>
          <img src="img/wecoepiLogo.png" className="logoProfil" />
        </NavLink>

        <div className="circular--landscape">
          <img
            class="circular--square"
            src={userData.userPicture}
            alt="user-pic"
          />

          <UploadImg />
        </div>
        {LogLinks}
      </div>

      <div role="main" className="navMiddlepf">
        <NavMiddleProfil />
      </div>
    </div>
  );
};

export default Profil;

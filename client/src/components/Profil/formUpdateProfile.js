import "./formUpdateProfil.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../js/actions/userActions";

const FormUpdateProfile = () => {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(
      updateUser(userData._id, userName, userLastName, userBio, userEmail)
    );
  };

  return (
    <div className="ModProfil">
      <div className="entetepf">
        <img
          className="logoMpf"
          src="/img/wecoepiLogo.png"
          alt="logo wecoepi"
        />
        <button className="btnModifierpf" onClick={handleUpdate}>
          Valider les modifications
        </button>
        <h2>Modifier le Profil</h2>
      </div>
      <form className="formpf" action="#">
        <label className="labelPf">Nom</label>
        <input
          className="modifierUserName"
          type="text"
          id="pf"
          defaultValue={userData.userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="labelPf">Prénom</label>
        <input
          className="modifierUserLastName"
          type="text"
          id="pf"
          defaultValue={userData.userLastName}
          onChange={(e) => setUserLastName(e.target.value)}
        />
        <label className="labelPf">Email</label>
        <input
          className="modifierUserEmail"
          type="text"
          id="pf"
          defaultValue={userData.userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <label className="labelPf">Bio</label>
        <textarea
          className="modifierUserBio"
          type="text"
          defaultValue={userData.userBio}
          id="pf"
          name="UserBiopf"
          rows="5"
          cols="33"
          onChange={(e) => setUserBio(e.target.value)}
        ></textarea>
      </form>
    </div>
  );
};
export default FormUpdateProfile;

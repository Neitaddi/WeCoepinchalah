import "./formUpdateProfil.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormUpdateProfile = () => {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(
      updateUser(userData._id, userName, userLastName, userBio, userLastName)
    );
  };

  return (
    <div>
      <form className="form" action="#">
        <input
          className="modifierUserName"
          type="text"
          defaultValue={userData.userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="modifierUserLastName"
          type="text"
          defaultValue={userData.userLastName}
          onChange={(e) => setUserLastName(e.target.value)}
        />

        <input
          className="modifierUserEmail"
          type="text"
          defaultValue={userData.userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <textarea
          className="modifierUserBio"
          type="text"
          defaultValue={userData.userBio}
          onChange={(e) => setUserBio(e.target.value)}
        ></textarea>
        <button onClick={handleUpdate}>Valider modifications</button>
      </form>
    </div>
  );
};
export default FormUpdateProfile;

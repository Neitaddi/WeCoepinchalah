import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ModalUpdateProfil from "../components/Profil/ModalUpdateProfil";
import "./Profil.css";

import NavMiddleProfil from "../components/Profil/navMiddleProfil";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { BsPersonBoundingBox } from "react-icons/bs";
import Swal from "sweetalert2";

const Profil = () => {
  const [photo, setPhoto] = useState("");
  //useState login
  const [showModalUpdateProfil, setShowModalUpdateProfil] = useState(false);
  //reff openModalUpdateProfil
  const openModalUpdateProfil = () => {
    setShowModalUpdateProfil((prev) => !prev);
  };
  const LogLinks = (
    <label className="ModifierProfil" onClick={openModalUpdateProfil}>
      {" "}
      <FiEdit /> Modifier le Profil
    </label>
  );

  //stock userData from store
  const userData = useSelector((state) => state.userReducer);
  console.log("userData", userData);

  const uploadImage = (event) => {
    event.preventDefault();

    const image = new FormData();

    image.append("file", event.target.files[0]);
    image.append("upload_preset", "tyfhc3lt");
    axios
      .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
      .then(({ data }) => {
        setPhoto(data.url);
        // clublist.clubPicture = data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendPhotoOnClick = () => {
    // console.log("idC", photo);
    //kenet string radineha objet bch yesta9belha (objeeet)
    const dataPhoto = { photo: photo };
    axios
      .patch(`http://localhost:5000/api/user/upload/${userData._id}`, dataPhoto)

      .then(() => {
        Swal.fire(
          "updated!",
          "Your imaginary file has been updated.",
          "success"
        );
        // dispatch(getClubs());
      })

      .catch((err) => {
        console.log(err);
      });
  };

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
          {/* <img
            class="circular--square"
            src={userData.userPicture}
            alt="user-pic"
          /> */}

          {/* <UploadImg /> */}
          <div className="image-up">
            <label htmlFor="imgInp" />
            <img id="blah" src={userData.userPicture} />
            <input
              id="imgInp"
              type="file"
              onChange={(event) => uploadImage(event)}
            />
          </div>
          <div>
            <label className="labelAddImg" htmlFor="submit">
              <BsPersonBoundingBox onClick={sendPhotoOnClick} />
            </label>
            <input
              className="ajouterImg"
              type="submit"
              value="Envoyer"
              id="submit"
              name="submit"
            />
          </div>
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

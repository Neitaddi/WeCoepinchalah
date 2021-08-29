import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClubs } from "../js/actions/clubActions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import SideBarProfilClub from "../components/Club/SideBarProfilClub";
import "./Club.css";
import axios from "axios";
import Swal from "sweetalert2";

// ........................................................

import { useDispatch, useSelector } from "react-redux";
import { uploadPictureClub } from "../js/actions/clubActions";
import { BsPersonBoundingBox } from "react-icons/bs";

// ........................................................

const Club = (props) => {
  const [clublist, setClublist] = useState({});
  const [photo, setPhoto] = useState("");
  // ..............................................
  console.log("props", props);
  const idC = props.match.params.idC;
  const dispatch = useDispatch();
  // ...............................................

  useEffect(() => {
    props.getClubs().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
    setPhoto(clublist.clubPicture);
  }, [props.clubs, photo]);

  // const uploadImage = (event) => {
  //   event.preventDefault();

  //   const image = new FormData();

  //   image.append("file", event.target.files[0]);
  //   image.append("upload_preset", "tyfhc3lt");
  //   axios
  //     .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
  //     .then(({ data }) => {
  //       setPhoto(data.url);
  //       clublist.clubPicture = data.url;
  //     })
  //     .then(() => {
  //       axios.patch(`http://localhost:5000/api/club/${idC}`, photo);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const uploadImage = (event) => {
    event.preventDefault();

    const image = new FormData();

    image.append("file", event.target.files[0]);
    image.append("upload_preset", "tyfhc3lt");
    axios
      .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
      .then(({ data }) => {
        setPhoto(data.url);
        clublist.clubPicture = data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendPhotoOnClick = () => {
    console.log("idC", photo);
    //kenet string radineha objet bch yesta9belha (objeeet)
    const dataPhoto = { photo: photo };
    axios
      .patch(`http://localhost:5000/api/club/upload/${clublist._id}`, dataPhoto)

      .then(() => {
        Swal.fire(
          "updated!",
          "Your imaginary file has been updated.",
          "success"
        );
        dispatch(getClubs());
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="bgAcceuilCb">
        <div role="navigation" className="navLeftCb">
          {" "}
          <Link to="/">
            <img
              className="logoClub"
              src="/img/wecoepiLogo.png"
              alt="logo wecoepi"
            />
          </Link>
          <div className="image-up">
            <label htmlFor="imgInp" />
            <img id="blah" src={photo} />
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
          <SideBarProfilClub />
        </div>
        <div role="main" className="navMiddleCb">
          {" "}
          <div role="main" className="topCb"></div>
          <div role="main" className="buttomCb">
            <div>
              <img src={clublist.clubPicture} />
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
Club.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const idC = ownProps.match.params.idC;
  return { clubs: state.clubsRed.clubs.find((clubs) => clubs.idC === idC) };
};

export default connect(mapStateToProps, { getClubs })(Club);

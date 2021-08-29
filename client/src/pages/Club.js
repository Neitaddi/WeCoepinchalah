import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClubs } from "../js/actions/clubActions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import SideBarProfilClub from "../components/Club/SideBarProfilClub";
import "./Club.css";
// ........................................................

import { useDispatch, useSelector } from "react-redux";
import { uploadPictureClub } from "../js/actions/clubActions";
import { BsPersonBoundingBox } from "react-icons/bs";

// ........................................................

const Club = (props) => {
  const { club_id } = useParams();
  const [clublist, setClublist] = useState(props.clubs);
  // ..............................................

  const UploadImgClub = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const { club_id } = useParams();
    const handlePictureClub = (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("name", club_id);
      data.append("id", club_id);
      data.append("file", file);
      dispatch(uploadPictureClub(data, club_id));
    };
    return (
      <form action="" onSubmit={handlePictureClub} className="upload-pic">
        <div>
          <label className="labelImg" htmlFor="file">
            Changer l'image
          </label>
          <input
            className="changeImg"
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div>
          <label className="labelAddImg" htmlFor="submit">
            <BsPersonBoundingBox />
          </label>
          <input
            className="ajouterImg"
            type="submit"
            value="Envoyer"
            id="submit"
            name="submit"
          />
        </div>
      </form>
    );
  };
  // ...............................................

  useEffect(() => {
    props.getClubs().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs]);

  // const uploadImage = (event) => {
  //   event.preventDefault();

  //   const image = new FormData();

  //   image.append("file", event.target.files[0]);
  //   image.append("upload_preset", "tyfhc3lt");
  //   axios
  //     .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
  //     .then(({ data }) => {
  //       setPhoto(data.url);
  //     })
  //     .then(() => {
  //       axios.patch(`http://localhost:5000/api/club/${state.id}`, photo);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      {clublist
        .filter((club) => club._id === club_id)
        .map((club, index) => (
          <div key={index}>
            <div className="bgAcceuilCb">
              <div role="navigation" className="navLeftCb">
                {" "}
                <div></div>
                <Link to="/">
                  <img
                    className="logoClub"
                    src="/img/wecoepiLogo.png"
                    alt="logo wecoepi"
                  />
                </Link>
                {/* .............................................. */}
                <div className="divImg">
                  <img src={club.clubPicture} />
                  <UploadImgClub />
                </div>
                {/* ................................... */}
                <div>{club.clubName}</div>
                <SideBarProfilClub />
              </div>
              <div role="main" className="navMiddleCb">
                {" "}
                <div role="main" className="topCb"></div>
                <div role="main" className="buttomCb">
                  {" "}
                  <img src={club.createrId.clubPicture} alt="userpicture" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
Club.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state) => ({
  clubs: state.clubsRed.clubs,
});

export default connect(mapStateToProps, { getClubs })(Club);

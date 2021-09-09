import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClubs } from "../js/actions/clubActions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { ImFilePicture } from "react-icons/im";
import { HiOutlineSaveAs } from "react-icons/hi";
import "./Club.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FiHome } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";

// ........................................................

import { useDispatch, useSelector } from "react-redux";
import { uploadPictureClub } from "../js/actions/clubActions";
import { BsPersonBoundingBox } from "react-icons/bs";
import { UidContext } from "../components/AppContext";
import { isEmpty, timestampParser } from "../components/Profil/utils";
import { addPost, getPosts } from "../js/actions/postActions";
import Card from "../components/ThreadHome/Card";
import CardPostClub from "../components/Club/CardPostClub";

// ........................................................

const Club = (props) => {
  const [clublist, setClublist] = useState({});
  const [postes, setPostes] = useState(props.postes);
  const [photo, setPhoto] = useState("");
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  // const postes = useSelector((state) => state.postes.postes);
  console.log("postes", postes);
  console.log(userData);
  const idC = props.match.params.club_id;
  const dispatch = useDispatch();
  // ...............................................
  // pouuuuuuuuuuuuuuuuuuuuuuurrr Pooooooooost
  // ....................................

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const error = useSelector((state) => state.errorReducer.postError);

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("posterClub", idC);
      data.append("postMessage", message);
      if (file) data.append("file", file);
      data.append("video", video);

      await dispatch(addPost(data, idC));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  // ...............................................

  useEffect(() => {
    props.getClubs().then(() => {});
    props.getPosts();
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
    if (props.postes) {
      setPostes(props.postes);
    }
    // setPhoto(clublist.clubPicture);
  }, [props.clubs, photo, clublist, postes]);
  // console.log("clublist");

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
  console.log("userId", userData._id);
  console.log(clublist.createrId);

  return (
    <div>
      {clublist.createrId === userData._id ? (
        <div className="bgAcceuilCb">
          {/* // ................................................
        // .................user.......................
        // ................................................ */}
          <div role="navigation" className="navLeftCb">
            {" "}
            <Link to="/">
              <img
                className="logoClub"
                src="/img/wecoepiLogo.png"
                alt="logo wecoepi"
              />
            </Link>
            <div className="leftCont">
              <div className="image-up">
                <img
                  class="circular--club"
                  src={clublist.clubPicture}
                  alt="user-pic"
                />

                <div className="ModifierPhoto">
                  <label htmlFor="imgInp" className="imgInp">
                    modifier l'image
                  </label>
                  <input
                    id="imgInp"
                    type="file"
                    className="fichierAddImg"
                    onChange={(event) => uploadImage(event)}
                  />
                </div>
                <div>
                  <HiOutlineSaveAs
                    className="saveIcon"
                    onClick={sendPhotoOnClick}
                    htmlFor="submit"
                  />

                  <input
                    className="ajouterImg"
                    type="submit"
                    value="Envoyer"
                    id="submit"
                    name="submit"
                  />
                </div>
              </div>
              <div className="clubName">{clublist.clubName}</div>
            </div>
            {/* <div>{clublist.createrId._id}</div> */}
            {/* <SideBarProfilClub />
             */}
            {/* sidevar */}
            <nav className={"side-menu active"}>
              <ul className="side-menu-items">
                <li className="side-text">
                  <Link to={"/club/" + clublist._id} className="linkP">
                    <FiHome className="icons" />
                    <span className="title">Acceuil</span>
                  </Link>
                </li>
                <li className="side-text">
                  <Link to={"/clubinfo/" + clublist._id} className="linkP">
                    <IoPersonOutline className="icons" />
                    <span className="title">Profil</span>
                  </Link>
                </li>
                <li className="side-text">
                  <Link
                    to={"/clubdepartement/" + clublist._id}
                    className="linkP"
                  >
                    <AiOutlineTeam className="icons" />
                    <span className="title">Départements</span>
                  </Link>
                </li>
                <li className="side-text">
                  <Link to={"/clubtaches/" + clublist._id} className="linkP">
                    <HiOutlineClipboardList className="icons" />
                    <span className="title">Tâches</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div role="main" className="navMiddleCb">
            <div className="topCb">
              <div>
                {" "}
                <textarea
                  className="inputMessage"
                  name="message"
                  id="message"
                  placeholder="Quoi de neuf ?"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <div className="footer-form">
                  <div className="icon">
                    {isEmpty(video) && (
                      <>
                        <input
                          type="file"
                          id="fileupload"
                          name="file-upload"
                          className="ajt"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => handlePicture(e)}
                        />
                      </>
                    )}
                    {video && (
                      <label className="delete" onClick={() => setVideo("")}>
                        Supprimer video
                      </label>
                    )}
                  </div>
                  {!isEmpty(error.format) && <p>{error.format}</p>}
                  {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
                  <div className="btn-send">
                    {message || postPicture || video.length > 20 ? (
                      <label className="cancel" onClick={cancelPost}>
                        Annuler message
                      </label>
                    ) : null}
                    <label className="send" onClick={handlePost}>
                      Envoyer
                    </label>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div role="main" className="buttomC">
              {isLoading ? (
                <div>loading</div>
              ) : (
                <div className="formNewPost">
                  {message || postPicture || video.length > 20 ? (
                    <li className="card-container">
                      <div className="card-left">
                        <div className="circular--landscape">
                          <img
                            class="circular--photo"
                            src={clublist.clubPicture}
                            alt="user-pic"
                          />
                        </div>
                      </div>
                      <div className="card-right">
                        <div className="card-header">
                          <div className="pseudop">
                            <h3>{clublist.clubName}</h3>
                          </div>
                          <span className="timep">
                            {timestampParser(Date.now())}
                          </span>
                        </div>
                        <div className="content">
                          <p>{message}</p>
                          <img className="imgup" src={postPicture} alt="" />
                          {video && (
                            <iframe
                              src={video}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={video}
                            ></iframe>
                          )}
                        </div>
                      </div>
                    </li>
                  ) : null}
                </div>
              )}
              <div>
                {postes &&
                  postes
                    .filter((post) => post.posterClub === idC)
                    .map((post) => (
                      <div key={post._id}>
                        <CardPostClub
                          post={post}
                          clublist={clublist}
                          idC={idC}
                        />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ................................................
        // .................not user.......................
        // ................................................
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
            <div className="leftCont">
              <div className="image-up">
                <label htmlFor="imgInp" />
                <div className="circular--landscape">
                  <img
                    class="circular--clubs"
                    src={clublist.clubPicture}
                    alt="user-pic"
                  />
                </div>
              </div>
              <div className="clubName">{clublist.clubName}</div>
            </div>
            {/* <div>{clublist.createrId._id}</div> */}
            {/* <SideBarProfilClub />
             */}
            {/* sidevar */}
            <nav className={"side-menu active"}>
              <ul className="side-menu-items">
                <li className="side-text">
                  <Link to={"/club/" + clublist._id} className="linkP">
                    <FiHome className="icons" />
                    <span className="title">Acceuil</span>
                  </Link>
                </li>
                <li className="side-text">
                  <Link to={"/clubinfo/" + clublist._id} className="linkP">
                    <IoPersonOutline className="icons" />
                    <span className="title">Profil</span>
                  </Link>
                </li>
                <li className="side-text">
                  <Link
                    to={"/clubdepartement/" + clublist._id}
                    className="linkP"
                  >
                    <AiOutlineTeam className="icons" />
                    <span className="title">Départements</span>
                  </Link>
                </li>
                <li className="side-text">
                  <Link to={"/clubtaches/" + clublist._id} className="linkP">
                    <HiOutlineClipboardList className="icons" />
                    <span className="title">Tâches</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div role="main" className="navMiddleCb">
            {" "}
            <div role="main" className="buttomCb">
              {" "}
              <div>
                {postes &&
                  postes
                    .filter((post) => post.posterClub === idC)
                    .map((post) => (
                      <div key={post._id}>
                        <CardPostClub
                          post={post}
                          clublist={clublist}
                          idC={idC}
                        />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
Club.propTypes = {
  getClubs: PropTypes.func,
  getPosts: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  const idC = ownProps.match.params.club_id;

  return {
    clubs: state.clubs.clubs.find((clubb) => clubb._id === idC),
    postes: state.postes.postes,
  };
};

export default connect(mapStateToProps, { getClubs, getPosts })(Club);

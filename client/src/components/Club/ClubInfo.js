import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

// import "./Club.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FiHome } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";

// ........................................................

import { useDispatch, useSelector } from "react-redux";
// import { uploadPictureClub } from "../js/actions/clubActions";
import { BsPersonBoundingBox } from "react-icons/bs";
import CardClubInfo from "./CardClubInfo";
import "./ClubInfo.css";
// ........................................................

const ClubInfo = (props) => {
  const [clublist, setClublist] = useState({});
  const [photo, setPhoto] = useState("");
  // ..............................................
  const usersData = useSelector((state) => state.usersReducer);
  const clubs = useSelector((state) => state.clubs.clubs);
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
    // setPhoto(clublist.clubPicture);
  }, [props.clubs, photo]);

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
          <div className="cadrePhoto">
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
            <div className="clubNameInfo">{clublist.clubName}</div>
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
                <Link to={"/clubdepartement/" + clublist._id} className="linkP">
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

        <div role="main" className="BottomRightDepartmentt">
          <div>
            {usersData.map((user) => {
              if (clublist.createrId === user._id)
                return (
                  <CardClubInfo user={user} clublist={clublist} idC={idC} />
                );
            })}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
ClubInfo.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log("ownProps", ownProps);
  const idC = ownProps.match.params.club_id;
  return { clubs: state.clubs.clubs.find((club) => club._id === idC) };
};

export default connect(mapStateToProps, { getClubs })(ClubInfo);

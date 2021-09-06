import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { getDepartments } from "../../js/actions/departementActions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./ClubDepartement.css";
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
import CardDepartment from "./CardDepartment";

// ........................................................

const ClubDepartement = (props) => {
  const [clublist, setClublist] = useState({});
  const [department, setDepartment] = useState({});
  const [photo, setPhoto] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  console.log("usersData", usersData);
  // ..............................................

  const idC = props.match.params.idC;
  const dispatch = useDispatch();
  // ...............................................

  useEffect(() => {
    props.getClubs().then(() => {});
    props.getDepartments().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs, photo]);
  console.log("clublist", clublist);

  useEffect(() => {
    if (props.departments) {
      setDepartment(props.departments);
    }
  }, [props.departments]);
  console.log("depart", department);

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
          <div className="clubPage">
            <div className="circular--landscape">
              <img
                class="circular--clubs"
                src={clublist.clubPicture}
                alt="user-pic"
              />
            </div>
            <div className="clubNamePage">{clublist.clubName}</div>
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
        <div role="main" className="rightDepartmentInfo">
          {" "}
          <div className="TopRightDepartmentInfo">
            {usersData &&
              usersData.map((user) => {
                if (user._id === clublist.createrId)
                  return (
                    <div className="containeDepartmentInfo">
                      <div className="circular--landscape">
                        <img
                          class="circular--Boss"
                          src={user.userPicture}
                          alt="user-pic"
                        />
                      </div>
                      <div>
                        <div className="departmentNameInfo">President</div>
                        <div className="departmentBossInfo">
                          {user.userName}
                          {user.userLastName}
                        </div>
                      </div>

                      <Link to={"/createdepartment/" + clublist._id}>
                        <label className="buttonAjouterDepartment">
                          Ajouter un Département
                        </label>
                      </Link>
                    </div>
                  );
              })}
          </div>
          <div role="main" className="BottomRightDepartmentInfo">
            <div className="departmentCart">
              {clublist.clubDepartments &&
                clublist.clubDepartments.map((dep) => {
                  for (let i = 0; i < department.length; i++) {
                    if (dep === department[i]._id)
                      return (
                        <CardDepartment
                          department={department[i]}
                          clublist={clublist}
                          idC={idC}
                        />
                      );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ClubDepartement.propTypes = {
  getClubs: PropTypes.func,
  getDepartments: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const idC = ownProps.match.params.club_id;

  return {
    clubs: state.clubs.clubs.find((club) => club._id === idC),
    departments: state.departments.departments,
  };
};

export default connect(mapStateToProps, { getClubs, getDepartments })(
  ClubDepartement
);

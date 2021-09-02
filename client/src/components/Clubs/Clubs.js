import React, { useState, useEffect } from "react";
import ReginterModalClub from "./Log/RegisterModalClub";
import { MdLocationOn } from "react-icons/md";
import { BsAward } from "react-icons/bs";
import { getClubs } from "../../js/actions/clubActions";
import "./Clubs.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";

import ClubUser from "../Club/clubUser";

const Clubs = (props) => {
  // const club = useSelector((state) => state.clubReducer);
  // const initialState = useSelector((state) => state.clubReducer);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [clublist, setClublist] = useState(props.clubs);
  useEffect(() => {
    props.getClubs().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs]);
  // console.log("clublist3", clublist);

  // const pushUserClick = (id) => {
  //   props.history.push({
  //     pathname: `/club/${id}`,
  //     state: { id: _id, club: club }, // your data array of objects
  //   });
  // };

  //useState login
  const [showReginterModalClub, setShowReginterModalClub] = useState(false);
  //reff openReginterModalClub
  const openReginterModalClub = () => {
    setShowReginterModalClub((prev) => !prev);
  };
  const LogLinks = (
    <label className="createClub" onClick={openReginterModalClub}>
      {" "}
      Créer un Club
    </label>
  );

  return (
    <div className="bgAcceuilCbs">
      <ReginterModalClub
        showReginterModalClub={showReginterModalClub}
        setShowReginterModalClub={setShowReginterModalClub}
      />
      <div role="navigation" className="navBarClbs">
        <Link to="/home">
          <img
            className="logoSite"
            src="/img/wecoepiLogo.png"
            alt="logo wecoepi"
          />
        </Link>
        {LogLinks}
      </div>

      <div className="tabs">
        <input type="radio" name="tab-btn" id="tab-btn-1" value="" checked />
        <label for="tab-btn-1">Vos Clubs</label>
        <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
        <label for="tab-btn-2">Clubs</label>
        {/* <ClubUser /> */}
        <div id="content-1">
          <div className="scrollber">
            {clublist &&
              clublist
                .filter((club) => club.createrId === userData._id)
                .map((club, index) => (
                  <div key={index}>
                    <Link
                      to={"/club/" + club._id}
                      style={{ color: "inherit" }}
                      className="goToClubPageProfil"
                    >
                      <div className="loveu">
                        <div className="nameAndPic">
                          <div className="circular--landscape">
                            <img
                              class="circular--clubs"
                              src={club.clubPicture}
                              alt="user-pic"
                            />
                          </div>
                        </div>

                        <div className="clubInfo">
                          <div className="clubNameList">{club.clubName}</div>
                          <div className="categorieclub">
                            <div className="icon">
                              <BsAward />
                            </div>
                            <div className="clubCategoriList">
                              {club.clubCategorie}
                            </div>
                          </div>

                          <div className="locationclub">
                            {" "}
                            <div className="icon">
                              <MdLocationOn />
                            </div>
                            <div className="clubLocationList">
                              {club.clubLocatioun}
                            </div>
                          </div>
                          <div className="createrClub">
                            <div className="circular--landscape">
                              <img
                                class="circular--userPcc"
                                src={userData.userPicture}
                                alt="user-pic"
                              />
                            </div>

                            <div className="clubuserLastName">
                              {userData.userLastName}
                            </div>
                            <div className="clubuserName">
                              {userData.userName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
        {/* <AllClubs /> */}
        <div id="content-2">
          <div className="scrollber">
            {clublist.map((club) => {
              for (let i = 0; i < usersData.length; i++) {
                if (club.createrId === usersData[i]._id)
                  return (
                    <Link
                      to={`/club/${club._id}`}
                      style={{ color: "inherit" }}
                      className="goToClubPage"
                    >
                      <div className="loveu">
                        <div className="nameAndPic">
                          <div className="circular--landscape">
                            <img
                              class="circular--clubs"
                              src={club.clubPicture}
                              alt="user-pic"
                            />
                          </div>
                        </div>

                        <div className="clubInfo">
                          <div className="clubNameList">{club.clubName}</div>
                          <div className="categorieclub">
                            <div className="icon">
                              <BsAward />
                            </div>
                            <div className="clubCategoriList">
                              {club.clubCategorie}
                            </div>
                          </div>

                          <div className="locationclub">
                            {" "}
                            <div className="icon">
                              <MdLocationOn />
                            </div>
                            <div className="clubLocationList">
                              {club.clubLocatioun}
                            </div>
                          </div>
                          <div className="createrClub">
                            <div className="circular--landscape">
                              <img
                                class="circular--userPcc"
                                src={usersData[i].userPicture}
                                alt="user-pic"
                              />
                            </div>

                            <div className="clubuserLastName">
                              {usersData[i].userLastName}
                            </div>
                            <div className="clubuserName">
                              {usersData[i].userName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
Clubs.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state) => ({
  clubs: state.clubs.clubs,
});

export default connect(mapStateToProps, { getClubs })(Clubs);

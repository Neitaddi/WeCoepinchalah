import "./navMiddleProfil.css";
import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { IoMailOutline } from "react-icons/io5";
import { dateParser } from "./utils";
import ModelFollowing from "./ModelFollowing";
import ModelFollowers from "./ModelFollowers";
import ModelUserClubs from "./ModelUserClubs";
import { getClubs } from "../../js/actions/clubActions";
import PropTypes from "prop-types";

const NavMiddleProfil = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [clublist, setClublist] = useState(props.clubs);
  useEffect(() => {
    props.getClubs().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs]);
  console.log("lista", clublist);
  //useState ModelFollowing
  const [showModelFollowing, setShowModelFollowing] = useState(false);
  //reff openModelFollowing
  const openModelFollowing = () => {
    setShowModelFollowing((prev) => !prev);
  };
  //useState ModelFollowers
  const [showModelFollowers, setShowModelFollowers] = useState(false);
  //reff openModelFollowers
  const openModelFollowers = () => {
    setShowModelFollowers((prev) => !prev);
  };

  //useState ModelUserClubs
  const [showModelUserClubs, setShowModelUserClubs] = useState(false);
  //reff openModelUserClubs
  const openModelUserClubs = () => {
    setShowModelUserClubs((prev) => !prev);
  };

  return (
    <div className="userInoProfil">
      <ModelFollowing
        showModelFollowing={showModelFollowing}
        setShowModelFollowing={setShowModelFollowing}
      />
      <ModelFollowers
        showModelFollowers={showModelFollowers}
        setShowModelFollowers={setShowModelFollowers}
      />
      <ModelUserClubs
        showModelUserClubs={showModelUserClubs}
        setShowModelUserClubs={setShowModelUserClubs}
      />

      <div className="compUserNameProfil">
        <div className="userNameProfil">
          <h3>{userData.userName}</h3>
        </div>
        <div className="userLastNameProfil">
          <h3>{userData.userLastName}</h3>
        </div>
      </div>
      <div className="userBioProfil">{userData.userBio}</div>
      <div className="userEmailProfil">
        {" "}
        <IoMailOutline />
        {userData.userEmail}
      </div>
      <div className="userFlwProfil">
        <div className="userFlowingProfil">{userData.userFollowing}</div>
        <div className="userFlowersProfil">{userData.userFollowers}</div>
      </div>
      <div className="date">
        Membre depuis le : {dateParser(userData.createdAt)}
      </div>

      <div className="flow">
        {" "}
        <div className="followwing" onClick={openModelFollowing}>
          Abonnements: {userData.userFollowing && userData.userFollowing.length}
        </div>
        <div className="followers" onClick={openModelFollowers}>
          Abonnés: {userData.userFollowers && userData.userFollowers.length}
        </div>
      </div>

      <div className="userClubss" onClick={openModelUserClubs}>
        créateur de: {userData.userClubs && userData.userClubs.length} Club(s){" "}
      </div>
    </div>
  );
};
NavMiddleProfil.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state) => ({
  clubs: state.clubsRed.clubs,
});

export default connect(mapStateToProps, { getClubs })(NavMiddleProfil);

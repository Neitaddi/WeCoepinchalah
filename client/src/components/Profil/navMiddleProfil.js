import "./navMiddleProfil.css";
import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { IoMailOutline } from "react-icons/io5";
import { dateParser } from "./utils";
import ModelFollowing from "./ModelFollowing";
import ModelFollowers from "./ModelFollowers";
import ModelUserClubs from "./ModelUserClubs";
import { getClubs } from "../../js/actions/clubActions";
import { getDepartments } from "../../js/actions/departementActions";
import PropTypes from "prop-types";

const NavMiddleProfil = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [clublist, setClublist] = useState(props.clubs);
  const [department, setDepartment] = useState(props.departments);
  useEffect(() => {
    props.getClubs().then(() => {});
    props.getDepartments().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs]);

  console.log("lista", clublist);
  useEffect(() => {
    if (props.departments) {
      setDepartment(props.departments);
    }
  }, [props.departments]);
  console.log("departmentP", department);
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
        <div className="userClubss" onClick={openModelFollowing}>
          Chéf département dans..
        </div>
        <div className="userClubss" onClick={openModelFollowers}>
          Membre dans ..
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
  getDepartments: PropTypes.func,
};
const mapStateToProps = (state) => ({
  clubs: state.clubs.clubs,
  departments: state.departments.departments,
});

export default connect(mapStateToProps, { getClubs, getDepartments })(
  NavMiddleProfil
);

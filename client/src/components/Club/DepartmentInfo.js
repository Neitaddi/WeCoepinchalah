import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { getDepartments } from "../../js/actions/departementActions";
import { BsInfoCircle } from "react-icons/bs";
import { BsAward } from "react-icons/bs";
import { GiQueenCrown } from "react-icons/gi";
import "./DepartmentInfo.css";
import { Link } from "react-router-dom";
const DepartmentInfo = (props) => {
  const [clublist, setClublist] = useState(props.clubs);
  const [department, setDepartment] = useState({});
  const usersData = useSelector((state) => state.usersReducer);
  console.log("usersData", usersData);
  const idD = props.match.params.department_id;
  console.log("idD", idD);
  console.log("clublist", clublist);
  useEffect(() => {
    props.getClubs().then(() => {});
    props.getDepartments().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs]);
  console.log("clublist", clublist);

  useEffect(() => {
    if (props.departments) {
      setDepartment(props.departments);
    }
  }, [props.departments]);
  console.log("depart", department);

  return (
    <div className="departmentInfo">
      <div className="leftDepartmentInfo">
        {clublist &&
          clublist.map((club) => {
            if (club._id === department.departmentClub)
              return (
                <div className="styleLeftDepartmentInfo">
                  <Link to={`/`}>
                    {" "}
                    <img className="logoAcc" src="/img/wecoepiLogo.png" />
                  </Link>
                  <div className="circular--landscape">
                    <img
                      class="circular--clubs"
                      src={club.clubPicture}
                      alt="user-pic"
                    />
                  </div>
                  <div className="clubNameDepartmentInfo">{club.clubName}</div>
                  <div className="StyleRoleDepartmentInfo">
                    <BsInfoCircle />
                    <div className="roleDepartmentInfo">
                      {department.departmentRole}
                    </div>
                  </div>
                </div>
              );
          })}
      </div>
      <div className="rightDepartmentInfo">
        <div className="TopRightDepartmentInfo">
          {usersData &&
            usersData.map((user) => {
              if (user._id === department.departmentBoss)
                return (
                  <div className="containeTopRightDepartmentInfo">
                    <div className="containeDepartmentInfo">
                      <div className="circular--landscape">
                        <img
                          class="circular--Boss"
                          src={user.userPicture}
                          alt="user-pic"
                        />
                      </div>
                      <div>
                        <div className="departmentNameInfo">
                          {department.departmentDescription}
                        </div>
                        <div className="departmentBossInfo">
                          {user.userName}
                          {user.userLastName}
                        </div>
                      </div>
                    </div>
                    <label className="buttonAjouterMembre">
                      Ajouter un Membre
                    </label>
                  </div>
                );
            })}
        </div>
        <div className="BottomRightDepartmentInfo">hiin</div>
      </div>
    </div>
  );
};

DepartmentInfo.propTypes = {
  getClubs: PropTypes.func,
  getDepartments: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log("ownProps", ownProps);
  const idD = ownProps.match.params.department_id;
  console.log("idd", idD);

  return {
    clubs: state.clubs.clubs,
    departments: state.departments.departments.find(
      (department) => department._id === idD
    ),
  };
};

export default connect(mapStateToProps, { getClubs, getDepartments })(
  DepartmentInfo
);

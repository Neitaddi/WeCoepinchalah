import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import {
  deleteDepartment,
  getDepartments,
} from "../../js/actions/departementActions";
import CardMembre from "./CardMembre";
import { getMembres } from "../../js/actions/membreActions";
import { BsInfoCircle } from "react-icons/bs";
import { BsAward } from "react-icons/bs";
import { GiQueenCrown } from "react-icons/gi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import "./DepartmentInfo.css";
import { Link } from "react-router-dom";
const DepartmentInfo = (props) => {
  const [clublist, setClublist] = useState(props.clubs);
  const [membres, setMembres] = useState(props.membres);
  const [department, setDepartment] = useState({});
  const usersData = useSelector((state) => state.usersReducer);
  console.log("usersData", usersData);
  const idD = props.match.params.department_id;
  // console.log("idD", idD);
  // console.log("clublist", clublist);

  useEffect(() => {
    props.getClubs().then(() => {});
    props.getDepartments().then(() => {});
    props.getMembres().then(() => {});
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
  useEffect(() => {
    if (props.membres) {
      setMembres(props.membres);
    }
  }, [props.membres]);
  console.log("membres", membres);
  const dispatch = useDispatch();
  const handleDelete = () =>
    dispatch(deleteDepartment(idD, department.departmentClub));
  console.log("department.departmentClub", department.departmentClub);

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
                    <div>
                      <Link to={"/createmembre/" + department._id}>
                        <label className="buttonAjouterMembre">
                          Ajouter un Membre
                        </label>
                      </Link>
                      <Link to={"/updatedepartment/" + department._id}>
                        <HiOutlinePencilAlt />
                      </Link>

                      <span
                        onClick={() => {
                          if (
                            window.confirm(
                              `Voulez-vous supprimer le departement ${department.departmentDescription} ?`
                            )
                          ) {
                            handleDelete();
                          }
                        }}
                      >
                        <AiOutlineDelete />
                      </span>
                    </div>
                  </div>
                );
            })}
        </div>
        <div className="BottomRightDepartmentInfo">
          <div className="departmentCart">
            {department.departmentMember &&
              department.departmentMember.map((membre) => {
                for (let i = 0; i < membres.length; i++) {
                  if (membre === membres[i]._id)
                    return (
                      <CardMembre
                        membre={membres[i]}
                        clublist={clublist}
                        department={department}
                        idD={idD}
                      />
                    );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

DepartmentInfo.propTypes = {
  getClubs: PropTypes.func,
  getDepartments: PropTypes.func,
  getMembres: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  // console.log("ownProps", ownProps);
  const idD = ownProps.match.params.department_id;
  // console.log("idd", idD);

  return {
    clubs: state.clubs.clubs,
    departments: state.departments.departments.find(
      (department) => department._id === idD
    ),
    membres: state.membres.membres,
  };
};

export default connect(mapStateToProps, {
  getClubs,
  getDepartments,
  getMembres,
})(DepartmentInfo);

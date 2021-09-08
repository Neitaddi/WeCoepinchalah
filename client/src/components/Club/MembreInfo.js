import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { getDepartments } from "../../js/actions/departementActions";
import { getMembres } from "../../js/actions/membreActions";
import "./MembreInfo.css";
import { Link } from "react-router-dom";
import { dateParser } from "../Profil/utils";
const MembreInfo = (props) => {
  const [membres, setMembres] = useState({});
  const [department, setDepartment] = useState(props.departments);
  const usersData = useSelector((state) => state.usersReducer);
  console.log("usersData22", usersData);
  const idM = props.match.params.membre_id;
  console.log("idM", idM);
  useEffect(() => {
    props.getDepartments().then(() => {});
    props.getMembres().then(() => {});
  }, []);

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

  return (
    <div className="membreCartinfo">
      <Link to="/">
        <img
          className="membrelogo"
          src="/img/wecoepiLogo.png"
          alt="logo wecoepi"
        />
      </Link>
      <div className="cardCenter">
        <div>
          {usersData &&
            usersData.map((user) => {
              if (user._id === membres.membreBoss)
                return (
                  <div className="userDataMembre">
                    <div className="circular--landscape">
                      <img
                        class="circular--clubs"
                        src={user.userPicture}
                        alt="user-pic"
                      />
                    </div>
                    <div className="userNames">
                      <div className="names">{user.userName}</div>
                      <div>{user.userLastName}</div>
                    </div>
                  </div>
                );
            })}
        </div>
        {department &&
          department.map((dep) => {
            for (let i = 0; i < dep.departmentMember.length; i++) {
              if (dep.departmentMember[i] === idM)
                return (
                  <div className="memDataMembre">
                    {" "}
                    <div className="depName">
                      Departement :{dep.departmentDescription}
                    </div>
                    <div className="memRole"> {membres.membreRole}</div>
                    <div className="tempDe">
                      Membre depuis : {dateParser(membres.createdAt)}
                    </div>
                  </div>
                );
            }
          })}
      </div>
    </div>
  );
};

MembreInfo.propTypes = {
  getDepartments: PropTypes.func,
  getMembres: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log("ownProps", ownProps);
  const idM = ownProps.match.params.membre_id;
  // console.log("idM", idM);

  return {
    departments: state.departments.departments,
    membres: state.membres.membres.find((department) => department._id === idM),
  };
};

export default connect(mapStateToProps, {
  getDepartments,
  getMembres,
})(MembreInfo);

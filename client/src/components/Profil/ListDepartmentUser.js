import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { getDepartments } from "../../js/actions/departementActions";
import PropTypes from "prop-types";
const ListDepartmentUser = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  console.log("usersData", usersData);
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
  console.log("listaP", clublist);

  useEffect(() => {
    if (props.departments) {
      setDepartment(props.departments);
    }
  }, [props.departments]);
  console.log("departmentP", department);
  return (
    <div>
      <h6 className="usertitle"> {userData.userName} chef départment dans :</h6>
      {department &&
        department
          .filter((dep) => dep.departmentBoss === userData._id)
          .map((dep) => {
            for (let i = 0; i < clublist.length; i++) {
              for (let j = 0; j < clublist[i].clubDepartments.length; j++) {
                if (clublist[i].clubDepartments[j] === dep._id)
                  return (
                    <div>
                      <li key={clublist[i]._id} className="clubli">
                        {/* <img className="mapClubImg" src={club.clubPicture} /> */}

                        <div className="circular--landscape">
                          <img
                            class="circular--photo"
                            src={clublist[i].clubPicture}
                            alt="user-pic"
                          />
                        </div>
                        <div className="mapClubClubName">
                          {clublist[i].clubName}
                        </div>
                        <div className="mapClubCategorie">
                          <span className="depSpan"> Departement:</span>{" "}
                          {dep.departmentDescription}
                        </div>
                        <div className="mapClubLocalioun">
                          {/* à {club.clubLocatioun} */}
                        </div>
                      </li>
                    </div>
                  );
              }
            }
          })}
    </div>
  );
};

ListDepartmentUser.propTypes = {
  getClubs: PropTypes.func,
  getDepartments: PropTypes.func,
};
const mapStateToProps = (state) => ({
  clubs: state.clubs.clubs,
  departments: state.departments.departments,
});

export default connect(mapStateToProps, { getClubs, getDepartments })(
  ListDepartmentUser
);

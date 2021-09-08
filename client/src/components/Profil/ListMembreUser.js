import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { getDepartments } from "../../js/actions/departementActions";
import { getMembres } from "../../js/actions/membreActions";
import PropTypes from "prop-types";
const ListMembreUser = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  console.log("usersData11", usersData);
  const userData = useSelector((state) => state.userReducer);
  const [clublist, setClublist] = useState(props.clubs);
  const [department, setDepartment] = useState(props.departments);
  const [membres, setMembres] = useState(props.membres);

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
  console.log("lista11", clublist);
  useEffect(() => {
    if (props.membres) {
      setMembres(props.membres);
    }
  }, [props.membres]);
  console.log("membre11", membres);

  useEffect(() => {
    if (props.departments) {
      setDepartment(props.departments);
    }
  }, [props.departments]);
  console.log("department11", department);
  return (
    <div>
      {" "}
      {membres &&
        membres
          .filter((membre) => membre.membreBoss === userData._id)
          .map((membre) => {
            for (let i = 0; i < department.length; i++) {
              for (let j = 0; j < department[i].departmentMember.length; j++) {
                if (department[i].departmentMember[j] === membre._id)
                  for (let k = 0; k < clublist.length; k++) {
                    for (
                      let l = 0;
                      l < clublist[k].clubDepartments.length;
                      l++
                    ) {
                      if (clublist[k].clubDepartments[l] === department[i]._id)
                        return (
                          <div>
                            <li className="clubli">
                              {/* <img className="mapClubImg" src={club.clubPicture} /> */}

                              <div className="circular--landscape">
                                <img
                                  class="circular--photo"
                                  src={clublist[k].clubPicture}
                                  alt="user-pic"
                                />
                              </div>
                              <div className="mapClubClubName">
                                {clublist[k].clubName}
                              </div>
                              <div className="mapClubCategorie">
                                <span className="depSpan"> Departement:</span>{" "}
                                {department[i].departmentDescription}
                              </div>
                              <div className="mapClubLocalioun">
                                {/* à {club.clubLocatioun} */}
                              </div>
                            </li>
                          </div>
                        );
                    }
                  }
              }
            }
          })}
    </div>
  );
};

ListMembreUser.propTypes = {
  getClubs: PropTypes.func,
  getDepartments: PropTypes.func,
  getMembres: PropTypes.func,
};
const mapStateToProps = (state) => ({
  clubs: state.clubs.clubs,
  departments: state.departments.departments,
  membres: state.membres.membres,
});

export default connect(mapStateToProps, {
  getClubs,
  getDepartments,
  getMembres,
})(ListMembreUser);

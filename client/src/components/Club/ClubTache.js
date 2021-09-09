import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "./../../js/actions/departementActions";
import { getMembres } from "./../../js/actions/membreActions";
import { getTaches } from "./../../js/actions/tacheActions";
import { dateParser } from "../Profil/utils";
import _ from "lodash";
import "./ClubTache.css";
const ClubTache = (props) => {
  const [clublist, setClublist] = useState({});
  const [departments, setDepartments] = useState(props.departments);
  const [membres, setMembres] = useState(props.membres);
  const [taches, setTache] = useState(props.taches);
  const [paginatedTaches, setPaginatedTaches] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4.9;

  const idC = props.match.params.club_id;
  console.log("idC", idC);
  const dispatch = useDispatch();

  useEffect(() => {
    props.getClubs().then(() => {});
    props.getDepartments().then(() => {});
    props.getMembres().then(() => {});
    props.getTaches().then(() => {});
  }, []);

  useEffect(() => {
    if (props.taches) {
      setTache(props.taches);
      setPaginatedTaches(_(props.taches).slice(0).take(pageSize).value());
    }
  }, [props.taches]);
  console.log("taches", taches);

  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs]);
  console.log("clubs", clublist);

  useEffect(() => {
    if (props.departments) {
      setDepartments(props.departments);
    }
  }, [props.departments]);
  console.log("departments", departments);
  useEffect(() => {
    if (props.membres) {
      setMembres(props.membres);
    }
  }, [props.membres]);
  const tacheClub = taches.filter((tache) => tache.tacheClub === idC);
  console.log(tacheClub);
  console.log("membres", membres);
  const pageCount = tacheClub ? Math.ceil(tacheClub.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedTache = _(tacheClub)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedTaches(paginatedTache);
  };
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
          <div role="main" className="TopRightDepartmentInfo">
            <div className="topTache">
              <h2 className="teteTache">Tâches</h2>

              {/* <input
                className="inputSearchTache"
                id="inputClub"
                type="text"
                placeholder="Recherche"
              /> */}
            </div>
            <nav className="d-flex justify-content-center">
              <ul className="pagination ">
                {pages.map((page) => (
                  <li
                    className={
                      page === currentPage ? "page-item active" : "page-item"
                    }
                  >
                    <p className="page-link" onClick={() => pagination(page)}>
                      {page}
                    </p>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div role="main" className="BottomRightDepartmentInfo">
            {!paginatedTaches ? (
              "Pas de taches"
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>date </th>
                    <th>Département</th>
                    <th>Objet</th>
                    <th>Tâche</th>
                    <th>Deadline</th>
                    <th>button</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTaches &&
                    paginatedTaches
                      .filter((tache) => tache.tacheClub === idC)
                      .map((tache, index) => (
                        <tr key={index}>
                          <td className="dateTache">
                            {dateParser(tache.createdAt)}
                          </td>

                          <td>
                            {departments &&
                              departments
                                .filter(
                                  (dep) => dep._id === tache.tacheDepartment
                                )
                                .map((dep) => (
                                  <div>{dep.departmentDescription}</div>
                                ))}
                          </td>
                          <td>{tache.tacheObjet}</td>
                          <td>{tache.tacheDescription}</td>
                          <td>{tache.tacheEnd}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
ClubTache.propTypes = {
  getClubs: PropTypes.func,
  getDepartments: PropTypes.func,
  getMembres: PropTypes.func,
  getTaches: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  const idC = ownProps.match.params.club_id;
  console.log("idC1", idC);
  return {
    clubs: state.clubs.clubs.find((club) => club._id === idC),
    departments: state.departments.departments,
    membres: state.membres.membres,
    taches: state.taches.taches,
  };
};

export default connect(mapStateToProps, {
  getClubs,
  getDepartments,
  getMembres,
  getTaches,
})(ClubTache);

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addDepartment } from "../../js/actions/departementActions";
const CreateDepartment = (props) => {
  const [clublist, setClublist] = useState({});
  const [departmentName, setDepartmentName] = useState("");
  const [departmentBoss, setDepartmentBoss] = useState("");
  const [departmentRole, setDepartmentRole] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  console.log("user", usersData);
  console.log("userData", userData.userEmail);
  const idC = props.match.params.club_id;

  //   console.log("idC", idC);
  useEffect(() => {
    props.getClubs().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs]);

  const dispatch = useDispatch();
  const getEmailBoss = (e) => {
    const searchEmail = e.target.value;
    console.log("e.target.value", searchEmail);
    const filterEmail = usersData
      .filter((user) => user.userEmail === searchEmail)
      .map((user) => {
        return user._id;
      });
    setDepartmentBoss(filterEmail);
    console.log("filterEmailjdidi", filterEmail);
  };

  const handleCreteClub = async (e) => {
    e.preventDefault();

    dispatch(
      addDepartment(
        userData._id,
        idC,
        departmentBoss,
        departmentName,
        departmentRole
      )
    );
  };

  //   console.log("clublist1", clublist);
  return (
    <div>
      <form className="formDepartment">
        <Link to="/">
          <img
            className="logoDepAcc"
            src="/img/wecoepiLogo.png"
            alt="logo wecoepi"
          />
        </Link>
        <div className="labelDepartment">Créer un Département</div>
        <div>
          <input
            className="inputDepart"
            id="inputDepart"
            type="text"
            placeholder="L'Email de Chef Département (Obligatoire)"
            onChange={getEmailBoss}
            // value={departmentName}
          />
          <input
            className="inputDepart"
            id="inputDepartC"
            type="text"
            placeholder="Nom de Département (Obligatoire)"
            onChange={(e) => setDepartmentName(e.target.value)}
            value={departmentName}
          />
          <textarea
            className="textAria"
            placeholder="Description  (Obligatoire)"
            id="desc"
            name="desc"
            rows="5"
            cols="33"
            onChange={(e) => setDepartmentRole(e.target.value)}
            value={departmentRole}
          />
          <button className="btnCreateDepartment" onClick={handleCreteClub}>
            Créer un département
          </button>
        </div>
      </form>
    </div>
  );
};

CreateDepartment.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);

  const idC = ownProps.match.params.club_id;
  //   console.log(idC);

  return {
    clubs: state.clubs.clubs.find((club) => club._id === idC),
  };
};

export default connect(mapStateToProps, { getClubs })(CreateDepartment);

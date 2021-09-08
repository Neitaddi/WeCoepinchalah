import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDepartments } from "../../js/actions/departementActions";
import { addMembre } from "../../js/actions/membreActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CreateMembre = (props) => {
  const [department, setDepartment] = useState({});
  const idD = props.match.params.membre_id;
  console.log("idD", idD);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  console.log("user", usersData);
  console.log("userData", userData.userEmail);
  const [membreRole, setMembreRole] = useState("");
  const [membreBoss, setMembreBoss] = useState("");

  useEffect(() => {
    props.getDepartments().then(() => {});
  }, []);
  useEffect(() => {
    if (props.departments) {
      setDepartment(props.departments);
    }
  }, [props.departments]);
  console.log("department", department);

  const dispatch = useDispatch();
  const getEmailBoss = (e) => {
    const searchEmail = e.target.value;
    console.log("e.target.value", searchEmail);
    const filterEmail = usersData
      .filter((user) => user.userEmail === searchEmail)
      .map((user) => {
        return user._id;
      });
    setMembreBoss(filterEmail);
    console.log("filterEmailjdidi", filterEmail);
  };

  const handleCreteClub = async (e) => {
    e.preventDefault();

    dispatch(addMembre(userData._id, idD, membreBoss, membreRole));
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
        <div className="labelDepartment">Créer un Membre</div>
        <div className="centerform">
          <input
            className="inputDepart"
            id="inputDepart"
            type="text"
            placeholder="L'Email de Chef Département (Obligatoire)"
            onChange={getEmailBoss}
            // value={departmentName}
          />

          <textarea
            className="textAriaDep"
            placeholder="Description  (Obligatoire)"
            id="desc"
            name="desc"
            rows="5"
            cols="33"
            onChange={(e) => setMembreRole(e.target.value)}
            // value={membreRole}
          />
          <label className="btnCreateDepartment" onClick={handleCreteClub}>
            Créer un département
          </label>
        </div>
      </form>
    </div>
  );
};

CreateMembre.propTypes = {
  getDepartments: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);

  const idD = ownProps.match.params.membre_id;
  //   console.log("idD", idD);

  return {
    departments: state.departments.departments.find(
      (department) => department._id === idD
    ),
  };
};

export default connect(mapStateToProps, { getDepartments })(CreateMembre);

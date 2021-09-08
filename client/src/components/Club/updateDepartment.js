import React, { useContext, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  getDepartments,
  updateDepartment,
} from "../../js/actions/departementActions";
import { UidContext } from "../AppContext";
import { Link } from "react-router-dom";

const UpdateDepartment = (props) => {
  const idD = props.match.params.department_id;
  console.log("idDp", idD);

  const [departmentName, setDepartmentName] = useState("");
  const [departmentBoss, setDepartmentBoss] = useState("");
  const [departmentRole, setDepartmentRole] = useState("");
  const [department, setDepartment] = useState({});

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    props.getDepartments().then(() => {});
  }, []);
  useEffect(() => {
    if (props.departments) {
      setDepartment(props.departments);
    }
  }, [props.departments]);
  console.log("depart", department);
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
  const dispatch = useDispatch();
  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(
      updateDepartment(idD, departmentBoss, departmentName, departmentRole)
    );
    setDepartmentName("");
    setDepartmentRole("");
    setDepartmentBoss("");
  };
  return (
    <div>
      <form className="formDepartment" onSubmit={handleEdit}>
        <Link to="/">
          <img
            className="logoDepAcc"
            src="/img/wecoepiLogo.png"
            alt="logo wecoepi"
          />
        </Link>
        <div className="labelDepartment">Edite un Département</div>
        <div className="centerform">
          {usersData &&
            usersData
              .filter((user) => user._id === department.departmentBoss)
              .map((user) => {
                return (
                  <input
                    className="inputDepart"
                    id="inputDepart"
                    type="text"
                    placeholder="L'Email de Chef Département (Obligatoire)"
                    onChange={getEmailBoss}
                    defaultValue={user.userEmail}
                    // value={departmentName}
                  />
                );
              })}
          <input
            className="inputDepart"
            id="inputDepart"
            type="text"
            placeholder="Nom de Département (Obligatoire)"
            onChange={(e) => setDepartmentName(e.target.value)}
            defaultValue={department.departmentDescription}
          />

          <textarea
            className="textAriaDep"
            id="desc"
            name="desc"
            rows="5"
            cols="33"
            onChange={(e) => setDepartmentRole(e.target.value)}
            defaultValue={department.departmentRole}
          />
          <button className="btnCreateDepartment">
            Modifier un département
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateDepartment.propTypes = {
  getDepartments: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log("ownProps", ownProps);
  const idD = ownProps.match.params.department_id;
  console.log("idd", idD);

  return {
    departments: state.departments.departments.find(
      (department) => department._id === idD
    ),
  };
};

export default connect(mapStateToProps, {
  getDepartments,
})(UpdateDepartment);

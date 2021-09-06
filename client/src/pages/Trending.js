import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";

import PropTypes from "prop-types";
import { getDepartments } from "../js/actions/departementActions";
import { useDispatch, useSelector, connect } from "react-redux";
const Trending = (props) => {
  const [department, setDepartment] = useState({});
  useEffect(() => {
    props.getDepartments().then(() => {});
  }, []);
  useEffect(() => {
    if (props.departments) {
      setDepartment(props.departments);
    }
  }, [props.departments]);

  return <div>hellow</div>;
};

Trending.propTypes = {
  getDepartments: PropTypes.func,
};
const mapStateToProps = (state) => ({
  departments: state.departments.departments,
});

export default connect(mapStateToProps, { getDepartments })(Trending);

import React, { useState, useEffect } from "react";

import { getClubs } from "../../js/actions/clubActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";

const ClubUser = (props) => {
  const userData = useSelector((state) => state.userReducer);

  const [clublist, setClublist] = useState(props.clubs);
  useEffect(() => {
    props.getClubs().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
    console.log("userData3", userData);
  }, [props.clubs]);
  console.log("clublist", clublist);
  return (
    <div>
      {clublist
        .filter((club) => club.createrId._id === userData._id)
        .map((club, index) => (
          <div key={index}>
            <div>{club.clubName}</div>
          </div>
        ))}
    </div>
  );
};

ClubUser.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state) => ({
  clubs: state.clubs.clubs,
});

export default connect(mapStateToProps, { getClubs })(ClubUser);

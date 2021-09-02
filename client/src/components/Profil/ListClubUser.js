import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import PropTypes from "prop-types";
import "./ListClubUser.css";
const ListClubUser = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  console.log("usersData", usersData);
  const userData = useSelector((state) => state.userReducer);
  const [clublist, setClublist] = useState(props.clubs);
  useEffect(() => {
    props.getClubs().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
  }, [props.clubs]);
  console.log("lista4", clublist);

  return (
    <div>
      <h6 className="usertitle">Les Clubs de {userData.userName} :</h6>
      {clublist &&
        clublist.map((club) => {
          for (let i = 0; i < userData.userClubs.length; i++) {
            if (club._id === userData.userClubs[i]) {
              return (
                <div>
                  <li key={club._id} className="clubli">
                    {/* <img className="mapClubImg" src={club.clubPicture} /> */}

                    <div className="circular--landscape">
                      <img
                        class="circular--photo"
                        src={club.clubPicture}
                        alt="user-pic"
                      />
                    </div>
                    <div className="mapClubClubName">{club.clubName}</div>
                    <div className="mapClubCategorie">{club.clubCategorie}</div>
                    <div className="mapClubLocalioun">
                      à {club.clubLocatioun}
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

ListClubUser.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state) => ({
  clubs: state.clubs.clubs,
});

export default connect(mapStateToProps, { getClubs })(ListClubUser);

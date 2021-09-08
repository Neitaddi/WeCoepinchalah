import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CardMembre.css";
const CardMembre = ({ membre, clublist, department, idD }) => {
  const usersData = useSelector((state) => state.usersReducer);
  console.log(usersData);
  return (
    <div className="cardDep">
      {usersData &&
        usersData.map((user) => {
          if (user._id === membre.membreBoss)
            return (
              <Link
                to={`/membreinfo/${membre._id}`}
                style={{ color: "inherit" }}
                className="goToClubPage"
              >
                <div className="formCardDep">
                  <div className="cleanCartMembre">
                    <div className="circular--landscape">
                      <img
                        class="circular--clubs"
                        src={user.userPicture}
                        alt="user-pic"
                      />
                    </div>

                    <div className="bossNameMembre">
                      {user.userLastName} {user.userName}{" "}
                    </div>
                  </div>
                </div>
              </Link>
            );
        })}
    </div>
  );
};

export default CardMembre;

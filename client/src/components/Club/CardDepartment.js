import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./CardDepartment.css";
const CardDepartment = ({ department, clublist, idC }) => {
  const usersData = useSelector((state) => state.usersReducer);
  console.log(usersData);
  return (
    <div className="cardDep">
      {usersData &&
        usersData.map((user) => {
          if (user._id === department.departmentBoss)
            return (
              <Link
                to={`/departmentinfo/${department._id}`}
                style={{ color: "inherit" }}
                className="goToClubPage"
              >
                <div className="formCardDep">
                  <div className="cleanCartDep">
                    <div className="circular--landscape">
                      <img
                        class="circular--clubs"
                        src={user.userPicture}
                        alt="user-pic"
                      />
                    </div>
                    <div className="departmentName">
                      {department.departmentDescription}
                    </div>

                    <div className="bossName">
                      {user.userLastName} {user.userName}{" "}
                    </div>
                    <div>Membre(s)</div>
                  </div>
                </div>
              </Link>
            );
        })}
    </div>
  );
};

export default CardDepartment;
// departmentBoss

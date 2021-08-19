import { Link } from "react-router-dom";

import "./SideBarProfilClub.css";

import React from "react";
import { DataSideBarProfilClub } from "./DataSideBarProfilClub";

function SideBarProfilClub() {
  return (
    <div>
      <nav className={"side-menu active"}>
        <ul className="side-menu-items">
          {DataSideBarProfilClub.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default SideBarProfilClub;

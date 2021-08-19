import { Link } from "react-router-dom";
import { sideBarData } from "./sideBarData";
import "./sideBar.css";
import React, { useContext, Consumer, useEffect } from "react";
import { UidContext } from "../AppContext";
import { sideBarDataCn } from "./sideBarDataCn";

function SideBar() {
  const uid = useContext(UidContext);
  useEffect(() => {
    console.log(uid);
  }, [uid]);

  return (
    <div>
      {uid ? (
        <nav className={"side-menu active"}>
          <ul className="side-menu-items">
            {sideBarDataCn.map((item, index) => {
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
      ) : (
        <nav className={"side-menu active"}>
          <ul className="side-menu-items">
            {sideBarData.map((item, index) => {
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
      )}
    </div>
  );
}

export default SideBar;

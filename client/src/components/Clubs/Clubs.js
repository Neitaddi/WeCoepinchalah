import React, { useState } from "react";
import ReginterModalClub from "./Log/RegisterModalClub";

import "./Clubs.css";

import { Link } from "react-router-dom";

const Clubs = () => {
  //useState login
  const [showReginterModalClub, setShowReginterModalClub] = useState(false);
  //reff openReginterModalClub
  const openReginterModalClub = () => {
    setShowReginterModalClub((prev) => !prev);
  };
  const LogLinks = (
    <button className="createClub" onClick={openReginterModalClub}>
      {" "}
      Connexion
    </button>
  );
  return (
    <div className="bgAcceuilCbs">
      <ReginterModalClub
        showReginterModalClub={showReginterModalClub}
        setShowReginterModalClub={setShowReginterModalClub}
      />
      <div role="navigation" className="navBarClbs">
        <Link to="/home">
          <img
            className="logoSite"
            src="/img/wecoepiLogo.png"
            alt="logo wecoepi"
          />
        </Link>
        {LogLinks}
      </div>

      <div className="tabs">
        <input type="radio" name="tab-btn" id="tab-btn-1" value="" checked />
        <label for="tab-btn-1">Vos Clubs</label>
        <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
        <label for="tab-btn-2">Clubs</label>

        <div id="content-1"></div>
        <div id="content-2">cont 1</div>
      </div>
    </div>
  );
};
export default Clubs;

// <div class="tabs">
//   <input type="radio" name="tab-btn" id="tab-btn-1" value="" checked />
//   <label for="tab-btn-1">Vos Clubs</label>
//   <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
//   <label for="tab-btn-2">Clubs</label>

//   <div id="content-1">Content 1...</div>
//   <div id="content-2">Content 2...</div>
// </div>

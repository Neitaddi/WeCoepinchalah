import React from "react";
import { Link } from "react-router-dom";

import "./Profil.css";

const Profil = () => {
  //validate user login
  // const uid = useContext(UidContext);

  return (
    <div className="bgAcceuilpf">
      <div role="navigation" className="navLeftpf">
        <Link to="/">
          <img src="/img/wecoepiLogo.png" alt="logo wecoepi" />
        </Link>
      </div>

      <div role="main" className="navMiddlepf"></div>
    </div>
  );
};

export default Profil;

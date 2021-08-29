import React from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Trending from "../../pages/Trending";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Club from "../../pages/Club";
import Clubs from "../Clubs/Clubs";

const index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/trending/:id" exact component={Trending} />
          <Route path="/club/:club_id" exact component={Club} />
          <Route path="/clubs" exact component={Clubs} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default index;

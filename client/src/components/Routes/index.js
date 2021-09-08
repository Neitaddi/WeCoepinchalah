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

import Clubs from "../Clubs/Clubs";
import ClubInfo from "../Club/ClubInfo";
import ClubDepartement from "../Club/ClubDepartement";
import ClubTache from "../Club/ClubTache";
import Club from "../../pages/Club";
import DepartmentInfo from "../Club/DepartmentInfo";
import CreateDepartment from "../Club/CreateDepartment";
import MembreInfo from "../Club/MembreInfo";
import CreateMembre from "../Club/CreateMembre";
import UpdateDepartment from "../Club/updateDepartment";
const index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/trending" exact component={Trending} />
          <Route path="/club/:club_id" exact component={Club} />
          <Route path="/clubs" exact component={Clubs} />
          <Route path="/clubinfo/:club_id" exact component={ClubInfo} />
          <Route
            path="/clubdepartement/:club_id"
            exact
            component={ClubDepartement}
          />
          <Route path="/clubtaches/:club_id" exact component={ClubTache} />
          <Route
            path="/departmentinfo/:department_id"
            exact
            component={DepartmentInfo}
          />
          <Route path="/membreinfo/:membre_id" exact component={MembreInfo} />
          <Route
            path="/createdepartment/:club_id"
            exact
            component={CreateDepartment}
          />
          <Route
            path="/updatedepartment/:department_id"
            exact
            component={UpdateDepartment}
          />
          <Route
            path="/createmembre/:membre_id"
            exact
            component={CreateMembre}
          />

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default index;

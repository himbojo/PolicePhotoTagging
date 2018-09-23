import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Protected from "../utils/protectedAuth";
import NavBar from "./objects/navBar";
import Login from "./Login/login";
import Upload from "./Upload/upload";
import Search from "./Search/search";
import Results from "./Search/results";
import Reg from "./Login/reg";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Protected(NavBar)} />
            <Route exact path="/login" component={Protected(Login)} />
            <Route exact path="/upload" component={Protected(Upload)} />
            <Route exact path="/search" component={Protected(Search)} />
            <Route exact path="/results" component={Protected(Results)} />
            <Route exact path="/reg" component={Reg} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);

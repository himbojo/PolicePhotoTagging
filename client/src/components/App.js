import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

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
            <Route exact path="/" component={NavBar} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/reg" component={Reg} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

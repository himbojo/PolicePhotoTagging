import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from "./objects/navBar";
import Login from "./Login/login";
import Upload from "./Upload/upload";
import Search from "./Search/search";
import Result from "./Search/results";

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
            <Route exact path="/result" component={Result} />;
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

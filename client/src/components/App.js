import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './page1/navBar';
import Login from './Login/login';
import Search from './Search/search';

class App extends Component {
  render() {
    return(
      <div>
        <BrowserRouter>
            <div>
              <Route exact path="/" component={NavBar}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/search" component={Search}/>

            </div>
        </BrowserRouter>

      </div>

    );
  }
}

export default App;

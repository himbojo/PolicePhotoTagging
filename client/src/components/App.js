import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './page1/navBar';
import Login from './Login/login';

class App extends Component {
  render() {
    return(
      <div>
        <BrowserRouter>
            <div>
              <Route exact path="/" component={NavBar}/>
              <Route exact path="/login" component={Login}/>

            </div>
        </BrowserRouter>

      </div>

    );
  }
}

export default App;

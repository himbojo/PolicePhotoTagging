import React, { Component } from "react";

import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            Logo
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="badges.html">Components</Link>
            </li>
            <li>
              <Link to="collapsible.html">JavaScript</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;

import React, { Component } from "react";

import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


class NavBar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
  <Navbar.Header pullLeft>
    <Navbar.Brand>
      <Link to="/upload">Police Photo Tagging</Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav className ="navbar-item1">
      <NavItem  eventKey={1} href="/upload" to="/upload">
        Upload
      </NavItem>
      <NavItem  eventKey={2} href="/search" to="/search">
        Search
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>

    );
  }
}

export default NavBar;

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/index";
import { Navbar, Nav, NavItem } from "react-bootstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(e) {
    this.props.logout();
    localStorage.removeItem("token");
    this.props.history.push("/login");
    //return(<Router><Redirect to="/login" /></Router>);
  }
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/upload">Police Photo Tagging</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/upload" to="/upload">
                Upload
              </NavItem>
              <NavItem eventKey={2} href="/search" to="/search">
                Search
              </NavItem>
              <NavItem onClick={this.logout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

// NavBar.PropTypes = {
//   auth = PropTypes.object.isRequired,
//   logout = PropTypes.object.isRequired
// }
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(NavBar));

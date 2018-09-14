import React, { Component } from "react";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel bsClass="loginFont">{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class loginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    //  this.change = this.change.bind(this);
  }
  state = {
    email: "",
    password: "",
    logged: false
  };
  handleSubmit(e) {
    e.preventDefault();
    console.log("this.state");
    this.setState({ logged: true });
    this.props.loginUser(this.state).then(res => {
      this.props.history.push("/upload");
    });

    // if (localStorage.getItem("token")) {
    //   this.props.history.push("/upload");
    // }
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  Submit = e => {
    e.preventDefault();
    console.log("hi");
    this.props.onSubmit(this.state);
  };
  render() {
    // if (this.state.logged === true){
    //   return (
    //       <BrowserRouter>
    //         <Redirect push to= "/" />
    //       </BrowserRouter>
    //     );
    //
    // }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="loginBody">
          <FormGroup controlId="formBasicText" bsSize="large">
            <FieldGroup
              id="formControlsUsername"
              type="text"
              label="Username"
              name="email"
              placeholder="Enter Username"
              value={this.state.email}
              onChange={this.change}
            />
            <FieldGroup
              id="formControlsPassword"
              type="password"
              label="Password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.change}
            />
            <div className="loginButton">
              <Button bsSize="large" type="Submit" block bsStyle="primary">
                Login
              </Button>
            </div>
          </FormGroup>
        </div>
      </form>
    );
  }
}
export default connect(
  null,
  actions
)(withRouter(loginForm));

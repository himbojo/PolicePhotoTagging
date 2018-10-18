import React from "react";

import * as actions from "../../actions";
import { connect } from "react-redux";
//The Page for registering users
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    email: "",
    password: ""
  };
  //Submit the state data to the regUser action
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.regUser(this.state);
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  Submit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        <input
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.change}
        />

        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          valid={this.state.password}
          onChange={this.change}
        />
        <br />
        <button type="Submit">Submit</button>
      </form>
    );
  }
}
export default connect(
  null,
  actions
)(Register);

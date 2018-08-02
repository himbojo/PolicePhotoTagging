import React, { Component } from "react";
import { Button, FormControl, FormGroup, ControlLabel } from "react-bootstrap";

class loginForm extends Component {
  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Username</ControlLabel>
            <FormControl type="text" placeholder="Please enter Username" />
            <ControlLabel>Password</ControlLabel>
            <FormControl type="text" placeholder="Please enter Password" />
            <Button bsSize="large" type="submit">
              Login
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}
export default loginForm;
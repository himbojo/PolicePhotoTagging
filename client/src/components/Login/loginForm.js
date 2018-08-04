import React, { Component } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  PageHeader,
  HelpBlock

} from "react-bootstrap";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id} >
      <ControlLabel bsClass="loginFont" >{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


class loginForm extends Component {


  render() {

    return (
      <div className="loginBody">
      <h1 className="loginHeader"> Photo Tagging Login</h1>

        <FormGroup controlId="formBasicText" bsSize="large">
          <FieldGroup
            id="formControlsUsername"
            type="text"
            label="Text"
            placeholder="Enter Username"
          />
          <FieldGroup
            id="formControlsPassword"
            type="text"
            label="Password"
            placeholder="Enter Password"
          />
          <div className="loginButton">
            <Button  bsSize="large" type="submit" block bsStyle="primary" >
              Login
            </Button>
          </div>

        </FormGroup>
      </div>
    );
  }
}
export default loginForm;

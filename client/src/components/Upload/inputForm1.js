import React, { Component } from "react";

import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class InputForm1 extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      value1: ''
    };
  }

  handleChange(e) {
    var state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {
    var {value, value1} = this.state;
    return (
      <form>
        <FormGroup
          controlId="value"
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            name="value"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          controlId="formBasicTex"
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            name="value1"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}

export default InputForm1;

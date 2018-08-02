import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, FormControl, FormGroup, ControlLabel, Grid, Row, Col } from "react-bootstrap";
import ImageUpload from "../objects/imageUpload";


class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      QID: '',
      FileNumber: '',
      Location: '',
      Tags: '',
      Description: '',
      Offence: ''
    };
  }

  onChange = (e) => {
    var state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    //handle form processing here....
  }

  render() {
    var {QID, FileNumber, Location, Tags, Description, Offence} = this.state;

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={7}>
              <ImageUpload/>

            </Col>
            <Col xsPull={5} xsOffset={7}>
              <form>
                <FormGroup pullRight controlId="formBasicText">
                  <ControlLabel>QID</ControlLabel>
                  <FormControl type="text" placeholder="Please enter QID e.g. 12345678" />
                  <ControlLabel>File Number</ControlLabel>
                  <FormControl type="text" placeholder="Please enter FileNumber e.g. 12345678" />
                  <ControlLabel>Location</ControlLabel>
                  <FormControl type="text" placeholder="Please enter Location e.g. Hillcrest, Hamilton" />
                  <ControlLabel>Tags</ControlLabel>
                  <FormControl type="text" placeholder="Please enter Tags e.g. blue shoes, red top" />
                  <ControlLabel>Description</ControlLabel>
                  <FormControl type="text" placeholder="Please enter Description e.g. Young male" />
                  <ControlLabel>Offence</ControlLabel>
                  <FormControl type="text" placeholder="Please enter Offence e.g. Burglary" />
                </FormGroup>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

export default InputForm;

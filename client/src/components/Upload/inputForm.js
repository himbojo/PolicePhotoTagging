import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, FormControl, FormGroup, ControlLabel, Grid, Row, Col } from "react-bootstrap";
import ImageUpload from "../objects/imageUpload";
import DateOnlyPicker from "../objects/dateOnlyPicker";
import TimeOnlyPicker from "../objects/timeOnlyPicker";
import Tagging from "../objects/tagging"


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
            <Col xs={9}>
              <ImageUpload/>

            </Col>
            <Col xsPull={3} xsOffset={9}>
              <form>
                <FormGroup pullRight controlId="formBasicText">
                  <ControlLabel>QID</ControlLabel>
                  <FormControl type="text" placeholder="Please enter QID" />
                  <ControlLabel>File Number</ControlLabel>
                  <FormControl type="text" placeholder="Please enter FileNumber" />
                  <ControlLabel>Date</ControlLabel>
                  <DateOnlyPicker/>
                    <ControlLabel>Time</ControlLabel>
                    <TimeOnlyPicker/>
                  <ControlLabel>Location</ControlLabel>
                  <FormControl type="text" placeholder="Please enter Location" />
                    <ControlLabel>Tags</ControlLabel>
                    <Tagging/>
                    <ControlLabel>Description</ControlLabel>
                  <FormControl type="text" placeholder="Please enter Description" />
                  <ControlLabel>Offence</ControlLabel>
                  <FormControl type="text" placeholder="Please enter Offence" />
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

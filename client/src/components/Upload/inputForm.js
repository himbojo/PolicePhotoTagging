import React, {Component} from 'react';
import { FormControl, FormGroup, ControlLabel, Grid, Row, Col } from "react-bootstrap";
import ImageUpload from "../objects/imageUpload";
import DateOnlyPicker from "../objects/dateOnlyPicker";
import TimeOnlyPicker from "../objects/timeOnlyPicker";
import Tagging from "../objects/tagging"


class InputForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      qid: '',
      filenumber: '',
      location: '',
      tags: '',
      description: '',
      offence: ''
    };
  }

  isNumber(_value) {
    var value = _value;
    if (isNaN(parseInt(value))) return 'success';
    else if (value !== '') return 'error';
    else return 'error';
  }

  isNull(_value){
    console.log(_value);
    var value = _value;
    if (value !== '') return 'error';
    else return 'success';
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={9}>
              <ImageUpload />
            </Col>
            <Col xs={3}>
              <form>
                <FormGroup validationState={this.isNumber(this.state.qid)}>
                  <ControlLabel>QID</ControlLabel>
                  <FormControl
                    type="text"
                    name="qid"
                    placeholder="Please enter QID"
                    value={this.state.value}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup validationState={this.isNumber(this.state.filenumber)}>
                  <ControlLabel>File Number</ControlLabel>
                  <FormControl
                    type="text"
                    name="filenumber"
                    placeholder="Please enter FileNumber"
                    value={this.state.value}
                    onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Date</ControlLabel>
                  <DateOnlyPicker/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Time</ControlLabel>
                  <TimeOnlyPicker/>
                </FormGroup>
                <FormGroup validationState={this.isNull(this.state.location)}>
                  <ControlLabel>Location</ControlLabel>
                  <FormControl
                    type="text"
                    name="location"
                    placeholder="Please enter Location"
                    value={this.state.value}
                    onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Tags</ControlLabel>
                  <Tagging />
                </FormGroup>
                <FormGroup validationState={this.isNull(this.state.description)}>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    type="text"
                    name="description"
                    placeholder="Please enter Description"
                    value={this.state.value}
                    onChange={this.handleChange} />
                </FormGroup>
                <FormGroup validationState={this.isNull(this.state.offence)}>
                  <ControlLabel>Offence</ControlLabel>
                  <FormControl
                    type="text"
                    name="offence"
                    placeholder="Please enter Offence"
                    value={this.state.value}
                    onChange={this.handleChange}/>
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

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

  FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

  getValidationState() {
    console.log(this.state.qid.length);
    const length = this.state.qid.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
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
                <FormGroup
                  controlId="formBasicText">
                  <ControlLabel>QID</ControlLabel>
                  <FormControl
                    type="text"
                    name="qid"
                    placeholder="Please enter QID"
                    value={this.state.value}
                    onChange={this.handleChange}
                    validation={this.getValidationState()}
                     />
                  <ControlLabel>File Number</ControlLabel>
                  <FormControl
                    type="text"
                    name="filenumber"
                    placeholder="Please enter FileNumber"
                    value={this.state.value}
                    onChange={this.handleChange} />
                  <ControlLabel>Date</ControlLabel>
                  <DateOnlyPicker/>
                  <ControlLabel>Time</ControlLabel>
                  <TimeOnlyPicker/>
                  <ControlLabel>Location</ControlLabel>
                  <FormControl
                    type="text"
                    name="location"
                    placeholder="Please enter Location"
                    value={this.state.value}
                    onChange={this.handleChange}/>
                  <ControlLabel>Tags</ControlLabel>
                  <Tagging />
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    type="text"
                    name="description"
                    placeholder="Please enter Description"
                    value={this.state.value}
                    onChange={this.handleChange} />
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

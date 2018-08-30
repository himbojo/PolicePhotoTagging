import React, {Component} from 'react';
import { FormControl, FormGroup, ControlLabel, Grid, Row, Col, Button, HelpBlock, Well } from "react-bootstrap";
import DateOnlyPicker from "../objects/dateOnlyPicker";
import TimeOnlyPicker from "../objects/timeOnlyPicker";
import Tagging from "../objects/tagging";
import { DropdownList } from 'react-widgets';
import "../css/inputForm.css";
import * as actions from "../../actions";
import { connect } from "react-redux";

function FieldGroup({ id, vState, label, help, ...props }) {
  return (
    <FormGroup controlId={id} validationState={vState} >
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class FormContents extends Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      iu: '',
      qid: '',
      filenumber: '',
      location: '',
      tags: '',
      offence: ''
    };
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.insPhoto(this.state);

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

    isNumber(_value) {
      var value = _value;
      if (!isNaN(parseInt(value))) return 'success';
      else if (value === '') return null;
      else return 'error';
    }

    isNull(_value){
      var value = _value;
      if (value === '') return null;
      else return 'success';
    }

    render(){
      return(
        <form>
          <FieldGroup
            id="formControlsQID"
            type="text"
            label="Uploader QID"
            name="qid"
            placeholder="Please enter QID"
            value={this.state.value}
            onChange={this.handleChange}
            vState={this.isNumber(this.state.qid)}/>
          <FieldGroup
            id="formControlsFileNumber"
            type="text"
            label="Event Number"
            name="filenumber"
            placeholder="Please enter Event Number"
            value={this.state.value}
            onChange={this.handleChange}
            vState={this.isNumber(this.state.filenumber)}/>
          <FormGroup>
            <ControlLabel>Date</ControlLabel>
            <DateOnlyPicker/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Time</ControlLabel>
            <TimeOnlyPicker/>
          </FormGroup>
          <FieldGroup
            id="formControlsLocation"
            type="text"
            label="Location"
            name="location"
            placeholder="Please enter Location"
            value={this.state.value}
            onChange={this.handleChange}
            vState={this.isNull(this.state.location)}/>
          <FormGroup>
            <ControlLabel>Tags</ControlLabel>
            <Tagging />
          </FormGroup>
          <FieldGroup
            id="formControlsOffence"
            type="text"
            label="Offence"
            name="offence"
            placeholder="Please enter Offence"
            value={this.state.value}
            onChange={this.handleChange}
            vState={this.isNull(this.state.offence)}/>
          <Button bsStyle="primary" type="submit" onClick={this.handleSubmit}>Upload Image</Button>
        </form>

      );
    }
  };

  export default connect(
    null,
    actions
  )(FormContents);

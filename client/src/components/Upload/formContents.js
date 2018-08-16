import React, {Component} from 'react';
import { FormControl, FormGroup, ControlLabel, Grid, Row, Col, Button, HelpBlock } from "react-bootstrap";
import DateOnlyPicker from "../objects/dateOnlyPicker";
import TimeOnlyPicker from "../objects/timeOnlyPicker";
import Tagging from "../objects/tagging";
import { DropdownList } from 'react-widgets';

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
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDrop = this.handleChangeDrop.bind(this);
    this.state = {
      iu: '',
      qid: '',
      filenumber: '',
      location: '',
      tags: '',
      description: '',
      offence: '',
      items: ['Headwear', 'Top', 'Pants', 'Footwear'],
      colours: ['Black', 'White', 'Grey', 'Orange', 'Yellow', 'Blue', 'Green', 'Red', 'Purple', 'Pink'],
      genSelect: 'Headwear',
      colSelect: 'Black',
      gTags: [],
      gSelect: '',
      cTags: [],
      cSelect: '',
      genericArray:[],
      genericSelect: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeDrop(item, colour){
    console.log(item);
    let { gTags, gSelect, cTags, cSelect, genericArray, genericSelect } = this.state;
    var n = gTags.includes(item);
    if(!n){
      var ic = colour.concat(' ', item);
      this.setState({
        gSelect: item,
        gTags: [...gTags, item],
        cSelect: colour,
        cTags: [...cTags, colour],
        genericArray:[...genericArray, ic],
        genericSelect: ic
      })}

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
      var gt = new Tagging();
      var iu = this.state.iu;
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

          <FormGroup controlId="formControlsDrop1">
            <ControlLabel>Select Clothing</ControlLabel>
            <DropdownList
              data={this.state.items}
              value={this.state.genSelect}
              onChange={genSelect => this.setState({ genSelect })}

              />
          </FormGroup>
          <FormGroup controlId="formControlsDrop2">
            <ControlLabel>Select Colour</ControlLabel>
            <DropdownList
              data={this.state.colours}
              value={this.state.colSelect}
              onChange={colSelect => this.setState({ colSelect })}
              defaultValue={"Black"}
              />
          </FormGroup>
          <Button bsStyle="primary" onClick={() => {this.handleChangeDrop(this.state.genSelect, this.state.colSelect)}}>Add Tag</Button>
          <FormGroup>
            <ControlLabel>Generic Tags</ControlLabel>
            <DropdownList
              data={this.state.genericArray}
              value={this.state.genericSelect}
              onChange={genericSelect => this.setState({ genericSelect })}
              />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Detail Tags</ControlLabel>
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
          <Button bsStyle="primary" type="submit" onClick={iu._handleSubmit}>Upload Image</Button>
        </form>

      );
    }
  };

  export default FormContents;

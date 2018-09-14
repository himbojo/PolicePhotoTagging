import React, {Component} from 'react';
import { FormControl, FormGroup, ControlLabel, Button, HelpBlock } from "react-bootstrap";
import DateTimePick from "../objects/dateTimePicker";
import "../css/inputForm.css";
import * as actions from "../../actions";
import { connect } from "react-redux";
import "../css/reactTags.css";
import thesaurus from "thesaurus";
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.state = {
      qid: '',
      eventNumber: '',
      dateTime: '',
      location: '',
      tags: [],
      offence: '',
      iu: '',
      file: ''
    };
  }

  handleTime(e){
    //  var date = new Date(e.value);
    //console.log(date.getMinutes());
    console.log(e.value);
    this.setState({ dateTime: e.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    var file1 = this.props.iu;
    var date = new Date().toISOString('en-nz').replace(/T/, '_').replace(/\..+/, '');

    var name = date + '_' + file1.name;
    name = name.split(".").join("$");
    var file2 = new File([file1], name);
    this.setState({iu: file2.name, file: file2}, () => this.sendData());
    //console.log(this.state.iu);
  }

  sendData(){
        //var imported_thesaurus = thesaurus.load("../assets/th_en_US_new.dat");
        var tags = this.state.tags;
        console.log(tags);
        for (var i = 0; i < tags.length; i++) {
          console.log(thesaurus.find(tags[i].text));
        }

    this.props.insPhoto(this.state);
    //console.log("sent photo");
    //console.log(this.state.file);
    this.props.bucketPhoto(this.state);
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

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
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
      id="formControlseventNumber"
      type="text"
      label="Event Number"
      name="eventNumber"
      placeholder="Please enter Event Number"
      value={this.state.value}
      onChange={this.handleChange}
      vState={this.isNumber(this.state.eventNumber)}/>

      <FormGroup>
      <ControlLabel>Date & Time</ControlLabel>
      <DateTimePick
      handleTime={this.handleTime}
      />

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
      <div>
      <ReactTags tags={this.state.tags}
      suggestions={this.state.suggestions}
      handleDelete={this.handleDelete}
      handleAddition={this.handleAddition}
      handleDrag={this.handleDrag}
      delimiters={delimiters}
      />
      </div>

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

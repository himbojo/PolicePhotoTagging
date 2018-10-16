import React, { Component } from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  HelpBlock,
  Modal
} from 'react-bootstrap';
import DateTimePick from '../objects/dateTimePicker';
import '../css/inputForm.css';
import '../css/upload.css';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import '../css/reactTags.css';
import thesaurus from 'thesaurus';
import { WithContext as ReactTags } from 'react-tag-input';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import LocationSearchInput from "../objects/locationSearchInput";
var suggests = require('../assets/suggestions').suggests;
const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function FieldGroup({ id, vState, label, help, ...props }) {
  return (
    <FormGroup controlId={id} validationState={vState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class FormContents extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleSelectLocation = this.handleSelectLocation.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      errors: [],
      qid: '',
      eventNumber: '',
      dateTime: '',
      location: '',
      tags: [],
      suggestions: suggests,
      offence: '',
      iu: '',
      file: '',
      address: '',
      show: false,
      success: false
    };
  }
  //Change the current address in the state
  handleChangeLocation = address => {
    this.setState({ address });
  };
  //Store the selected location in the current state
  handleSelectLocation = address => {
    this.setState({ address: address }, () => console.log(this.state.address));
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState(
          {
            location: latLng.lat + ' ' + latLng.lng
          },
          () => console.log(this.state.location)
        )
      )
      .catch(error => console.error('Error', error));
  };
  //Set the dateTime in the state
  handleTime(e) {
    //  var date = new Date(e.value);
    //console.log(date.getMinutes());
    console.log(e.value);
    this.setState({ dateTime: e.value });
  }
  // Checks the form items if they are empty and returns an array of errors.
  // this.state.qid... returns an undefined not sure why.
  validate() {
    const errors = [];

    if (this.state.qid.length === 0) {
      errors.push("QID can't be empty");
    }
    if (this.state.eventNumber.length === 0) {
      errors.push("Event Number can't be empty");
    }
    if (this.state.location.length === 0) {
      errors.push("location can't be empty");
    }
    if (this.state.tags.length === 0) {
      errors.push("Tags can't be empty");
    }
    if (this.state.offence.length === 0) {
      errors.push("Offence can't be empty");
    }
    return errors;
  }
  //When the upload button is pressed, send the state data to the
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    //Checks array of errors, if there is an error setstate && display
    const errors = this.validate();
    if (errors.length > 0) {
      this.setState({ errors });
      console.log(errors);
      return;
    }

    var file1 = this.props.iu;
    var date = new Date()
      .toISOString('en-nz')
      .replace(/T/, '_')
      .replace(/\..+/, '');

    var name = date + '_' + file1.name;
    name = name.split('.').join('$');
    var file2 = new File([file1], name);
    this.setState({ iu: file2.name, file: file2 }, () => this.sendData());
    //console.log(this.state.iu);
  }
  //Loop through arrayI and check if item is contained within it
  ///RETURN: true if item is in arrayI, false otherwise
  compareItems(item, arrayI) {
    for (var i = 0; i < arrayI.length; i++) {
      if (arrayI[i].indexOf(item) > -1) {
        return true;
      }
      }
      return false;
    }

  //Takes in the thesaurus and a tag and return it's matching type (either headwear, top, bottom, or footwear)
  ///RETURNS: The tags matching 'type' or, if it doesn't match any, the tag
  formatTags(arrayT, string) {
    var headwear = ['head', 'hat', 'headwear'];
    var top = ['top', 'shirt'];
    var bottom = ['bottom', 'pants'];
    var footwear = ['foot', 'shoe', 'footwear'];
    var arrayWithString = [string];
    arrayWithString = arrayWithString.concat(arrayT);
    for (var i = 0; i < arrayWithString.length; i++) {
      if (this.compareItems(arrayWithString[i], headwear)) {
        return 'headwear';
      } else if (this.compareItems(arrayWithString[i], top)) {
        return 'top';
      } else if (this.compareItems(arrayWithString[i], bottom)) {
        return 'bottom';
      } else if (this.compareItems(arrayWithString[i], footwear)) {
        return 'footwear';
      }
    }
      return string;
    }

  //Takes in a tag and searchs the thesaurus for similar words. It then formats the tag and sends the formatted tag back.
  ///RETURNS: A formatted tag, the formt is: WORD then COLOUR.
  sendTags(tag) {
    var string = tag.text;
    var strings = string.split(' ');
    //find the equivelant words for the tag in the thesaurus
    //ts1 and ts2 are arrays of strings
    var ts1 = thesaurus.find(strings[0]);
    var ts2 = thesaurus.find(strings[1]);
    var s1 = false;
    var s2 = false;
    //if the tag is only one word, format it with a second word: 'other'
    if (strings[1] == null) {
      strings[0] = this.formatTags(ts1, strings[0]);
      s2 = true;
      strings[1] = 'other';
    }
    //if the tag is two words, format them both
    else {
      //for all of the thesaurus words for the first tag, check if 'colour' is one of them
      for (var j = 0; j < ts1.length; j++) {
        //if colour is one of the thesaurus words, set s1 to true and format the second word
        if (ts1[j].indexOf('color') > -1 || ts1[j].indexOf('colour') > -1) {
          strings[1] = this.formatTags(ts2, strings[1]);
          s1 = true;
          break;
        }
      }
      //for all of the thesaurus words for the second tag, check if 'colour' is one of them
      for (j = 0; j < ts2.length; j++) {
        //if colour is one of the thesaurus words, set s2 to true and format the first word
        if (ts2[j].indexOf('color') > -1 || ts2[j].indexOf('colour') > -1) {
          strings[0] = this.formatTags(ts1, strings[0]);
          s2 = true;
          break;
        }
      }
    }
    //if the first word was a colour, concat the second word with the first
    if (s1 === true) {
      tag.text = strings[1].concat(' ').concat(strings[0]);
      tag.id = strings[1].concat(' ').concat(strings[0]);
    }
    //if the second word was a colour, concat the first word with the second
    else if (s2 === true) {
      tag.text = strings[0].concat(' ').concat(strings[1]);
      tag.id = strings[0].concat(' ').concat(strings[1]);
    }
    console.log(tag);
    return tag;
  }
  //Upload the tags/photodata to the database and the photo to the photobucket
  sendData() {
    //var imported_thesaurus = thesaurus.load("../assets/th_en_US_new.dat");
    this.props.updateTag(this.state);
    this.props.bucketPhoto(this.state);
    window.alert("Image upload successful");
    console.log(this.state.tags);


  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /* VALIDATION START */
  isNumber(_value) {
    var value = _value;
    if (!isNaN(parseInt(value))) return 'success';
    else if (value === '') return null;
    else return 'error';
  }

  isNull(_value) {
    var value = _value;
    if (value === '') return null;
    else return 'success';
  }
  /* VALIDATION END */
  //Delete a tag from the tag array in the state
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  }
  //Add a tag to the tag array in the state
  handleAddition(tag) {
    tag = this.sendTags(tag);
    this.setState(state => ({ tags: [...state.tags, tag] }));
    // () => {
    //   var tags1 = this.sendTags();
    //   this.setState({tags: tags1});}
  }
  //Change a position of the tag in the tag array
  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {errors.map(error => (
          <p className="errorText" key={error}>
            {' '}
            Error: {error}
          </p>
        ))}

        <FieldGroup
          id="formControlsQID"
          type="text"
          label="Uploader QID"
          name="qid"
          placeholder="Please enter QID"
          value={this.state.value}
          onChange={this.handleChange}
          vState={this.isNumber(this.state.qid)}
        />
        <FieldGroup
          id="formControlseventNumber"
          type="text"
          label="Event Number"
          name="eventNumber"
          placeholder="Please enter Event Number"
          value={this.state.value}
          onChange={this.handleChange}
          vState={this.isNumber(this.state.eventNumber)}
        />

        <FormGroup>
          <ControlLabel>Date & Time</ControlLabel>
          <DateTimePick handleTime={this.handleTime} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Location</ControlLabel>
          <LocationSearchInput
            address={this.state.address}
            handleChangeLocation={this.handleChangeLocation}
            handleSelectLocation={this.handleSelectLocation}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Tags</ControlLabel>
          <div>
            <ReactTags
              tags={this.state.tags}
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
          vState={this.isNull(this.state.offence)}
        />
        <Button bsStyle="primary" type="submit">
          Upload Image
        </Button>

      </form>
    );
  }
}

export default connect(
  null,
  actions
)(FormContents);

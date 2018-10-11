import React, { Component } from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Grid,
  Row,
  Button,
  Col
} from 'react-bootstrap';

import DateOnlyPicker from '../objects/dateOnlyPicker';
import './inputForm.css';
import './search.css';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import thesaurus from 'thesaurus';
import { WithContext as ReactTags } from 'react-tag-input';
import { withRouter } from 'react-router-dom';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class SearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.state = {
      qid: '',
      filenumber: '',
      location: '',
      tags: [],
      description: '',
      offence: '',
      showing: false
    };
  }
  /* START OF VALIDATION */
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
  /* END OF VALIDATION */

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //Sends the search data to the route to be sent to the 'result' function
  redirectToTarget = () => {
    this.context.router.history.push(`/result`);
  };
  //Removes a tag at index i from the tag array in the current state
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  }
  //Add a tag to the tag array in the current state
  handleAddition(tag) {
    //send the tag through the thesaurus, then format it
    tag = this.sendTags(tag);
    //add it to the end of the tag array
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }
  //When a tag is dragged, move it to the relevant position in the tag array
  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }
  //When the search button is pressed, send the state data to the results and the map page
  handleSubmit(e) {
    e.preventDefault();
    this.props.onShowMap();
    console.log('hello');
    this.sendData();
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
  //Sets the data into the appropriate format and sends to the back-end to processed
  sendData() {
    //put the data into the right format
    this.props.searchImage(this.state).then(res => {
      //send it to the back-end
      this.props.history.push('/results');
    });
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

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col
              xs={13}
              sm={13}
              md={8}
              mdPush={2}
              lg={8}
              lgPush={2}
              className="colStyle1"
            >
              <form>
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
                <div>
                  <FormGroup validationState={this.isNumber(this.state.qid)}>
                    <ControlLabel>QID</ControlLabel>
                    <FormControl
                      type="text"
                      name="qid"
                      placeholder="Search by QID"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup
                    validationState={this.isNumber(this.state.filenumber)}
                  >
                    <ControlLabel>File Number</ControlLabel>
                    <FormControl
                      type="text"
                      name="filenumber"
                      placeholder="Search by FileNumber"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Date One</ControlLabel>
                    <DateOnlyPicker />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Date Two</ControlLabel>
                    <DateOnlyPicker />
                  </FormGroup>

                  <FormGroup validationState={this.isNull(this.state.offence)}>
                    <ControlLabel>Offence</ControlLabel>
                    <FormControl
                      type="text"
                      name="offence"
                      placeholder="Search by Offence"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </div>

                <div className="buttonGroup">
                  <Button
                    className="searchButton"
                    bsStyle="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps({ search }) {
  return { search };
}
export default connect(
  mapStateToProps,
  actions
)(withRouter(SearchForm));

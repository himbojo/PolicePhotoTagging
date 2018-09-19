import React, { Component } from "react";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Grid,
  Row,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import DateOnlyPicker from "../objects/dateOnlyPicker";
import Tagging from "../objects/tagging";
import "./inputForm.css";
import "./search.css";
import * as actions from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
import thesaurus from "thesaurus";
import { WithContext as ReactTags } from "react-tag-input";

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
      qid: "",
      filenumber: "",
      location: "",
      tags: [],
      description: "",
      offence: "",
      showing: false
    };
  }

  isNumber(_value) {
    var value = _value;
    if (!isNaN(parseInt(value))) return "success";
    else if (value === "") return null;
    else return "error";
  }

  isNull(_value) {
    var value = _value;
    if (value === "") return null;
    else return "success";
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  }

  handleAddition(tag) {
    tag = this.sendTags(tag);
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

  handleSubmit(e) {
    e.preventDefault();
    this.sendData();
  }

  compareItems(item, arrayI){
    for (var i = 0; i < arrayI.length; i++) {
      if(arrayI[i].indexOf(item) > -1){
        return true;
      }
    }
    return false;
  }

  sendData(){
    this.props.searchImage(this.state);
  }

  formatTags(arrayT, string) {
    var headwear = ["head", "hat"];
    var top = ["top", "shirt"];
    var bottom = ["bottom", "pants"];
    var footwear = ["foot", "shoe"];
    var arrayWithString = [string];
    arrayWithString = arrayWithString.concat(arrayT);
    for (var i = 0; i < arrayWithString.length; i++) {
      if (this.compareItems(arrayWithString[i], headwear)) {
        return "headwear";
      } else if (this.compareItems(arrayWithString[i], top)) {
        return "top";
      } else if (this.compareItems(arrayWithString[i], bottom)) {
        return "bottom";
      } else if (this.compareItems(arrayWithString[i], footwear)) {
        return "footwear";
      }
    }
    return "other";
  }

  sendTags(tag){
      var string = tag.text;
      var strings = string.split(" ");

      var ts1 = thesaurus.find(strings[0]);
      var ts2 = thesaurus.find(strings[1]);
      var s1 = false;
      var s2 = false;

      if(strings[1] == null){
        strings[0] = this.formatTags(ts1, strings[0]);
        s2 = true;
        strings[1] = "other";
      }
      else{
        for(var j = 0; j < ts1.length; j++){
          if(ts1[j].indexOf("color") > -1 || ts1[j].indexOf("colour") > -1){
            strings[1] = this.formatTags(ts2, strings[1]);
            s1 = true;
            break;
          }
        }
        for(j = 0; j < ts2.length; j++){
          if(ts2[j].indexOf("color") > -1 || ts2[j].indexOf("colour") > -1){
            strings[0] = this.formatTags(ts1, strings[0]);
            s2 = true;
            break;
          }
        }
      }

      if(s1 === true){
        tag.text = strings[1].concat(" ").concat(strings[0]);
        tag.id = strings[1].concat(" ").concat(strings[0]);
      }
      else if(s2 === true){
        tag.text = strings[0].concat(" ").concat(strings[1]);
        tag.id = strings[0].concat(" ").concat(strings[1]);
      }
      console.log(tag);
    return tag;
  }

  render() {
    return (
      <div>
        <Grid>
          <Row xsOffset={1} xs={3} className="colStyle1">
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
                <Link href="/results" to="/results">
                  <Button
                    className="searchButton"
                    bsStyle="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Search
                  </Button>
                </Link>
              </div>
            </form>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(SearchForm);

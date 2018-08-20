import React, { Component } from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ImageUpload from '../objects/imageUpload';
import DateOnlyPicker from '../objects/dateOnlyPicker';
import TimeOnlyPicker from '../objects/timeOnlyPicker';
import Tagging from '../objects/tagging';
import './inputForm.css';
import './search.css';

class SearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      qid: '',
      filenumber: '',
      location: '',
      tags: '',
      description: '',
      offence: '',
      showing: false
    };
  }

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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  redirectToTarget = () => {
    this.context.router.history.push(`/result`);
  };
  render() {
    const { showing } = this.state;
    return (
      <div>
        <Grid>
          <Row xsOffset={1} xs={3} className="colStyle1">
            <form>
              <FormGroup>
                <ControlLabel>Search Tags</ControlLabel>
                <Tagging />
              </FormGroup>
              <div />
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
                <Button className="searchButton" bsStyle="primary">
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

export default SearchForm;

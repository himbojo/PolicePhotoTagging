import React, {Component} from 'react';
import { FormControl, FormGroup, ControlLabel, Grid, Row, Col, Button, HelpBlock } from "react-bootstrap";
import ImageUpload from "../objects/imageUpload";
import DateOnlyPicker from "../objects/dateOnlyPicker";
import TimeOnlyPicker from "../objects/timeOnlyPicker";
import Tagging from "../objects/tagging";
import "../css/inputForm.css";


function FieldGroup({ id, vState, label, help, ...props }) {
  return (
    <FormGroup controlId={id} validationState={vState} >
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}



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
      offence: '',

      width: window.innerWidth,
    };
  }

    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });
    };

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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 768;
    var iu = new ImageUpload();
    if (isMobile) {
    return (
      <div>
        <Grid>
          <Row>
            <Row xs={8} className="colStyle2">
              <ImageUpload file={iu.state.file} onChange={iu._handleImageChange} />
            </Row>
            <Row mOffset={.5} xsOffset={1} xs={3} className="colStyle1">
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
                  <Button bsStyle="primary" type="submit" onClick={iu._handleSubmit}>Upload Image</Button>
              </form>
            </Row>
          </Row>
        </Grid>
      </div>
    );
  }
  else{
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={8} className="colStyle2">
              <ImageUpload file={iu.state.file} onChange={iu._handleImageChange} />
            </Col>
            <Col  xsOffset={1} xs={3} className="colStyle1">
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
                  <Button bsStyle="primary" type="submit" onClick={iu._handleSubmit}>Upload Image</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
};

export default InputForm;

import React, {Component} from 'react';
import { FormControl, FormGroup, ControlLabel, Grid, Row, Col, Button, HelpBlock } from "react-bootstrap";
import ImageUpload from "../objects/imageUpload";
import "../css/inputForm.css";
import FormContents from "./formContents";

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

    this.state = {
      file: '',
      imagePreviewUrl: '',
      width: window.innerWidth
    };
    this._handleImageChange = this._handleImageChange.bind(this);
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

  _handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
      this.setState({
        file: file,
        imagePreviewUrl: URL.createObjectURL(file)});
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 768;
    if (isMobile) {
      return (
        <div>
          <Grid>
            <Row>
              <Row xs={8} className="colStyle2">
                <ImageUpload file={this.state.file} imagePreviewUrl={this.state.imagePreviewUrl} onChange={this._handleImageChange} />
              </Row>
              <Row mOffset={.5} xsOffset={1} xs={3} className="colStyle1">
                <FormContents iu={this.state.file}/>
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
                <ImageUpload file={this.state.file} imagePreviewUrl={this.state.imagePreviewUrl} onChangeFile={this._handleImageChange} />
              </Col>
              <Col  xsOffset={1} xs={3} className="colStyle1">
                <FormContents iu={this.state.file}/>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
};

export default InputForm;

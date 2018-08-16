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
                <FormContents iu={iu.state}/>
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
                <FormContents iu={iu.state}/>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
};

export default InputForm;

import React, { Component } from "react";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Grid,
  Row,
  Col,
  Button,
  Modal,
  Image
} from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ImageUpload from "../objects/imageUpload";
import DateOnlyPicker from "../objects/dateOnlyPicker";
import TimeOnlyPicker from "../objects/timeOnlyPicker";
import Tagging from "../objects/tagging";
import "./inputForm.css";
import "./search.css";
import Gallery from "react-photo-gallery";
import Lightbox from "react-images";
const PHOTO_SET = [
  {
    src: require("./loginBG.jpg"),
    width: 4,
    height: 3
  },
  {
    src: require("./loginBG.jpg"),
    width: 4,
    height: 3
  },
  {
    src: require("./loginBG.jpg"),
    width: 4,
    height: 3
  }
];

class ResultForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Gallery photos={PHOTO_SET} onClick={this.handleShow} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Picture #1</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={require("./loginBG.jpg")} thumbnail />
            <FormGroup>
              <ControlLabel>Assocaited Tags</ControlLabel>
              <Tagging />
              <ControlLabel>QID</ControlLabel>
              <FormControl type="text" name="qid" />
              <ControlLabel>Date</ControlLabel>
              <DateOnlyPicker />
              <ControlLabel>Time</ControlLabel>
              <TimeOnlyPicker />
              <ControlLabel>File Number</ControlLabel>
              <FormControl type="text" name="filenumber" />
              <ControlLabel>Offence</ControlLabel>
              <FormControl type="text" name="offence" />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ResultForm;

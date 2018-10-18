import React, { Component } from "react";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Modal,
  Image
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/results.css"
//import GoogleMapReact from "google-map-react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import "../css/reactTags.css";
import { WithContext as ReactTags } from 'react-tag-input';
import { DateTimePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';


//const MAP_COMPONENT = ({ text }) => <div>{text}</div>;
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
//Display when a picture is clicked on
class EachPicture extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.state = {
      show: false,
      width: -1,
      widthW: window.innerWidth,
      tags: this.props.image_tags
    };
  }
  //Add listener for the window re-size
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  //Remove listner for the window re-size
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  //Reset the window size on window size change
  handleWindowSizeChange = () => {
    this.setState({ widthW: window.innerWidth });
  };
  //Set show to flase, closing the information panel
  handleClose() {
    this.setState({ show: false });
  }
  //Set show to true, bringing the information panel for the image up
  handleShow() {
    this.setState({ show: true });
  }
  //Delete a tag from the tag array at index i
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }
  //Add a tag to the end of the tag array
  handleAddition(tag) {
    tag = this.sendTags(tag);
    this.setState(state => ({ tags: [...state.tags, tag] }));
    // () => {
    //   var tags1 = this.sendTags();
    //   this.setState({tags: tags1});}
  }
  //Change the position of a tag in the tag array
  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  render() {
    const { widthW } = this.state;

    const isMobile = widthW <= 768;
    var imgCSS= "";
    if(isMobile){
      imgCSS = "imgMobile";
    }
    else{
      imgCSS = "imgDesktop";
    }
    console.log(this.props);
    //this.setState(state => ({ tags: this.props.image_tags }));
    return (
      <div>
        <img className={imgCSS}
          src={this.props.path}
          onClick={this.handleShow}
          alt={this.props.path} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <div>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.desciptor.image_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image
              src={this.props.path}
              onClick={this.handleShow}
              alt={this.props.path}
              thumbnail
              />
            <FormGroup bsClass="modalGroup" disabled>
                <ControlLabel>Tags</ControlLabel>
                  <ReactTags tags={this.state.tags}
                    suggestions={this.state.suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    readOnly="true"
                    />
              <ControlLabel>Uploader QID</ControlLabel>
              <FormControl type="text" name="qid"
                value={this.props.desciptor.qid}
                />
              <ControlLabel>Event Number</ControlLabel>
              <FormControl type="text" name="eventNumber"
                value={this.props.desciptor.event_number} />
              <ControlLabel>Lat & Lng</ControlLabel>
              <FormControl type="text" name="Location"
                value={this.props.desciptor.location.x + " " + this.props.desciptor.location.y} />
                <ControlLabel>Location</ControlLabel>
                <FormControl type="text" name="Location"
                  value={this.props.locationName} />
              <ControlLabel>Date & Time</ControlLabel>
              <DateTimePicker readOnly defaultValue={new Date(this.props.desciptor._datetime)}/>
              <ControlLabel>Offence</ControlLabel>
              <FormControl type="text" name="offence"
                value={this.props.desciptor.offence}/>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}
//The main results page
class ResultForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      width: -1
    };
  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  //Set the closing and opening of the images information panel
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  render() {
    let images = Object.keys(this.props.search).map(image => {
      return (
        <EachPicture
          path={this.props.search[image].path}
          locationName={this.props.search[image].locationName}
          desciptor={this.props.search[image]}
          image_tags={this.props.search[image].image_tags}
          />
      );
    });
          return (
            <div>
              <div className="buttonGroup">
                <Link href="/search" to="/search">
                  <Button className="searchButton" bsStyle="primary">
                    Back
                  </Button>
                </Link>

                  <Button className="searchButton" bsStyle="primary" onClick={() => this.props.onShowMap(1)}>
                    Map
                  </Button>

              </div>
              {images}
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
)(ResultForm);

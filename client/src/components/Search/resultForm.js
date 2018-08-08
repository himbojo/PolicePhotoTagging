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
import { BrowserRouter, Route} from 'react-router-dom';
import ImageUpload from '../objects/imageUpload';
import DateOnlyPicker from '../objects/dateOnlyPicker';
import TimeOnlyPicker from '../objects/timeOnlyPicker';
import Tagging from '../objects/tagging';
import './inputForm.css';
import './search.css';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

const PHOTO_SET = [
  {
    src: require('../assets/loginBG.jpg'),
    width: 1,
    height: 1,
    size: ['(min-width: 480px) 50vw,(min-width: 480px) 50vw, 100vw, 100vw']
  },
  {
    src: require('./loginBG.jpg'),
    width: 1,
    height: 1,
    size: ['(min-width: 480px) 50vw,(min-width: 480px) 50vw, 100vw, 100vw']
  },
  {
    src: require('./loginBG.jpg'),
    width: 1,
    height: 1,
    size: ['(min-width: 480px) 50vw,(min-width: 480px) 50vw, 100vw, 100vw']
  },
  {
    src: require('../assets/loginBG.jpg'),
    width: 1,
    height: 1
  },
  {
    src: require('./loginBG.jpg'),
    width: 1,
    height: 1
  },
  {
    src: require('./loginBG.jpg'),
    width: 1,
    height: 1
  }
];

class ResultForm extends Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  render() {
    return <Gallery photos={PHOTO_SET} onClick={this.openLightbox} />;
    <Lightbox
      images={PHOTO_SET}
      onClose={this.closeLightbox}
      onClickPrev={this.gotoPrevious}
      onClickNext={this.gotoNext}
      currentImage={this.state.currentImage}
      isOpen={this.state.lightboxIsOpen}
    />;
  }
}

export default ResultForm;

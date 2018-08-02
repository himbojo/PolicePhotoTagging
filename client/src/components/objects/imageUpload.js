//https://gist.github.com/hartzis/0b77920380736f98e4f9

import React, { Component } from 'react';
import { Button, FormControl, Grid, Row, Col, ControlLabel, Image } from 'react-bootstrap';
import "./imageUpload.css";
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<Image className="image" src={imagePreviewUrl} responsive />);
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6}>
            <form onSubmit={this._handleSubmit}>
              <ControlLabel>Please Select a file</ControlLabel>
              <FormControl className="chooseFile" type="file" label="File" help="Browse for image" onChange={this._handleImageChange} />
            </form>
            {$imagePreview}
            <Button bsStyle="primary" type="submit" onClick={this._handleSubmit}>Upload Image</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default ImageUpload;

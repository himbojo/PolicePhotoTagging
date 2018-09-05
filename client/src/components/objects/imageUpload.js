//https://gist.github.com/hartzis/0b77920380736f98e4f9

import React, { Component } from 'react';
import { Button, FormControl, Grid, Row, Col, ControlLabel, Image } from 'react-bootstrap';
import "./imageUpload.css";
var path = require('path');
class ImageUpload extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imagePreviewUrl = this.props.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<Image className="image" src={imagePreviewUrl} responsive />);
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6}>
            <form>
              <ControlLabel>Please Select a file</ControlLabel>
              <FormControl className="chooseFile" type="file" label="File" help="Browse for image" onChange={this.props.onChangeFile} />
            </form>
            {$imagePreview}
            {/*<Button bsStyle="primary" type="submit" onClick={this._handleSubmit}>Upload Image</Button>*/}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default ImageUpload;

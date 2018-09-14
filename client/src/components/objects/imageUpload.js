//https://gist.github.com/hartzis/0b77920380736f98e4f9

import React, { Component } from 'react';
import { FormControl, Grid, Row, Col, ControlLabel, Image } from 'react-bootstrap';
import "./imageUpload.css";
class ImageUpload extends Component {

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

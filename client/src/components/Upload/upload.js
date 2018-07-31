import React, { Component } from 'react';

import './upload.css';

import NavBar from '../objects/navBar';

import axios from 'axios';

import ImageUpload from '../objects/imageUpload';

import TimePicker from 'react-dropdown-timepicker';


class Upload extends Component{
  state = {
    time: '10:00',
  }

  render(){
    return(
      <div>
       <NavBar/>
       <div className="boxes row">
      <div className="image-box col s8" >
        <ImageUpload/>
      </div>
      <div className="tag-box col s4">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="file_number" type="text" className="validate"/>
              <label className="active" for="file_number">File Number</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="qid" type="text" className="validate"/>
              <label className="active" for="qid">QID</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
            <TimePicker
              time={this.state.time} />
            </div>
          </div>

        </form>
      </div>

      </div>
      </div>
    );
  }

}

export default Upload;

import React, { Component } from 'react';

import './upload.css';

import NavBar from '../objects/navBar';

import axios from 'axios';

import ImageUpload from '../objects/imageUpload';

import TimePicker from 'react-dropdown-timepicker';

import InputForm from './inputForm';
import InputForm1 from './inputForm1';


class Upload extends Component{

  render(){
    return(
      <div>
       <NavBar/>
       <InputForm/>

      </div>
    );
  }

}

export default Upload;

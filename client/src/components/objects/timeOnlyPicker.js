import React, { Component } from 'react';
import { render } from 'react-dom';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { TimePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en')
momentLocalizer()

class TimeOnlyPicker extends Component {

  render() {
    return (
      <div>
        <TimePicker />
      </div>
    );
  }

}

export default TimeOnlyPicker;

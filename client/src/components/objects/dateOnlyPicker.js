import React, { Component } from 'react';
import { render } from 'react-dom';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { DatePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en')
momentLocalizer()

class DateOnlyPicker extends Component {

  render() {
    return (
      <div>
        <DatePicker />
      </div>
    );
  }

}

export default DateOnlyPicker;

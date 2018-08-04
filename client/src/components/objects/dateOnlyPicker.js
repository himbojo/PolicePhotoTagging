import React, { Component } from 'react';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { DatePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en-nz')
momentLocalizer()

class DateOnlyPicker extends Component {

  render() {
    return (
      <div>
        <DatePicker
          format={'DD/MM/YYYY'}
          defaultValue={new Date()} />
      </div>
    );
  }

}

export default DateOnlyPicker;

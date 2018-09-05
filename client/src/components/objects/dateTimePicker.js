import React, { Component } from 'react';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { DateTimePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en-nz')
momentLocalizer()

class DateTimePick extends Component {

  render() {
    return (
      <div>
        <DateTimePicker
        format={'DD/MM/YYYY H:mm'}
          defaultValue={new Date()}
        onChange={value => this.props.handleTime({value})} />
      </div>
    );
  }

}

export default DateTimePick;

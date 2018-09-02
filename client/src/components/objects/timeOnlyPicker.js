import React, { Component } from 'react';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { TimePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en-nz')
momentLocalizer()

class TimeOnlyPicker extends Component {

  render() {
    return (
      <div>
        <TimePicker
          timeFormat={'H:mm'}
          date={false}

          defaultValue={new Date()}
        onChange={value => this.props.handleTime({value})} />
      </div>
    );
  }

}

export default TimeOnlyPicker;

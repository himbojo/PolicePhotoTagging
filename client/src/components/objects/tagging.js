import React, { Component } from 'react';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import '../css/inputForm.css';

class Tagging extends Component {
  constructor(...args) {
      super(...args)

      this.state = {
        value: [],
        tags: [],
        state: ''
      }
    }

    handleCreate(name) {
      let { tags, value } = this.state;

      let newOption = {
        name,
        id: tags.length + 1
      }

      this.setState({
        value: [...value, newOption],  // select new option
        tags: [...tags, newOption], // add new option to our dataset
        state: this.state
      })
    }

    render() {
      let { value, tags, state } = this.state;

      return (
        <Multiselect
          state={state}
          data={tags}
          value={value}
          allowCreate="onFilter"
          onCreate={name => this.handleCreate(name)}
          onChange={value => this.setState({ value })}
          textField="name"
          placeholder="Enter tags"
        />
      )
    }
}

export default Tagging;

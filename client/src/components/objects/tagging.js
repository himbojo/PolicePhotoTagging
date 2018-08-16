import React, { Component } from 'react';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

class Tagging extends Component {
  constructor(...args) {
      super(...args)

      this.state = {
        value: [],
        tags: [],
      }
    }

    handleCreate(name) {
      console.log("hi");
      let { tags, value } = this.state;

      let newOption = {
        name,
        id: tags.length + 1
      }

      this.setState({
        value: [...value, newOption],  // select new option
        tags: [...tags, newOption] // add new option to our dataset
      })

      console.log(this.state.value);
      console.log(this.state.tags);
    }

    render() {
      let { value, tags } = this.state;

      return (
        <Multiselect
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

import React, { Component } from 'react';
import { Creatable as ReactSelectCreatable } from 'react-select';

class Creatable extends Component {
  render() {
    return (
      <ReactSelectCreatable {...this.props} />
    );
  }
}

export default Creatable;

import React, { Component } from 'react';

class BodyPart extends Component {
  render() {
    const { name } = this.props;

    return (
      <img
        key={name}
        alt={name}
        src={'images/' + name + '.png'}
        className="bodypart"
      />
    );
  }
}

export default BodyPart;

import React, { Component } from 'react';

class BodyPart extends Component {
  render() {
    const { name, state } = this.props;
    let fullName;
    state ? (fullName = name + '-' + state) : (fullName = name);

    return (
      <img
        key={name}
        alt={fullName}
        src={'images/' + fullName + '.png'}
        className="bodypart"
      />
    );
  }
}

export default BodyPart;

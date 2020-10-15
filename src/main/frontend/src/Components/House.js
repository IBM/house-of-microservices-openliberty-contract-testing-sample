import React, { Component } from 'react';

class House extends Component {
  render() {
    const room = this.props.room;
    return (
      <div>
        <h4>{room}</h4>
        <div className="house">
          <img alt="a house" src="images/house.png" className="house-image" />
          <img
            alt={room}
            src={'images/house-' + room + '.png'}
            className="house-image"
          />
        </div>
      </div>
    );
  }
}

export default House;

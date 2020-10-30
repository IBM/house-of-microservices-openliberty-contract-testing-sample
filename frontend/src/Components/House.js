import React, { Component } from 'react';

class House extends Component {
  render() {
    const room = this.props.room;
    return (
      <div>
        <div className="roomLabel">
          {room ? <h4>{room}</h4> : <h4>&nbsp;</h4>}
        </div>
        <div className="house">
          <img alt="a house" src="images/house.png" className="house-image" />
          {room ? (
            <img
              alt={room}
              src={'images/house-' + room + '.png'}
              className="house-image"
            />
          ) : (
            <div className="no-room"></div>
          )}
        </div>
      </div>
    );
  }
}

export default House;

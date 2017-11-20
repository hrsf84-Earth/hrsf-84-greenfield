import React from 'react';
import ReactDOM from 'react-dom';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="carousel">
        <img src={this.props.currentPhoto} ></img>
      </div>
    )
  }
}

export default Carousel;
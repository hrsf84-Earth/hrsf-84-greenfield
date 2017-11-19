import React from 'react';
import ReactDOM from 'react-dom';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className='carousel'>
      <button>Left</button>
        <img src={this.props.currentPhoto.src} ></img>
        <button>Right</button>
      </div>
    )
  }
}

export default Carousel;
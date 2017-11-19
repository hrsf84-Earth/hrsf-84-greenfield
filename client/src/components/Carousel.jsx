import React from 'react';
import ReactDOM from 'react-dom';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        carousel
        {console.log('src',this.props.currentPhoto.src)}
        <img src={this.props.currentPhoto.src} ></img>
      </div>
    )
  }
}

export default Carousel;
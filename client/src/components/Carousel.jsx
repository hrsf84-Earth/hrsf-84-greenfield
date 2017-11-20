import React from 'react';
import ReactDOM from 'react-dom';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (!!this.props.currentPhoto) {
      return (
        <div className="carousel">
          <img src={this.props.currentPhoto.urls.regular} ></img>
        </div>
      )
    } else {
      return (null) ;
    }
  }
}

export default Carousel;
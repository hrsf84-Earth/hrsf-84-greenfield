import React from 'react';
import ReactDOM from 'react-dom';

const Carousel = (props) => {
  if (!!props.currentPhoto) {
    return (
      <div className="carousel">
        <img id="carousel_img" src={props.currentPhoto.urls.regular} ></img>
      </div>
    )
  } else {
  return (
    <div className="auto-center">
      <i className="carousel fa fa-spinner fa-pulse fa-3x fa-fw auto-center">
      </i>
    </div>
    );
  }
}

export default Carousel;

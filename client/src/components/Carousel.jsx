import React from 'react';
import ReactDOM from 'react-dom';

class Carousel extends React.Component {
  constructor(props) {
    super (props)
  }

  favorite() {
    this.props.registerFavorite(this.props.currentPhoto);
  }
  render() {
    if (!!this.props.currentPhoto) {
      return (
        <div className="carousel">
          <span> Photo by {this.props.currentPhoto.user.name}/Unsplash </span>
          <img id="carousel_img" src={this.props.currentPhoto.urls.regular} ></img>
          <img onClick={this.favorite.bind(this)}id="heart" src="./images/heart_icon.png" />
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
}

export default Carousel;

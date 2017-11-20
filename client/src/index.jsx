import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx'
import Carousel from './components/Carousel.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);

// Adding three states. Definitely using currentPhoto
// Putting placeholders for loggedIn and favoritesView for now
    this.state = {
      src: [],
      currentPhotoURL: src[0],
      currentPhotoIndex: 0,
      loginStatus: '',
      favoritesView: ''

    }
  }

  componentDidMount() {
    let context = this.state;
    $.ajax({
      url: '/photos',
      success: (data) => {
        if (data) {
          console.log(data)
          this.setState({
            src: data,
            currentPhotoURL: data[context.currentPhotoIndex] || 'http://images2.fanpop.com/image/photos/13300000/Cute-Puppy-puppies-13379766-1280-800.jpg'
          })
        }
        console.log('setState for displaying a photo');
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }


  nextPhoto() {
    let context = this;
    return new Promise ((resolve, reject) => {
      this.state.src.forEach(function(element) {
        if (element === context.currentPhoto) {
          resolve(context.src.indexOf(element) + 1);
        }
      });
    });
  }

  handleClickRight() {
    console.log('Clicked', this.nextPhoto());
    this.nextPhoto()
    .then(photo => {
      this.setState({
        currentPhoto: this.state.src[photo]
      });
    })
  }

  prevPhoto() {
    let context = this;
    return new Promise ((resolve, reject) => {
      this.state.src.forEach(function(element) {
        if (element === context.currentPhoto) {
          console.log(context.src.indexOf(element) - 1);
          resolve(context.src.indexOf(element) - 1);
        }
      });
    });
  }

  handleClickLeft() {
    console.log('Clicked', this.prevPhoto());
    this.prevPhoto()
    .then(photo => {
      this.setState({
        currentPhoto: this.state.src[photo]
      });
    })
  }


  render () {
    return (
    <div className="grid">
      <div className="header-left">Impulse</div>

      <div>
        <Login className="header-right" loginStatus={this.state.loginStatus} />
      </div>
      <div className="left">
          <button className="left-middle">Left</button>
      </div>
      <Carousel currentPhoto={this.state.currentPhoto} />
      <div className="right">
        <button className="right-middle" onClick={this.handleClickRight.bind(this)}>Right</button>
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
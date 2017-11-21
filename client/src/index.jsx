import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx'
import Carousel from './components/Carousel.jsx'
import Search from './components/search.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);

// Adding three states. Definitely using currentPhoto
// Putting placeholders for loggedIn and favoritesView for now
    // this.src = ['http://images2.fanpop.com/image/photos/13300000/Cute-Puppy-puppies-13379766-1280-800.jpg'],
    // this.src = [{urls:''}]
    this.src = [];

    this.state = {
      // currentPhotoURL: src[0],
      currentPhotoIndex: 0,
      loginStatus: '',
      favoritesView: ''
    }
    this.handlePhotoNavigationClick = this.handlePhotoNavigationClick.bind(this);
  }

  componentWillMount() {
    let context = this;
    $.ajax({
      url: '/photos',
      success: (data) => {
        if (data) {
          console.log(data)
          context.src = data;
          this.forceUpdate();
        }
      },
      error: (err) => {
        context.src = ['http://images2.fanpop.com/image/photos/13300000/Cute-Puppy-puppies-13379766-1280-800.jpg'];
        this.forceUpdate();
        console.log('Error retrieving list of photos from server', err);
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

  handlePhotoNavigationClick(direction = 1) { //direction positive, go to next; neg then go previous index
    // Overview: When user clicks on a nagivation button, will change the centeral image to a new index of src
    var numberOfPhotos = this.src.length;
    var newIndex = this.state.currentPhotoIndex + direction;
    if (newIndex < 0) {
      newIndex = newIndex + numberOfPhotos ;
    } else if ( newIndex >= numberOfPhotos ) {
      newIndex = newIndex - numberOfPhotos ;
    }
    console.log("Photo index", newIndex)
    this.setState({
      currentPhotoIndex: newIndex
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

  onSearch(term) {
    $.ajax({
      url: '/photos',
      method: 'GET',
      data: {
        query: term
      },
      contentType: 'application/json',
      success: (photoData) => {
        if(photoData){
          console.log('ON SUCCESS', photoData)
          this.src = photoData;
          this.forceUpdate();

        }
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      }
    });
  }

  render () {
    return (
    <div className="grid">
      <div className="header-left">Impulse</div>

      <Search onSearch={this.onSearch.bind(this)} />

      <div>
        <Login className="header-right" loginStatus={this.state.loginStatus} />
      </div>
      <div className="left">
          <i className="fa fa-5x fa-angle-left left-middle" aria-hidden="true" onClick={() => this.handlePhotoNavigationClick(-1)}></i>
          {/* <button className="left-middle" onClick={() => this.handlePhotoNavigationClick(-1)}>Previous</button> */}
      </div>
      <Carousel currentPhoto={this.src[this.state.currentPhotoIndex]} />
      <div className="right">
      <i className="fa fa-5x fa-angle-right right-middle" aria-hidden="true" onClick={() => this.handlePhotoNavigationClick(1)} > </i>
        {/* <button className="right-middle" onClick={() => this.handlePhotoNavigationClick(1)}>Next</button> */}
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

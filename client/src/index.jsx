import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx'
import Carousel from './components/Carousel.jsx'
import Search from './components/search.jsx'
import $Post from './services/Post.jsx'
// import $Get from './services/Get.jsx'

export default class App extends React.Component {
  constructor() {
    super();
    this.src = [];
    this.state = {
      currentPhotoIndex: 0,
      view: 'sdfsd',
      favoritesView: '',
      searchTerm: '',
      searchPagination: 1
    }

    this.handlePhotoNavigationClick = this.handlePhotoNavigationClick.bind(this);
    this.viewSelect = this.viewSelect.bind(this);
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
        context.src = [{urls:{regular:'http://images2.fanpop.com/image/photos/13300000/Cute-Puppy-puppies-13379766-1280-800.jpg'}}];
        this.forceUpdate();
        console.log('Error retrieving list of photos from server', err);
      }
    });
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
    console.log("Photo index", newIndex);
    this.setState({
      currentPhotoIndex: newIndex
    });

    // if we are going to paginate and need more photos, we should get it when modulo
    if (this.state.currentPhotoIndex === this.src.length - 1) {
    // fetch the next page of photos
      this.onSearch();
    }
  }

  onSearch() {
    $.ajax({
      url: '/photos',
      method: 'GET',
      data: {
        query: this.state.searchTerm,
        page: this.state.searchPagination
      },
      contentType: 'application/json',
      success: (photoData) => {
        if(photoData){
          // console.log('ON SUCCESS', photoData);
          this.src.push(...photoData);
          this.setState({
            searchPagination: this.state.searchPagination + 1
          });
          console.log('THIS.SRC STATE',this.src);
          console.log('PAGINATION STATE',this.state.searchPagination);
        }
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      }
    });
  }

  onSearchInput(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  viewSelect (e) {
    var selected = e.target.id.split('-');
    var view;
    if (selected.indexOf('signup') !== -1) {
      view = 'signup';
    } else if (selected.indexOf('login') !== -1){
      view = 'login';
    } else {
      view = 'home'
    }
    this.setState({view: view})
  }

  viewLogin () {
    if (this.state.view === 'login' || this.state.view === 'signup') {
      return (
        <div className="popup">
          <div className="popup_inner">
            {/* <div className="header-left">Impulse</div> */}
            <Login
              view={this.state.view}
              switchViews={this.viewSelect.bind(this)}
            />
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }

  render () {
    // if (this.state.view === 'login' || this.state.view === 'signup') {
    //   return (
    //     <div className="grid popup">
    //       <div className="header-left">Impulse</div>
    //       <Login
    //         view={this.state.view}
    //         switchViews={this.viewSelect.bind(this)}
    //       />
    //     </div>
    //   )
    // } else {
      return (
        <div className="grid">
        {this.viewLogin()}
          <div id="impulse-header">Impulse</div>
          <Login id="login"
            click={this.viewSelect.bind(this)}
          />
            <Search id="search"  onSearch={this.onSearch.bind(this)} onSearchInput={this.onSearchInput.bind(this)} />
          <div>
          </div>
          <div className="left auto-center">
            <button onClick={() => this.handlePhotoNavigationClick(-1)}><i className="fa fa-5x fa-angle-left left-middle" aria-hidden="true" ></i></button>
          </div>
          <Carousel currentPhoto={this.src[this.state.currentPhotoIndex]} />
          <div className="right auto-center">
            <button onClick={() => this.handlePhotoNavigationClick(1)}><i className="fa fa-5x fa-angle-right right-middle" aria-hidden="true"  > </i></button>
          </div>
        </div>
      )
    // }
  }
}

if(typeof window !== 'undefined') {
  ReactDOM.render(<App />, document.getElementById('app'));
}
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);

// Adding three states. Definitely using currentPhoto
// Putting placeholders for loggedIn and favoritesView for now
    this.state = {
      currentPhoto: '',
      loginStatus: '',
      favoritesView: ''

    }
  }


  // componentDidMount() {
  //   $.ajax({
  //     url: '/',
  //     success: (data) => {
  //       if (data) {
  //         this.setState({
  //           currentPhoto: data.body || ''
  //         })
  //       }
  //       console.log('setState for displaying a photo');
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }


  render () {
    return (
    <div>
      <h1 className='header'>IMPULSE</h1>
      <Login 
        className='login' 
        loginStatus={this.state.loginStatus}
        />
      <Carousel className='carousel' currentPhoto={this.state.currentPhoto} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
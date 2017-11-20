import React from 'react';


class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (event) {
    this.setState({
      term: event.target.value
    });
  }

  search() {
    console.log('Inside search method in search component', this.state.term);
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Search here" onChange={this.onChange.bind(this)}/>
        <button onClick={this.search.bind(this)}> Get pics! </button>
      </div>
    )
  }

}

export default Search;

import React from 'react';


class Search extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Search here" onChange={(e) => this.props.onSearchInput(e)} />
        <button onClick={this.props.onSearch.bind(this)}>Get pics!</button>
      </div>
    )
  }
}

export default Search;

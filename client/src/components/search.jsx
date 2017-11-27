import React from 'react';

const Search = (props) => {
  return (
    <div className="spacer-right">
      <button id="searchButton" className="float-right grid-right" onClick={() => props.onSearch()}>Get pics!</button>
      <input className="float-right grid-left" type="text" placeholder="Search here" onChange={(e) => props.onSearchInput(e)} />
    </div>
  )
}

export default Search;

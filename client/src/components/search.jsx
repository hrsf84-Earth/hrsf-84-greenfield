import React from 'react';

const Search = (props) => {
  return (
    <div>
      <input type="text" placeholder="Search here" onChange={(e) => props.onSearchInput(e)} />
      <button onClick={() => props.onSearch()}>Get pics!</button>
    </div>
  )
}

export default Search;

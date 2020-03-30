import React from 'react';

const SearchBox = ({ onInputChange, onClickSearch }) => {
  return (
    <div className='tc ma3 db'>
      <label>Enter a movie name: </label>
      <input onChange={onInputChange} />
      <button onClick={onClickSearch}>Search</button>
    </div>
  )
}

export default SearchBox;
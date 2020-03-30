import React from 'react';

const SearchBox = ({ onInputChange, onClickSearch }) => {
  return (
    <div className='tc ma3 db'>
      <input onChange={onInputChange} />
      <button onClick={onClickSearch}>Search</button>
    </div>
  )
}

export default SearchBox;
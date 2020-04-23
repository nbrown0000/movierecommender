import React from 'react';

const SearchBox = ({ onInputChange, onClickSearch, onInputPressEnter }) => {
  return (
    <div className='tc mt0 pt0 dib'>
      <div className='f5 pa1 flex flex-row items-center'>
        <label className='pr2'>Enter a movie name: </label>
        <input onChange={onInputChange} onKeyDown={onInputPressEnter} />
      </div>
      <div className='pt3'>
        <button className='ml1 pointer f5 no-underline br-pill ph4 pv2 white bg-black'
          onClick={onClickSearch}>Search</button>
      </div>
    </div>
  )
}

export default SearchBox;
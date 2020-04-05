import React from 'react';
import './CardContainer.css';

const CardContainer = ({ moviesList }) => {
  return (
    <div className='ml3 mr3'>
      <div className='scrollmenu'>
        { moviesList }
      </div>
    </div>
  )
}

export default CardContainer;
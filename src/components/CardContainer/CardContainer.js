import React from 'react';
import './CardContainer.css';

const CardContainer = ({ moviesList }) => {
  return (
    <div className='pl3 pr3'>
      <div className='scrollmenu'>
        { moviesList }
      </div>
    </div>
  )
}

export default CardContainer;
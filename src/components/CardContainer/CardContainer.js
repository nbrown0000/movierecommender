import React from 'react';
import './CardContainer.css';
import Card from '../Card/Card';

const CardContainer = ({ moviesList, toggleBorder }) => {
  return (
    <div className='pl3 pr3'>
      <div className='scrollmenu'>
        {
            moviesList.map((movie,i) => <Card movie={movie} key={i} />)
        }
      </div>
    </div>
  )
}

export default CardContainer;
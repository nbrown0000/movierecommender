import React from 'react';
// import Card from '../Card/Card';

const CardContainer = ({ moviesList }) => {
  return (
    <div className='tc ma3 db'>
      {moviesList.map((item,i) => {
        const imgSrc = `http://image.tmdb.org/t/p/w200/${item.poster_path}`
        return <img alt='poster' src={imgSrc} key={i} />
      })}
    </div>
  )
}

export default CardContainer;
import React from 'react';
import './Card.css';

const Card = ({ movie, setSelectedCard, selectedCard }) => {
  
  let style = {};
  if(selectedCard.id === movie.id) {
    style = { border: '3px solid #333333' }
  } else {
    style = { border: '3px solid white' }
  }

  return (
    <div
      className='card'
      style={style}
      onClick={() => setSelectedCard(movie)}
    >
      {
        movie.poster_path === null ?
          <p className='relative ws-normal pa2'>{movie.original_title}</p>
        :
          <img
            src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt=''
            width='100%'
            height='100%'
          />
      }
    </div>
  )
}

export default Card;
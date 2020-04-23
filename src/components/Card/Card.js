import React from 'react';
import './Card.css';

const Card = ({ movie, setSelectedMovie, selectedMovie }) => {
  
  let style = {};
  if(selectedMovie.id === movie.id) {
    style = {
      border: '3px solid #333333',
      width: '150px',
      height: '225px'
    }
  } else {
    style = {
      border: '3px solid white',
      width: '150px',
      height: '225px'
    }
  }

  return (
    <div
      className='card'
      style={style}
      onClick={() => setSelectedMovie(movie)}
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
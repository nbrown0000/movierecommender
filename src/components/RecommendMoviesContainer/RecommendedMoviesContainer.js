import React from 'react';
import Card from '../Card/Card';

const RecommendedMoviesContainer = ({ moviesList, selectedMovie, setSelectedMovie }) => {
  return (
    <div className='mt4'>
      {
        moviesList.length === 0
        ?
          <></>
        :
          
          <React.Fragment>
            <div className='f5 dib pa3 mid-gray'>
              <p className='i fw7 pa0 ma0'>We found {moviesList.length} movies with that name.</p>
            </div>
            <div className='scrollmenu'>
              {
                moviesList.map((movie,i) => {
                  return <Card
                    movie={movie}
                    key={i}
                    setSelectedMovie={setSelectedMovie}
                    selectedMovie={selectedMovie}
                  />
                })
              }
            </div>
          </React.Fragment>
      }
      
    </div>
  )
}

export default RecommendedMoviesContainer;
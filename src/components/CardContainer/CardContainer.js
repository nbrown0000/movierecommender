import React from 'react';
import './CardContainer.css';
import Card from '../Card/Card';

const CardContainer = ({ moviesList, selectedMovie, setSelectedMovie, route }) => {

  let containerClass = ''
  if(route === 'search') { containerClass='scrollmenu' }
  else { containerClass='noscrollmenu' }

  return (
    <div className='mt4'>
      {
        moviesList.length === 0
        ?
          <></>
        :
          
          <React.Fragment>
            <div className='f5 dib pa3 mid-gray'>
              {
                route === 'search'
                ?
                  <p className='i fw7 pa0 ma0'>We found {moviesList.length} movies with that name.</p>
                :
                  <p className='i fw7 pa0 ma0'>We recommend the following {moviesList.length} movies.</p>
              }
            </div>
            <div className={containerClass}>
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

export default CardContainer;
import React from 'react';
import './CardContainer.css';
import Card from '../Card/Card';

const CardContainer = ({ moviesList, selectedMovie, setSelectedMovie, route, onClickStartAgain }) => {

  let containerClass = ''
  if(route === 'search') { containerClass='scrollmenu' }
  else { containerClass='noscrollmenu' }

  return (
    <div className='mt4'>
      {
        moviesList.length === 0
        ?
          <React.Fragment>{/* INTENTIONALLY BLANK */}</React.Fragment>
        :
          
          <React.Fragment>
            <div className='f5 dib pa3 mid-gray'>
              {
                route === 'search'
                ?
                  <p className='i fw7 pa0 ma0'>We found {moviesList.length} movies with that name.</p>
                :
                  <React.Fragment>
                    <p className='i fw7 pa0 ma0 mb2'>We recommend the following {moviesList.length} movies.</p>
                    <button
                      className='ml1 pointer f5 no-underline br-pill ph4 pv2 white bg-black'
                      onClick={onClickStartAgain}
                    >
                      Start Again
                    </button>
                  </React.Fragment>
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
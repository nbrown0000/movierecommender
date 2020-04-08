import React from 'react';
import './CardContainer.css';

const CardContainer = ({ moviesList }) => {
  return (
    <div className='mt4'>
      {
        moviesList.length === 0
        ?
          <></>
        :
          
          <React.Fragment>
            <div className='f6 bg-mid-gray br4 db pa3 white'>
              <p className='i fw7 pa0 ma0'>We found {moviesList.length} movies with that name.</p>
            </div>
            <div className='scrollmenu'>
              { moviesList }
            </div>
          </React.Fragment>
      }
      
    </div>
  )
}

export default CardContainer;
import React from 'react';
import './SelectedCardPanel.css';

class SelectedCardPanel extends React.Component {

  genreIdToName = (genre_ids) => {
    /*
     * Convert the genre id codes to genre names
     * ( get genreList from props )
     */
    var result = [];
    genre_ids.forEach(id => {
      this.props.genreList.forEach(item => {
        if(item.id === id) result.push(item.name)
      })
    })
    /* .join(", ") adds commas between list items */
    return result.join(", ");
  }

  
  render() {
    const { original_title, release_date, overview, genre_ids } = this.props.selectedMovie;

    return (
      <div className='tl ma3' >
        {
          this.props.selectedMovie !== ''
          ?
            <div className='mid-gray'>
              <div className='pa2'>
                <div className='flex flex-row justify-between ma0 pa0 items-center'>
                  <h2 className='ma0 pa0'>{original_title} ({release_date.slice(0,4)})</h2>
                  <button
                    className='ml1 pointer f5 no-underline br-pill ph4 pv2 white bg-black'
                    onClick={this.props.getRecommendedMovies}
                  >
                    Recommend Similar Movies
                  </button>
                
                </div>
                <p>{this.genreIdToName(genre_ids)}</p>
                <p>{overview}</p>
              </div>
            </div>
          :
            <React.Fragment></React.Fragment>
        }
      </div>
    )
  }
}

export default SelectedCardPanel;
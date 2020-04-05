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
    const { original_title, release_date, overview, genre_ids } = this.props.selectedCard;

    return (
      <div className='tl ma3' >
        {
          this.props.selectedCard !== ''
          ?
            <div className='mid-gray'>
              <div className='pa2'>
                <h2>{original_title}</h2>
                <p>{release_date}</p>
                <p>{this.genreIdToName(genre_ids)}</p>
                <p>{overview}</p>
              </div>
              <button className='pointer f5 grow no-underline br-pill ph3 pv2 dib white bg-black'>
                  Recommend Similar Movies
              </button>
            </div>
          :
            <React.Fragment></React.Fragment>
        }
      </div>
    )
  }
}

export default SelectedCardPanel;
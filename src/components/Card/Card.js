import React from 'react';
import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      poster: `http://image.tmdb.org/t/p/w200/${this.props.movie.poster_path}`,
      title: this.props.movie.original_title
    }
  }

  componentDidMount() {
    console.log(this.props.movie.poster_path)
  }

  render() {
    const { poster, title } = this.state;
    return (
      <div className='card mr2'>
        {
          this.props.movie.poster_path === null ?
            <p className='relative ws-normal pa2'>{title}</p>
          :
            <img src={poster} alt='' width='auto' height='225px' />
        }
      </div>
    )
  }
}

export default Card;
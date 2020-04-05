import React from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import CardContainer from './components/CardContainer/CardContainer';
import Card from './components/Card/Card';
import SelectedCardPanel from './components/SelectedCardPanel/SelectedCardPanel';
import './App.css';
import 'tachyons';
import apiConfig from './apiKeys';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      genreList: [],
      moviesList: [],
      selectedCard: ''
    }
  }

  componentDidMount() {
    /*
     * Fetch genre list from TMDB API.
     * The object returned contains
     * an object genres that contains
     * an array of objects { id, genre }
     */
    const apiKey = apiConfig.TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(response => response.json())
    .then(data => this.setState({ genreList: data.genres }));
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onClickSearch = () => {
    if(this.state.input === '') return alert("Seach must include a name");
    this.setState({ moviesList: [] });

    /* Using The Movie Database (TMDb) API */
    const searchTerm = this.state.input.split(' ').join('+');
    const apiKey = apiConfig.TMDB_API_KEY;
    const fetchString = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
    fetch(fetchString)
      .then(response => response.json())
      .then(data => {
        
        if(data.results.length === 0) {
          this.setState({ moviesList: [] });
          alert("No movies found by that name")
        } else {
          this.setState({ moviesList: data.results });
        }
        console.log(data.results)
      });

    /*
     * TODO: Expand search to include
     * __ALL PAGES__ TMDB query
     * ( currently only servicing 1st page )
     */

  }

  setSelectedCard = (event) => {
    this.setState({ selectedCard: event })
  }

  render() {
    const { moviesList, selectedCard } = this.state;
    return (
      <div className="App">
        <h1 style={{fontFamily: 'Roboto'}}>Movie Recommender</h1>
        <SearchBox onClickSearch={this.onClickSearch}  onInputChange={this.onInputChange} />
        <CardContainer
          className='scrollmenu'
          moviesList={moviesList.map((movie,i) => {
            return <Card
              movie={movie}
              key={i}
              setSelectedCard={this.setSelectedCard}
              selectedCard={selectedCard}
            />
          })}
          resetAllCardBorders={this.resetAllCardBorders}
        />
        <SelectedCardPanel
          selectedCard={selectedCard}
          genreList={this.state.genreList}
        />
      </div>
    );
  }
}

export default App;

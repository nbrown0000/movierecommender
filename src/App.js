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
      selectedCard: '',
      testArray: []
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

    const apiKey = apiConfig.TMDB_API_KEY;
    const searchTerm = this.state.input.split(' ').join('+');
    const fetchString = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
    fetch(fetchString)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          moviesList: prevState.moviesList.concat(data.results)
        }))
        if (data.total_pages > 1) {
          for (let i=2; i<=data.total_pages; i++) {
            fetch(`${fetchString}&page=${i}`)
              .then(response => response.json())
              .then(data => {
                this.setState(prevState => ({
                  moviesList: prevState.moviesList.concat(data.results)
                }))
              })
          }
        }
        
      })

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

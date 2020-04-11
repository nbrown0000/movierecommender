import React from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import CardContainer from './components/CardContainer/CardContainer';
import SelectedCardPanel from './components/SelectedCardPanel/SelectedCardPanel';
import Card from './components/Card/Card';
import './App.css';
import 'tachyons';
import apiConfig from './apiKeys';


class App extends React.Component {
  constructor(props) {
    super(props)

    /* this.state.route default is 'search' */
    this.state = {
      input: '',
      genreList: [],
      moviesList: [],
      selectedMovie: '',
      recommendedMovies: [],
      route: 'search'
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
    this.setState({
      moviesList: [],
      selectedMovie: '',
      getRecommendedMovies: []
    });

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

  setSelectedMovie = (movie) => {
    this.setState({ selectedMovie: movie })
  }

  getRecommendedMovies = () => {
    const apiKey = apiConfig.TMDB_API_KEY;
    /* Algorithm for finding similar movies */
    const genresToSearch = this.state.selectedMovie.genre_ids
    let fetchString = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=`;
    genresToSearch.forEach(item => { fetchString=fetchString+item+',' });
    fetchString=fetchString.slice(0, -1)
    fetch(fetchString)
      .then(response => response.json())
      .then(data => this.setState({
        recommendedMovies: data.results,
        route: 'result'
      }))
  }

  render() {
    console.log(this.state.recommendedMovies)
    const { moviesList, selectedMovie } = this.state;
    const sort_param = 'popularity'
    const sortedMoviesList = moviesList.sort((a, b) => (a[sort_param] < b[sort_param]) ? 1 : -1)
    
    return (
      <div className="App">
        <h1 style={{fontFamily: 'Roboto'}} className='mb3'>Movie Recommender</h1>
        {
          this.state.route === 'search'
          ?
            <React.Fragment>
              <SearchBox onClickSearch={this.onClickSearch}  onInputChange={this.onInputChange} />
              <CardContainer
                moviesList={sortedMoviesList}
                selectedMovie={this.state.selectedMovie}
                setSelectedMovie={this.setSelectedMovie}
                route={this.state.route}
              />
              <SelectedCardPanel
                selectedMovie={selectedMovie}
                genreList={this.state.genreList}
                getRecommendedMovies={this.getRecommendedMovies}
              />
            </React.Fragment>
          :
            this.state.route === 'result'
            ?
              <React.Fragment>
                <CardContainer
                  moviesList={this.state.recommendedMovies}
                  selectedMovie={this.state.selectedMovie}
                  setSelectedMovie={this.setSelectedMovie}
                  route={this.state.route}
                />
              </React.Fragment>
            :
              <React.Fragment>
                {/* INTENTIONALLY BLANK */}
              </React.Fragment>
        }
        
      </div>
    );
  }
}

export default App;

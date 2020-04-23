import React from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import CardContainer from './components/CardContainer/CardContainer';
import SelectedCardPanel from './components/SelectedCardPanel/SelectedCardPanel';
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
    /* Fetch genre list from TMDB API.   The object returned contains
     * an object genres that contains an array of objects { id, genre }  */
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
    this.setState({ moviesList: [], selectedMovie: '', getRecommendedMovies: [] });

    /* call Movie Recommender API */
    fetch(`${process.env.REACT_APP_API_URL}/searchByTitle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'title': this.state.input })
    })
    .then(response => response.json())
    .then(data => this.setState({ moviesList: data}))
  }

  setSelectedMovie = (movie) => {
    this.setState({ selectedMovie: movie })
  }

  getRecommendedMovies = () => {
    /* Algorithm for finding similar movies */
    const apiKey = apiConfig.TMDB_API_KEY;
    const genresToSearch = this.state.selectedMovie.genre_ids
    let fetchString = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=`;
    genresToSearch.forEach(item => { fetchString=fetchString+item+',' });
    fetchString=fetchString.slice(0, -1)
    fetch(fetchString)
    .then(response => response.json())
    .then(data => {
      this.setState(prevState => ({
        recommendedMovies: prevState.recommendedMovies.concat(data.results)
      }))
      if (data.total_pages > 1) {
        for (let i=2; i<=data.total_pages; i++) {
          fetch(`${fetchString}&page=${i}`)
          .then(response => response.json())
          .then(data => {
            this.setState(prevState => ({
              recommendedMovies: prevState.recommendedMovies.concat(data.results)
            }))
          })
        }
      }
      this.setState({ route: 'result' })  
      })
  }

  onClickStartAgain = () => {
    this.setState({
      input: '',
      genreList: [],
      moviesList: [],
      selectedMovie: '',
      recommendedMovies: [],
      route: 'search'
    })
  }

  render() {
    // console.log(this.state.moviesList)
    
    const {
      moviesList,selectedMovie, route,
      genreList, recommendedMovies
    } = this.state;

    const sort_param = 'popularity';

    const sortedMoviesList = moviesList.sort((a, b) => {
      return (a[sort_param] < b[sort_param]) ? 1 : -1
    });
    const sortedRecommendMoviesList = recommendedMovies.sort((a, b) => {
      return (a[sort_param] < b[sort_param]) ? 1 : -1
    }).slice(0,30);
    
    return (
      <div className="App">
        <h1 style={{fontFamily: 'Roboto'}} className='mb3'>Movie Recommender</h1>
        {
          this.state.route === 'search'
          ?
            <React.Fragment>
              <SearchBox
                onClickSearch={this.onClickSearch}
                onInputChange={this.onInputChange}
              />
              <CardContainer
                moviesList={sortedMoviesList}
                selectedMovie={selectedMovie}
                setSelectedMovie={this.setSelectedMovie}
                route={route}
                onClickStartAgain={this.onClickStartAgain}
              />
              <SelectedCardPanel
                selectedMovie={selectedMovie}
                genreList={genreList}
                getRecommendedMovies={this.getRecommendedMovies}
              />
            </React.Fragment>
          :
            this.state.route === 'result'
            ?
              <React.Fragment>
                <CardContainer
                  moviesList={sortedRecommendMoviesList}
                  selectedMovie={selectedMovie}
                  setSelectedMovie={this.setSelectedMovie}
                  route={route}
                  onClickStartAgain={this.onClickStartAgain}
                />
              </React.Fragment>
            :
              <React.Fragment>{/* INTENTIONALLY BLANK */}</React.Fragment>
        }
        
      </div>
    );
  }
}

export default App;

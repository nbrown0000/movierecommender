import React from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import CardContainer from './components/CardContainer/CardContainer';
import SelectedCardPanel from './components/SelectedCardPanel/SelectedCardPanel';
import './App.css';
import 'tachyons';
const REACT_APP_API_URL = 'https://simple-movie-recommender.herokuapp.com';


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
    /* Fetch list of genres */
    fetch(REACT_APP_API_URL+'/getGenres')
    .then(response => response.json())
    .then(data => this.setState({ genreList: data.genres }))
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onInputPressEnter = (event) => {
    if(event.keyCode === 13) { this.onClickSearch(); }
  }

  onClickSearch = () => {
    if(this.state.input === '') return alert("Seach must include a name");
    this.setState({ moviesList: [], selectedMovie: '', getRecommendedMovies: [] });

    /* call Movie Recommender API */
    fetch(`${REACT_APP_API_URL}/searchByTitle`, {
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
    /* call Movie Recommender API */
    fetch(`${REACT_APP_API_URL}/searchByGenres`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'genre_ids': this.state.selectedMovie.genre_ids })
    })
    .then(response => response.json())
    .then(data => this.setState({ recommendedMovies: data}));

    this.setState({ route: 'result' })  
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
                onInputPressEnter={this.onInputPressEnter}
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

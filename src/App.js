import React from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import CardContainer from './components/CardContainer/CardContainer';
import './App.css';
import 'tachyons';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      searchResult: []
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onClickSearch = () => {
    /* Using The Movie Database (TMDb) API */
    const searchTerm = this.state.input.split(' ').join('+');
    const apiKey = apiConfig.TMDB_API_KEY;
    const fetchString = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
    fetch(fetchString)
      .then(response => response.json())
      .then(data => {
        this.setState({ searchResult: data.results });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Recommender</h1>
        <SearchBox onClickSearch={this.onClickSearch}  onInputChange={this.onInputChange} />
        <CardContainer moviesList={this.state.searchResult} />
      </div>
    );
  }
}

export default App;

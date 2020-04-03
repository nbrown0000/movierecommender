import React from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import CardContainer from './components/CardContainer/CardContainer';
import Card from './components/Card/Card';
import './App.css';
import 'tachyons';
import apiConfig from './apiKeys';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      moviesList: [],
      selectedCard: ''
    }
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
        this.setState({ moviesList: data.results }, function() {
          this.setBordersWhite();
        });
        
        if(data.results.length === 0) {
          alert("No movies found by that name")
        }
        // console.log(data.results)
      });

    /*
     * TODO: Expand to gather list from all pages of TMDB query result
     *
     * 
     * 
     */

  }

  setSelectedCard = (event) => {
    this.setState({ selectedCard: event })
  }

  render() {
    // console.log(this.state.moviesList)
    return (
      <div className="App">
        <h1>Movie Recommender</h1>
        <SearchBox onClickSearch={this.onClickSearch}  onInputChange={this.onInputChange} />
        <CardContainer
          className='scrollmenu'
          moviesList={this.state.moviesList.map((movie,i) => {
            return <Card
              movie={movie}
              key={i}
              setSelectedCard={this.setSelectedCard}
              selectedCard={this.state.selectedCard}
            />
          })}
          resetAllCardBorders={this.resetAllCardBorders}
        />
        {
          this.state.selectedCard !== '' ?
          this.state.selectedCard.original_title :
          <></>
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUtensils, faSearchLocation, faPhone, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import SearchForm from './Components/SearchForm';
import RestaurantList from './Components/RestaurantList';
import Header from './Components/Header';
import './App.css';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {

      searchLocationQuery: null

    };

  }

  onFormSubmit = (searchLocationQuery) => {
    this.setState({ 
           searchLocationQuery: searchLocationQuery
    })

  }

  render() {

    return (

      <div className="App">
        <Header 
          title = 'Looking for a nice resturant?'
          tagline = 'Find the perfect spot for your meal.'
        />
        <SearchForm onFormSubmit = {this.onFormSubmit}/>
        <RestaurantList 
          searchLocationQuery = {this.state.searchLocationQuery}/> 
      </div>

    );

  }

}


library.add(faUtensils, faSearchLocation, faPhone, faMapMarkerAlt)

export default App;

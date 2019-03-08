//import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';


import React, { Component } from 'react';
// google wrapper import 
//import { Map, GoogleApiWrapper } from 'google-maps-react';
// the import for markers and information of the location 
import {Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'; 

// the sise of the map which will show on the website 
const mapStyles = {
  width: '50%',
  height: '100%'
};
// main class 
export class MapContainer extends Component {
  state = {
   showingInfoWindow: false,  //Hides or the shows the infoWindow
   activeMarker: {},          //Shows the active marker upon click
   selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
 };
 onMarkerClick = (props, marker, e) =>
 this.setState({
   selectedPlace: props,
   activeMarker: marker,
   showingInfoWindow: true
 });

onClose = props => {
 if (this.state.showingInfoWindow) {
   this.setState({
     showingInfoWindow: false,
     activeMarker: null
   });
 }
};
  render() {
    return (
      //the information for the map function and what location we intiallay show on the map 
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 34.244572, lng: -118.528839 }}>
         <Marker
          onClick={this.onMarkerClick}
          name={'California State University, Northridge'}
        />
      
        <InfoWindow 
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
     
    );
  }
}

export default GoogleApiWrapper({
  // The Google API KEY 
  apiKey: 'AIzaSyAcQjrfAudzl6Ton7GA7D-gVqOINMFE7ns'
})(MapContainer);
/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;*/

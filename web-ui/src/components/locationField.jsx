/* global google */
import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

class LocationField extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
      }
      componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(
          this.autocompleteInput.current,
          { types: ["geocode"] }
        );
        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
      }
    
      handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        // this.props.onPlaceChanged(place);
      }



    render() { 
        return (  
        
        <Form.Control 
        onChange={this.handlePlaceChanged} 
        placeholder={this.props.placeholder} 
        id={this.props.idValue} 
        ref={this.autocompleteInput} 
        className="justify-content-md-center w-75"
        /> 
           
        );
    }
}
 
export default LocationField;
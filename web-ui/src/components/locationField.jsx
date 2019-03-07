import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

class LocationField extends Component {
    state = {
        placeholder : this.props.placeholder
    };
    handleChange = event => {

        
    };

    render() { 
        return (  
        
        <Form.Control onChange={this.handleChange} placeholder={this.state.placeholder} id={this.props.idValue}  className="justify-content-md-center w-75"/> 
           
        );
    }
}
 
export default LocationField;
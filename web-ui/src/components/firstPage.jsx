/* global google */
import React, { Component } from 'react';
import LocationField from './locationField';
import {Form} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import GlobalNavBar from './globalNavBar';
/* global google */
import 'bootstrap/dist/css/bootstrap.css';

function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 500));
  }

class FirstPageForm extends Component {
    state = { 
        isLoading: false,
        firstField : "",
        secondField : "",
        place: {}
     };
     
    constructor(){
        super();
        
        this.handleClick = this.handleClick.bind(this);
    };

    showPlaceDetails(place) {
        this.setState({ place });
      };

    handleClick() {
        this.setState({firstField: this.state.firstField = document.getElementById("location1").value});
        this.setState({secondField: this.state.secondField = document.getElementById("location2").value})
        this.setState({ isLoading: true }, () => {
          simulateNetworkRequest().then(() => {
            this.setState({ isLoading: false });
          });
        });
      };



    render() { 
        const AddressDetails = props => {
            return (
                <div>
                  <pre>{JSON.stringify(props.place, null, 2)}</pre>
                </div>
            )
          };
          
        return ( 
            <div>
                <GlobalNavBar/>
                <h2 className="my-4" >Welcome to the Travel Planner</h2>
                <Form>
                    <Row>
                        <Col><LocationField 
                            key={0}
                            idValue={"location1"}
                            placeholder={"Where from?"}
                            onPlaceChanged={this.showPlaceDetails.bind(this)}
                            /> 
                        </Col>
                        <Col><LocationField 
                            key={1} 
                            idValue={"location2"}
                            placeholder={"Where to?"}
                            onPlaceChanged={this.showPlaceDetails.bind(this)}
                            /> 
                        </Col>
                    </Row>
                    <Button variant="outline-primary" 
                            className="btn btn-secondary m-4  mt-5"
                            disabled={this.state.isLoading}
                            onClick={!this.state.isLoading ? this.handleClick : null} 
                    >
                        {this.state.isLoading ? 'Loading…' : 'Submit'}
                    </Button>
                </Form>
                <div>{this.state.firstField}</div>
                <div>{this.state.secondField}</div>
                <AddressDetails place={this.state.place} />
            </div>
            );
    }
}
 
export default FirstPageForm;
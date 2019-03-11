import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import GlobalNavBar from './globalNavBar';
import AutocompleteField from './fieldWithAutocomplete';
import DatePicker from 'react-date-picker';
// import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.css';
// import "react-datepicker/dist/react-datepicker.css";

function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 500));
  }

class FirstPageForm extends Component {
    state = { 
        isLoading: false,
        firstField : "",
        secondField : "",
        notExist : false,
        startDate: new Date(),
        endDate: new Date()

     };
     
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    };

    handleChangeStart(date) {
        this.setState({
          startDate: date
        });
      }


  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
    }

    handleClick() {
        if(
        document.getElementById("location1").className != "justify-content-md-center w-75  form-control is-invalid form-control"
        && document.getElementById("location2").className != "justify-content-md-center w-75  form-control is-invalid form-control"
        && document.getElementById("location1place").innerHTML!="{} "
        && document.getElementById("location2place").innerHTML!="{} ")
        {
            this.setState({firstField: this.state.firstField = document.getElementById("location1").value});
            this.setState({secondField: this.state.secondField = document.getElementById("location2").value});
            this.setState({notExist : false})
        }
        else{
            this.setState({notExist : true})
        }

        this.setState({ isLoading: true }, () => {
          simulateNetworkRequest().then(() => {
            this.setState({ isLoading: false });
          });
        });
      };



    render() { 

        return ( 
            <div>
                <GlobalNavBar/>
                <h2 className="my-4" >Welcome to the Travel Planner</h2>
                <Form>
                    <Row>
                        <Col><AutocompleteField 
                            key={0}
                            idValue={"location1"}
                            placeholder={"Where from?"}
                            /> 
                        </Col>
                        <Col><AutocompleteField 
                            key={1} 
                            idValue={"location2"}
                            placeholder={"Where to?"}
                            /> 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <label htmlFor="startDate" >Depart:</label>
                            </center>
                            <DatePicker 
                                id={"startDate"}
                                className={"justify-content-md-center w-75"}
                                value={this.state.startDate}
                                onChange={this.handleChangeStart}
                            />
                        </Col>
                        <Col>
                            <center>
                                <label htmlFor="endDate" >Return:</label>
                            </center>
                            <DatePicker
                                id={"endDate"}
                                className={"justify-content-md-center w-75"}
                                value={this.state.endDate}
                                onChange={this.handleChangeEnd}
                            />
                        </Col>
  
                    </Row>
                        <Button 
                        id={"submitButton"}
                        variant="outline-primary" 
                        className="btn btn-secondary m-4  mt-5"
                        disabled={this.state.isLoading}
                        onClick={!this.state.isLoading ? this.handleClick : null } 
                    >
                        {this.state.isLoading ? 'Loading…' : 'Submit'}
                    </Button>
             
                </Form>
                <label htmlFor="submitButton" style={{color: 'red'}} >
                        {this.state.notExist? "Please select correct location.":null}
                </label>
                
                <div id={"firstField"}>{this.state.notExist? null:this.state.firstField}</div>
                <div id={"secondField"}>{this.state.notExist? null:this.state.secondField}</div>
                
            </div>
            );
    }
}
 
export default FirstPageForm;




// npm install react-date-picker
import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AutocompleteField from '../components/fieldWithAutocomplete';
import DatePicker from 'react-date-picker';
import TravelRadio from '../components/travelCheckRadio';
import CheckBoxFood from '../components/foodCheckBox';
import gql from 'graphql-tag';
import {graphql , compose} from 'react-apollo';
import {Auth} from 'aws-amplify';
// import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.css';
// import "react-datepicker/dist/react-datepicker.css";

const UpdateMutation = gql`
    mutation($email: String!,$from: String!,$to: String!,$depart: String!,$ureturn: String!,$how: String!,$foods: [String])
    {
        createTravelInfo(email: $email,from: $from,to: $to,depart: $depart,ureturn: $ureturn,how: $how,foods: $foods){
            email,
            from,
            to,
            depart,
            ureturn,
            how,
            foods
        }
    }
`;

function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

class FirstPageForm extends Component {
    state = {
        isLoading: false,
        firstField : "",
        secondField : "",
        notExist : false,
        startDate: new Date(),
        endDate: new Date(),
        saveStartDate : "",
        saveEndDate : "",
        travelRadio : "",
        foods : [],
        email : "",
     };

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        
        Auth.currentUserInfo().then((userInfo) => {
            const { attributes = {} } = userInfo;
            this.setState({email: attributes["email"]})
          })
          .catch(err => this.setState({ email: null }));
    };

    handleChangeStart(date){
        this.setState({
          startDate: date
        },()=>{
            if(this.state.startDate > this.state.endDate){
                this.setState({
                    endDate : this.state.startDate
                })
            }
        });

      }


  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
    }


    handleClick= ()=> {
            var radio = document.getElementsByName('travelRadio');
            var radio_value;
            for(var i = 0; i < radio.length; i++){
                if(radio[i].checked){
                    radio_value = radio[i].id;
                }
            }
            var foods = document.getElementsByName('foodCheckBox');
            var selectedFood  = [];
            for(var j=0;j<foods.length;j++){
                if(foods[j].checked){
                    selectedFood.push(foods[j].id)
                }
            }
            if(
            document.getElementById("location1").className !== "justify-content-md-center w-75  form-control is-invalid form-control"
            && document.getElementById("location2").className !== "justify-content-md-center w-75  form-control is-invalid form-control"
            && document.getElementById("location1place").innerHTML!== "{} "
            && document.getElementById("location2place").innerHTML!=="{} "
            && this.state.startDate !== null
            && this.state.endDate !== null
            && typeof radio_value !== "undefined" )

            {
                this.setState({firstField: this.state.firstField = document.getElementById("location1").value});
                this.setState({secondField: this.state.secondField = document.getElementById("location2").value});
                this.setState({notExist : false})
                this.setState({saveStartDate : this.state.startDate})
                this.setState({saveEndDate : this.state.endDate})
                this.setState({travelRadio: radio_value})
                this.setState({foods : selectedFood})
                this.props.createTravelInfo({
                   variables:{
                        email: this.state.email,
                        from: document.getElementById("location1").value,
                        to: document.getElementById("location2").value,
                        depart: this.state.startDate.toLocaleString('us-GB', { timeZone: 'UTC' }),
                        ureturn: this.state.endDate.toLocaleString('us-GB', { timeZone: 'UTC' }),
                        how: radio_value,
                        foods: selectedFood


                    }
                })

                this.setState({ isLoading: true }, () => {
                    simulateNetworkRequest().then(() => {
                        this.setState({ isLoading: false });
                        window.location.assign('#/result')
                    });
                })
                
                
                
            }
            else{
                this.setState({notExist : true})
            }



      };



    render() {
        
        const { isLoading } = this.state;
        const todayDate = new Date();
        const { user } = this.props;
            return (
                <React.Fragment>
                    { !user && null }
                    {user && <div style={{overflow: 'auto'}} >
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
                                        <label htmlFor="startDate" className={"pt-4"}>Depart:</label>
                                    </center>
                                    <DatePicker
                                        minDate={todayDate }
                                        id={"startDate"}
                                        className={"justify-content-md-center w-75"}
                                        value={this.state.startDate}
                                        onChange={this.handleChangeStart}
                                    />
                                </Col>
                                <Col>
                                    <center>
                                        <label htmlFor="endDate" className={"pt-4"} >Return:</label>
                                    </center>
                                    <DatePicker
                                        minDate={this.state.startDate > todayDate ? this.state.startDate:todayDate}
                                        id={"endDate"}
                                        className={"justify-content-md-center w-75"}
                                        value={this.state.endDate}
                                        onChange={this.handleChangeEnd}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <TravelRadio></TravelRadio>
                            </Row>
                            <Row>
                                <CheckBoxFood></CheckBoxFood>
                            </Row>

                                <Button
                                id={"submitButton"}
                                variant="outline-primary"
                                className="btn btn-secondary  mt-5"
                                disabled={isLoading}
                                onClick={!isLoading ? this.handleClick : null }
                            >
                                {this.state.isLoading ? 'Loading…' : 'Submit'}
                            </Button>

                        </Form>
                        <label htmlFor="submitButton" style={{color: 'red'}} >
                                {this.state.notExist? "Please complete the form.":null}
                        </label>
{/* 
                        <div id={"firstField"}>{this.state.notExist? null:this.state.firstField}</div>
                        <div id={"secondField"}>{this.state.notExist? null:this.state.secondField}</div>
                        <div id={"startDate"}>{this.state.notExist? null:this.state.saveStartDate.toLocaleString('us-GB', { timeZone: 'UTC' })}</div>
                        <div id={"endDate"}>{this.state.notExist? null:this.state.saveEndDate.toLocaleString('us-GB', { timeZone: 'UTC' })}</div>
                        <div id={"travelRadioResult"}>{this.state.notExist? null:this.state.travelRadio}</div>
                        <div id={"foodsResult"}>{this.state.notExist? null:this.state.foods}</div> */}

                    </div>}
                </React.Fragment>
                );
        
    }
}

export default graphql(UpdateMutation, {name: "createTravelInfo"}) (FirstPageForm);




// npm install react-date-picker

import React, { Component } from 'react';
import './App.css';

import FirstPageForm from './components/firstPage';
import SecondPageResult from './components/secondPage';
// import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageStep: 0,
            data: [],
        };
    }
    componentDidMount(){

    }
    changePageStep = (val, data) => {
        this.setState({
            pageStep: val,
            data: data,
        })
    };

    render(){
        const {pageStep, data} = this.state;

        if (pageStep === 0){
            return(
                <div className='MainPage'>
                    <FirstPageForm pageStep = {this.changePageStep}/>
                </div>
            )
        }
        else{
            return(
                <div className='MainPage'>
                    <SecondPageResult data = {data} pageStep = {this.changePageStep}/>
                </div>
            )
        }

    }

}

export default App;

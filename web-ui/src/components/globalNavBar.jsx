import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { SignOut } from 'aws-amplify-react';
import {Auth} from 'aws-amplify';


export default class NavigatorBar extends Component {
    state = {
        name : "test",
      }
      constructor(props) {
        super(props);
        Auth.currentUserInfo().then((userInfo) => {
            const { attributes = {} } = userInfo;
            this.setState({name: attributes["given_name"]})
        })
        .catch(err => this.setState({ name: null }));
        }
    render() { 
  
        

        return (                
             <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary ">
                <Navbar.Brand href="#/">Team2</Navbar.Brand>
                <Navbar.Toggle target="#navbarsExampleDefault" />
                <Navbar.Collapse id="navbarsExampleDefault">
                    
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#/Profile">Profile <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#/result">Last Search <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <Navbar.Text className={"mr-3"}>Hi {this.state.name}     </Navbar.Text>
                    <SignOut onClick={window.location.assign('#/')}/>
                </Navbar.Collapse>
                
            </Navbar> 
        );
    }
}


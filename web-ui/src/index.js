import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import SearchBarComp from './components/searchField';
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

ReactDOM.render(
    <ApolloProvider client={client}>
    <div id="mainPage">
      <center>
        <h1>Welcome to the Travel Planner</h1>
        <SearchBarComp/>
        </center>
        {/* <App /> */}
      </div>
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
 
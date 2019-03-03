import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import Paper from '@material-ui/core/Paper';

const UsersQuery = gql`
{
  users {
    id
    firstName
		lastName
  }
}
`;



class App extends Component {
  render() {
    const {data: {loading, users}} = this.props;
    if (loading){
      return null;
    }
    return (
      
      <div style={{display: 'flex'}}>

          <div style={{margin:'auto',width: 400}}>
            <Paper elevation = {1}>
              {users.map(user =>
                <div key={`${user.id}-todo-item`}>{user.firstName}  {user.lastName}</div>
              )}  
            </Paper>
          </div>
      </div>

    );
  }
}

export default graphql(UsersQuery)(App);


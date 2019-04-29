import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Auth} from 'aws-amplify';

const TravelInfoQuery = gql`
query($email: String!){
  travelInfos(email: $email){
    id
    email
    from
    to
    depart
    ureturn
    how
    foods
  }
}
`;
class SecondPageResult extends Component {
    state = { }
    

    
    render() {
      
        
        console.log(this.props.email)
        const {data: {loading,travelInfos}} = this.props;
        const { user } = this.props;
        if (loading || !user){
          return null;
        }
        else{
        return (
          
          <div>
              <center>

                  {/* <div style={{margin:'auto',width: 400}}>
                      {travelInfos[travelInfos.length-1].from}
                      ,
                      {travelInfos[travelInfos.length-1].to}
                      ,
                      {travelInfos[travelInfos.length-1].depart}
                      ,
                      {travelInfos[travelInfos.length-1].ureturn}
                      ,
                      {travelInfos[travelInfos.length-1].how}
                      ,
                      {travelInfos[travelInfos.length-1].foods}

                  </div> */}
                  <pre>{JSON.stringify(travelInfos[travelInfos.length-1],null, 2)} </pre>
              </center>
          </div>
          );
        }
    }
}

export default graphql(TravelInfoQuery, {
  options: (props) =>({variables:{email: props.email}})
}) (SecondPageResult);

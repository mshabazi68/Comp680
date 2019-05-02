import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import MapWithADirectionsRenderer from '../components/googleMap';
import RestaurantList from '../components/RestaurantList';
import SearchForm from '../components/SearchForm';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

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
    // constructor(props){
    //   super(props)
    //   this.onFormSubmit("Santa Monica, CA, USA")
    // }
    
    onSubmit = () => {
      window.location.reload();
      this.props.pageStep(0, []);
    };
    onFormSubmit = (searchLocationQuery) => {
      this.setState({ 
             searchLocationQuery: searchLocationQuery
      })
  
    }
    
    render() {
      
        

        const {data: {loading,travelInfos}} = this.props;
        const { user } = this.props;

        
        if (loading || !user){
          return null;
        }
        else{
        return (
          
          
              <center>
              
                    
                        
                           
                  <div >
                    <MapWithADirectionsRenderer way={"DRIVING"} lat1={36.778261} lng1={-119.41793239999998} lat2={39.0997265} lng2={-94.57856670000001} />

                  </div>
                  <div>
                    {/* {this.onFormSubmit(travelInfos[travelInfos.length-1].to)} */}
                    <hr>


                    </hr>
                  <SearchForm onFormSubmit = {()=>this.onFormSubmit(travelInfos[travelInfos.length-1].to)} />
                  <hr>
                  </hr>
                  <RestaurantList 
                    searchLocationQuery = {this.state.searchLocationQuery}/> 
                  </div>
                        
                 
                

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
                  {/* <pre>{JSON.stringify(travelInfos[travelInfos.length-1],null, 2)} </pre> */}
              </center>
          
          );
        }
    }
}

export default graphql(TravelInfoQuery, {
  options: (props) =>({variables:{email: props.email}})
}) (SecondPageResult);

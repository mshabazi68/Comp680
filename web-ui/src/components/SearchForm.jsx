
import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

class SearchForm extends Component {

    state = {
        isEmpty : false,
        notExist : false
      };
    constructor() {
        super();
        this.state = {
        
            searchLocationQuery: ""
        }
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);

    }
    componentDidMount() { 
        /* global google */
       this.autocomplete = new google.maps.places.Autocomplete(
         this.autocompleteInput.current,
         { types: ["geocode"] }
       );
       this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
     }

     handlePlaceChanged() {
        const place = this.autocomplete.getPlace();  
         if(place.address_components != null){
           this.setState({notExist:false})
         }
         else{
          this.setState({notExist:true})
         }
         
         this.setState({searchLocationQuery: place.formatted_address});    
        
       }

    handleSearchChange = (e) => {
        this.setState({
            searchLocationQuery: e.target.value
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();  
        this.setState({searchLocationQuery : e.target.value});
        this.props.onFormSubmit(this.state.searchLocationQuery);

    }
    render(){
        return (

            <div className = "searchForm">

                {/*add an event listener of form submit so the state only get set when the form is submitted*/}

                <form onSubmit={(e) => this.handleFormSubmit(e)}>

                    {/* <label 

                    htmlFor = 'location'

                    arialabel = 'enter address, neighbourhood, city, province or postal code'

                    className = 'searchForm__label'

                    >I am looking for yelp resturants near </label> */}
                    
                    {/* <input
                         type='text'
                          ref={this.autocompleteInput}
                          id="location"
                          placeholder="Enter your address"
                         value={this.state.searchLocationQuery}
                         className = 'searchForm__input'
                    />                  */}
                   
                    <Button 

                    type = 'submit'

                    className = 'searchForm__button'

                    >Show the Yelp Result

                    <FontAwesomeIcon icon="search-location" className="searchForm__icon"/>

                    </Button>

                </form>

            </div>

        );

    }

}


export default SearchForm
import React, { Component } from 'react';
import NavBar from './NavBar';
import {withStyles} from '@material-ui/core/styles/index';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import classNames from 'classnames';
import DatePicker from 'react-date-picker';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    location: {
      padding: '5px',
    },
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 1,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    waySelect: {
        padding: '5px',
    },
    foodCheck: {
        minWidth: '150px',
    }
});
class FirstPageForm extends Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        // this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            address1: '',
            address2: '',
            startDate: new Date(),
            endDate: new Date(),
            radioValue: 'DRIVING',
            foods : [],
            latlng1: [],
            latlng2: [],
        };
    }
    handleChangeFood = name => event => {
        this.setState({
            foods: {
                ...this.state.foods,
                [name]: event.target.checked
            }
        });

    };
    handleChangeAddress1 = address1 => {
        console.log('address', address1)
        // console.log('real address', event.target.value)
        this.setState({ address1 });
    };

    handleChangeAddress2 = address2 => {
        console.log('address', address2)
        // console.log('real address', event.target.value)
        this.setState({ address2 });
    };
    handleChange = event => {
        this.setState({ radioValue: event.target.value });
    };
    handleSelect1 = address1 => {
        this.setState({ address1 });
        console.log('address', address1)
        geocodeByAddress(address1)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({latlng1: latLng}))
            .catch(error => console.error('Error', error));

    };
    handleSelect2 = address2 => {
        this.setState({ address2 });
        console.log('address', address2)
        geocodeByAddress(address2)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({latlng2: latLng}))
            .catch(error => console.error('Error', error));
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

    };
    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    };
    onSubmit = () => {
        let data = this.state;
        this.props.pageStep(1, data);
    };

    render() {
        const {classes} = this.props;
        const todayDate = new Date();
        console.log('States', this.state);
        //console.log('Radio', this.state.radioValue);

        return(
            <div className="mainPage">
                <NavBar/>
                <div className={classNames(classes.locations, 'lt-20')}>
                    <div className='container'>
                        <h2 className='text-center' style={{marginTop: '40px', marginBottom:'20px', color: 'black'}}>Welcome to the Travel Planner</h2>
                        <div className='row justify-content-around mt-5'>
                            <div className='col-sm-5 text-center'>

                                    <PlacesAutocomplete
                                        value={this.state.address1}
                                        onChange={this.handleChangeAddress1}
                                        // onChange={address1 => this.setState({ address1 })}
                                        onSelect={this.handleSelect1}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                                <input
                                                    {...getInputProps({
                                                        placeholder: 'Where from?',
                                                        className: 'location-search-input form-control',
                                                        required: true,
                                                    })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                    {loading && <div>Loading...</div>}
                                                    {suggestions.map(suggestion => {
                                                        const className = suggestion.active
                                                            ? 'suggestion-item--active'
                                                            : 'suggestion-item';
                                                        // inline style for demonstration purpose
                                                        const style = suggestion.active
                                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                        return (
                                                            <div
                                                                {...getSuggestionItemProps(suggestion, {
                                                                    className,
                                                                    style,
                                                                })}
                                                            >
                                                                <span>{suggestion.description}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>

                            </div>
                            <div className='col-sm-5 text-center'>
                                    <PlacesAutocomplete
                                        value={this.state.address2}
                                        onChange={this.handleChangeAddress2}
                                        // onChange={address2 => this.setState({ address2 })}
                                        onSelect={this.handleSelect2}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                                <input
                                                    {...getInputProps({
                                                        placeholder: 'Where to?',
                                                        className: 'location-search-input form-control',
                                                        required: true,
                                                    })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                    {loading && <div>Loading...</div>}
                                                    {suggestions.map(suggestion => {
                                                        const className = suggestion.active
                                                            ? 'suggestion-item--active'
                                                            : 'suggestion-item';
                                                        // inline style for demonstration purpose
                                                        const style = suggestion.active
                                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                        return (
                                                            <div
                                                                {...getSuggestionItemProps(suggestion, {
                                                                    className,
                                                                    style,
                                                                })}
                                                            >
                                                                <span>{suggestion.description}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>


                            </div>
                        </div>
                        <div className='row justify-content-around mt-3'>
                            <div className='col-sm-5 text-center'>
                                <center><label htmlFor="startDate" className={"pt-4"}>Depart:</label></center>
                                <DatePicker
                                    minDate={todayDate }
                                    id={"startDate"}
                                    className={"justify-content-md-center w-75"}
                                    value={this.state.startDate}
                                    onChange={this.handleChangeStart}
                                    required={true}
                                />
                            </div>
                            <div className='col-sm-5 text-center'>
                                <center><label htmlFor="endDate" className={"pt-4"}>Return:</label></center>
                                <DatePicker
                                    minDate={this.state.startDate > todayDate ? this.state.startDate:todayDate}
                                    id={"endDate"}
                                    className={"justify-content-md-center w-75"}
                                    value={this.state.endDate}
                                    onChange={this.handleChangeEnd}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-sm-4'>
                                <h5 style={{fontSize: '1.1rem'}} className="mb-2">How will you be going there:</h5>
                                <div className={classes.root}>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <RadioGroup
                                            aria-label="Way"
                                            name="way"
                                            className={classes.group}
                                            value={this.state.radioValue}
                                            onChange={this.handleChange}
                                        >
                                            <FormControlLabel value="PLANE" control={<Radio className={classNames(classes.waySelect, '')} color="primary" />} label="Plane" />
                                            <FormControlLabel value="DRIVING" control={<Radio className={classNames(classes.waySelect, '')} color="primary" />} label="Car" />
                                            <FormControlLabel value="TRANSIT" control={<Radio className={classNames(classes.waySelect, '')} color="primary" />} label="Transit" />
                                            <FormControlLabel value="OTHER" control={<Radio className={classNames(classes.waySelect, '')} color="primary" />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='col-sm-8'>
                                <h5 style={{fontSize: '1.1rem'}} className="mb-2">What kind of food or/and drink do you like:</h5>
                                <FormGroup row className='mt-3'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Mexican']?this.state.foods['Mexican']:false}
                                                onChange={this.handleChangeFood('Mexican')}
                                                value="Mexican"
                                                color="primary"
                                            />
                                        }
                                        label="Mexican"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['American']?this.state.foods['American']:false}
                                                onChange={this.handleChangeFood('American')}
                                                value="American"
                                                color="primary"
                                            />
                                        }
                                        label="American"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Japanese']?this.state.foods['Japanese']:false}
                                                onChange={this.handleChangeFood('Japanese')}
                                                value="Japanese"
                                                color="primary"
                                            />
                                        }
                                        label="Japanese"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Italian']?this.state.foods['Italian']:false}
                                                onChange={this.handleChangeFood('Italian')}
                                                value="Italian"
                                                color="primary"
                                            />
                                        }
                                        label="Italian"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Chinese']?this.state.foods['Chinese']:false}
                                                onChange={this.handleChangeFood('Chinese')}
                                                value="Chinese"
                                                color="primary"
                                            />
                                        }
                                        label="Chinese"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Mediterranean']?this.state.foods['Mediterranean']:false}
                                                onChange={this.handleChangeFood('Mediterranean')}
                                                value="Mediterranean"
                                                color="primary"
                                            />
                                        }
                                        label="Mediterranean"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Sandwiches']?this.state.foods['Sandwiches']:false}
                                                onChange={this.handleChangeFood('Sandwiches')}
                                                value="Sandwiches"
                                                color="primary"
                                            />
                                        }
                                        label="Sandwiches"
                                        className={classNames(classes.foodCheck, '')}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Fast Food']?this.state.foods['Fast Food']:false}
                                                onChange={this.handleChangeFood('Fast Food')}
                                                value="Fast Food"
                                                color="primary"
                                            />
                                        }
                                        label="Fast Food"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Buffets']?this.state.foods['Buffets']:false}
                                                onChange={this.handleChangeFood('Buffets')}
                                                value="Buffets"
                                                color="primary"
                                            />
                                        }
                                        label="Buffets"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Cafes']?this.state.foods['Cafes']:false}
                                                onChange={this.handleChangeFood('Cafes')}
                                                value="Cafes"
                                                color="primary"
                                            />
                                        }
                                        label="Cafes"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Vegan']?this.state.foods['Vegan']:false}
                                                onChange={this.handleChangeFood('Vegan')}
                                                value="Vegan"
                                                color="primary"
                                            />
                                        }
                                        label="Vegan"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Breakfast & Brunch']?this.state.foods['Breakfast & Brunch']:false}
                                                onChange={this.handleChangeFood('Breakfast & Brunch')}
                                                value="Breakfast & Brunch"
                                                color="primary"
                                            />
                                        }
                                        label="Breakfast & Brunch"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Street Vendors']?this.state.foods['Street Vendors']:false}
                                                onChange={this.handleChangeFood('Street Vendors')}
                                                value="Street Vendors"
                                                color="primary"
                                            />
                                        }
                                        label="Street Vendors"

                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Bars']?this.state.foods['Bars']:false}
                                                onChange={this.handleChangeFood('Bars')}
                                                value="Bars"
                                                color="primary"
                                            />
                                        }
                                        label="Bars"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Pizza']?this.state.foods['Pizza']:false}
                                                onChange={this.handleChangeFood('Pizza')}
                                                value="Pizza"
                                                color="primary"
                                            />
                                        }
                                        label="Pizza"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Desserts']?this.state.foods['Desserts']:false}
                                                onChange={this.handleChangeFood('Desserts')}
                                                value="Desserts"
                                                color="primary"
                                            />
                                        }
                                        label="Desserts"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Kosher']?this.state.foods['Kosher']:false}
                                                onChange={this.handleChangeFood('Kosher')}
                                                value="Kosher"
                                                color="primary"
                                            />
                                        }
                                        label="Kosher"
                                        className={classNames(classes.foodCheck, '')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.foods['Ice Cream & Frozen Yogurt']?this.state.foods['Ice Cream & Frozen Yogurt']:false}
                                                onChange={this.handleChangeFood('Ice Cream & Frozen Yogurt')}
                                                value="Ice Cream & Frozen Yogurt"
                                                color="primary"
                                            />
                                        }
                                        label="Ice Cream & Frozen Yogurt"
                                        className={classNames(classes.foodCheck, '')}
                                    />

                                </FormGroup>

                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-md-12 text-center'>
                                <Button variant="contained" type="submit" color="primary" className={classes.button} onClick={this.onSubmit}>
                                    Submit <Icon style={{fontSize: '16px', marginLeft: '5px'}} className=''>arrow_forward</Icon>
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default withStyles(styles, {withTheme: true})(FirstPageForm);
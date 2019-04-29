/*global google*/
import React, { Component } from 'react';
import NavBar from './NavBar';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/es/Icon/Icon";
import classNames from 'classnames';
import {withStyles} from "@material-ui/core/styles/index";
import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,

} from "react-google-maps";

const styles = theme => ({
    location: {
        padding: '5px',
    },
    root: {
        display: 'flex',
    }
});
// class MapWithADirectionsRenderer extends Component{
//
// }
const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcQjrfAudzl6Ton7GA7D-gVqOINMFE7ns&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,

    lifecycle({
        componentDidMount() {
            console.log('text', this.props);

            const DirectionsService = new google.maps.DirectionsService();
            console.log('travelmode', google.maps);
            DirectionsService.route(
                {
                    origin: new google.maps.LatLng(this.props.lat1, this.props.lng1),
                    // origin: new google.maps.LatLng(36.778261, -119.41793239999998),
                    // destination: new google.maps.LatLng(39.0997265, -94.57856670000001),
                    destination: new google.maps.LatLng(this.props.lat2, this.props.lng2),
                    travelMode: google.maps.TravelMode[this.props.way]
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    })
)(props => (
    <GoogleMap defaultZoom={5} defaultCenter={{ 'lat': -34.397, 'lng': 150.644 }}>
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
));
class SecondPageResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        }
    }
    onSubmit = () => {
        window.location.reload();
        this.props.pageStep(0, []);
    };
    render() {
        console.log('data', this.state.data);
        const {data} = this.state;
        const {classes} = this.props;
        return(
            <div className="mainPage">
                <NavBar/>
                <div className={classNames(classes.locations, 'lt-20')}>
                    <div className='container'>
                        <div className='row mt-5'>
                            <div className='col-md-12'>
                                <Button variant="contained" type="submit" color="primary" className={classes.button} onClick={this.onSubmit}>
                                    <Icon style={{fontSize: '16px', marginRight: '5px'}} className=''>arrow_back</Icon> Back
                                </Button>
                            </div>
                            <div className='col-md-12 mt-5'>
                                <MapWithADirectionsRenderer way={data['radioValue']} lat1={data['latlng1']['lat']} lng1={data['latlng1']['lng']} lat2={data['latlng2']['lat']} lng2={data['latlng2']['lng']} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(SecondPageResult);

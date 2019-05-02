/*global google*/
import React from 'react';
import {compose, lifecycle, withProps} from "recompose";
import {withGoogleMap, withScriptjs, GoogleMap, DirectionsRenderer,} from "react-google-maps";


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
                    travelMode: (this.props.way === 'TRANSIT')?google.maps.TravelMode.DRIVING:google.maps.TravelMode[this.props.way]
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


export default MapWithADirectionsRenderer;
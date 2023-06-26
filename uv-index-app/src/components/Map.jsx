import React from 'react';
import GoogleMapReact from 'google-map-react';

function Map() {
    // initializes the coordinates {lat, lon} from the currentweather API json file
    const coordinates = { lat: window.formattedCurrentWeather?.lat, lng: window.formattedCurrentWeather?.lon };

    // Custom map style ~ white glossy map kinda style
    const mapStyle = [
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#878787"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f9f5ed"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#aee0f4"
                }
            ]
        }
    ];

    // TODO: add marker clustering in google map react

    return (
        <div style={{height: '50vh', width:'100%'}}>
            {/*
            premium API: AIzaSyCSCMCccwnkJz1DeaEJmwjCggR6y42jjOo 
            FREE API: AIzaSyAqVssBqzYYWmvEAnog9Q_Hy_JmA48_2Bc
            */}
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyCSCMCccwnkJz1DeaEJmwjCggR6y42jjOo'}}
                center={coordinates}
                defaultZoom={10}
                options={{styles: mapStyle,}}
            >

            </GoogleMapReact>



        </div>
    );


}

export default Map

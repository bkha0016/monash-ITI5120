//Necessary libraries.....
import React, { useEffect, useState } from 'react';
import { MarkerClusterer, Marker, GoogleMap, LoadScript, Circle, InfoWindow } from '@react-google-maps/api';

function MapApp() {

    // map size using container style
    const containerStyle = {
        width: '100%',
        height: '50vh'
    };

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

    //TODO: create clustering in the map, circles with diff radius based on the coordinates position & randomzied it
    //add a infoevent manager functionality in the map
    const locations = [
        { "lat": 52.5200, "lng": 13.4050, "name": "Berlin", "imageUrl": "https://www.germany.travel/media/redaktion/staedte_kultur_content/Berlin_Brandenburger_Tor_im_Sonnenuntergang_Leitmotiv_German_Summer_Cities.jpg" },
        { "lat": -6.2088, "lng": 106.8456, "name": "Jakarta", "imageUrl": "https://facts.net/wp-content/uploads/2023/06/43-facts-about-jakarta-1688094668.jpeg" },
        { "lat": -8.3405, "lng": 115.0919, "name": "Bali", "imageUrl": "https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg" },
        { "lat": 35.6762, "lng": 139.6503, "name": "Tokyo", "imageUrl": "https://media.cntraveler.com/photos/63482b255e7943ad4006df0b/4:3/w_5332,h_3999,c_limit/tokyoGettyImages-1031467664.jpeg" },
        { "lat": 47.6062, "lng": -122.3321, "name": "Seattle", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/58/Seattle_Center_as_night_falls.jpg" },
        { "lat": -33.8688, "lng": 151.2093, "name": "Sydney", "imageUrl": "https://cdn.britannica.com/96/100196-050-C92064E0/Sydney-Opera-House-Port-Jackson.jpg" },
        { "lat": 32.806671, "lng": -86.791130 },
        { "lat": 61.370716, "lng": -152.404419 },
        { "lat": 33.729759, "lng": -111.431221 },
        { "lat": 34.969704, "lng": -92.373123 },
        { "lat": 36.116203, "lng": -119.681564 },
        { "lat": 39.059811, "lng": -105.311104 },
        { "lat": 41.597782, "lng": -72.755371 },
        { "lat": 39.318523, "lng": -75.507141 },
        { "lat": 47.528912, "lng": -99.784012 },
        { "lat": 42.230171, "lng": -71.530106 },
        { "lat": 4.6951, "lng": 96.7494 },
        { "lat": -8.4095, "lng": 115.1889 },
        { "lat": -6.4058, "lng": 106.0640 },
        { "lat": -3.5778, "lng": 102.3464 },
        { "lat": -7.1509, "lng": 110.1403 },
        { "lat": -1.6815, "lng": 113.3824 },
        { "lat": -1.4300, "lng": 121.4456 },
        { "lat": -4.5586, "lng": 105.4068 },
        { "lat": -4.2699, "lng": 138.0804 },
        { "lat": -6.914744, "lng": 107.609810 },
        { "lat": -0.7893, "lng": 113.9213 },
        { "lat": -3.0926, "lng": 115.2838 },
        { "lat": -0.0236, "lng": 109.3425 },
        { "lat": -2.8169, "lng": 114.8860 },
        { "lat": -7.7971, "lng": 110.3705 },
        { "lat": -5.3191, "lng": 105.5298 },
        { "lat": -7.6145, "lng": 111.9506 },
        { "lat": 35.0116, "lng": 135.7681 },
        { "lat": 34.7039, "lng": 135.5022 },
        { "lat": 35.6896, "lng": 139.7006 },
        { "lat": 35.6762, "lng": 139.6503 },
        { "lat": 53.0793, "lng": 8.8017 },
        { "lat": 50.9375, "lng": 6.9603 },
        { "lat": 48.2082, "lng": 16.3738 },
        { "lat": 48.1371, "lng": 11.5754 },
        { "lat": 51.2277, "lng": 6.7735 },
        { "lat": 53.5511, "lng": 9.9937 },
        { "lat": 52.5200, "lng": 13.4050 },
        { "lat": 51.0504, "lng": 13.7373 },
        { "lat": 49.3988, "lng": 8.6724 },
        { "lat": 51.3397, "lng": 12.3731 },
        { "lat": 51.4818, "lng": 7.2162 },
        { "lat": 52.3759, "lng": 9.7320 },
        { "lat": 50.1109, "lng": 8.6821 },
        { "lat": 52.2667, "lng": 10.5263 },
        { "lat": 53.5511, "lng": 9.9937 },
        { "lat": 53.0793, "lng": 8.8017 },
        { "lat": 48.7758, "lng": 9.1829 },
        { "lat": 52.4125, "lng": 13.5314 },
        { "lat": 49.0069, "lng": 8.4037 },
        {"lat":  -6.119756781891828, "lng": 106.8489373740866, "name": "Beach Party",  "imageUrl": "https://www.crosalsafestival.com/var/news/storage/images/cssf/2020/spotlights/parties/amarin_beach_parties/596213-3-eng-GB/amarin_beach_parties_cssffullarticle.jpg"},
        {"lat": -6.302279177781512, "lng": 106.65215685345032, "name": "Monash University Indonesia", "imageURL": "https://www.monash.edu/__data/assets/image/0010/3265471/Monash-University-Building-Sunset.jpg"}
      ];
    const clusterOptions = {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        gridSize: 60,
        maxZoom: 15
      };

    const customIcon = {
        url: '../assets/sunMan.png',
        size: { width: 30, height: 30},
        scaledSize: { width: 30, height: 30}
    };

    const circleOptions = {
        strokeColor: 'white',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '',
        fillOpacity: 0.35,
        clickable: true,
        draggable: false,
        editable: false,
        visible: true,
        radius: 10000

    };

    const getRandomColor = () => {
        const colors = ['red', 'orange', 'green', 'purple'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      };
    
      const getRandomRadius = () => {
        return Math.random() * 40000 + 10000; // Random radius between 10000 and 50000 meters
      };

      const [selectedLocation, setSelectedLocation] = useState(null);

      const handleMarkerClick = (location) => {
        setSelectedLocation(location);
      };
    
      const handleInfoWindowClose = () => {
        setSelectedLocation(null);
      };

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyCSCMCccwnkJz1DeaEJmwjCggR6y42jjOo'
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={coordinates}
                zoom={11}
                options={{styles: mapStyle}}

            >
                <MarkerClusterer options={clusterOptions}>
                    {(clusterer) =>
                        locations.map((location) => (
                            <Marker 
                            key={location.lat} 
                            position={location} 
                            clusterer={clusterer}
                            onClick={() => handleMarkerClick(location)}
                            //icon={customIcon}
                            
                            />
                        ))
                    }
                </MarkerClusterer>
                {locations.map((location, index) => (
                    <Circle
                    key={index}
                    center={location}
                    options={{
                        ...circleOptions,
                        fillColor: getRandomColor(),
                        radius: getRandomRadius()
                    }}
                    />
                ))}

                {selectedLocation && (
                        <InfoWindow
                        position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                        onCloseClick={handleInfoWindowClose}
                        >
                        <div>
                            <img src={selectedLocation.imageUrl} alt={selectedLocation.name} style={{ width: '200px', height: '200px' }} />
                            <h3>{selectedLocation.name}</h3>
                        </div>
                        </InfoWindow>
                )}

            </GoogleMap>


        </LoadScript>
    );


}

export default MapApp;

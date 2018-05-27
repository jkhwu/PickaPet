// import React from 'react';
// const GoogleMap = require('../../../api/maps');
// import { withScriptjs, GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

// class Map extends React.Component {
//     render() {
//         var map;
//         // const mapContainer = <div style={{height: '100%', width: '100%'}}></div>;
        
//         function initMap() {
//             var options = {
//                 //get coordinates from average of results
//                 center: {lat: 32, lng: -117},
//                 zoom: 11
//             }
//             map = new google.maps.Map(document.getElementById('map'), options);
            
//             var icon = {
//                 path: 'M -15,-15 15,-15 15,15 -15,15 -15,-15',
//                 fillColor: 'grey',
//                 fillOpacity: 0.8,
//                 scale: 1,
//                 strokeColor: 'black',
//                 strokeWeight: 2
//             };
            
//             //add Marker function
//             //call add marker function for each of the 5 results of yelp search
//             function addMarker(props) {
//                 var marker = new google.maps.Marker({
//                     position: props.coords,
//                     map: map,
//                     icon: icon,
//                     label: props.resultNum /* RESULT NUMBER*/
//                 })
//                 var infoWindow = new google.maps.InfoWindow({
//                 content: '<div><h4>' + props.name + '</h4><hr><p>' + props.address + '</p></div>'/*Location name and address*/
//                 })
//                 marker.addListener('click', function() {
//                     infoWindow.open(map, marker);
//                 })
//             };
//         };
    
//         return (
//             <div id="mapContainer">
//                 <h2>Map Nearby Pet Locations</h2>
//                 <button className="mapButton" id="park" value="dog park">Dog Parks</button>
//                 <button className="mapButton" id="store" value="pet store">Pet Stores</button>
//                 <button className="mapButton" id="restaurant" value="pet friendly restaurant">Pet Friendly Restaurants</button>
//                 <div id="map" style={{width:"400px", height: "400px", backgroundColor: "green"}}>test: {map}</div>
//             </div>
//             /* <GoogleMapLoader
//                 containerElement = { mapContainer }
//                 googleMapElement = {
//                     <GoogleMap
//                         defaultZoom={13}
//                         defaultCenter={{lat: 32, lng: -117}}
//                         options={{streetViewControl: false, mapTypeControl: false}}>
//                     </GoogleMap>
//                 }
//             /> */
//         )
//     }
// }

// export default Map;

import React, { Component } from 'react';
// import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react' 
// import child component
import MapContainer from './mapcontainer.js';
class Map extends Component {
  render() {
    return (
      <div>
        <h1> Google Maps API + React </h1> {/*// title
  MOST IMPORTANT: Here we are passing the Google Maps props down to the MapContainer component as 'google'.  */}
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAhEDd6KCc_-MNLSCwo18cnT_8ZnhmsrV8',
})(Map)
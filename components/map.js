import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react'; 
export class MapContainer extends React.Component {
  render() {
    const list = [
      {title: "hello",name:"boma",lat:"37.778519",log:"-123.405640"},
      {title: "hee",name:"SOMA",lat:"37.778519",log:"-122.405640"},
    ]
    return (
      <Map google={this.props.google} zoom={14} 
      // initialCenter={{
      //   lat: 40.854885,
      //   lng: -88.081807
      // }}
      style={{width: '50%', height: '50%', position: 'relative'}}>

     {list.map(element => (

     <Marker
       name={element.name}
       title={element.title}
      position={{lat: element.lat, lng: element.log}} />
      
      
     
     ))}
  

       
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCg1klgc0JnYbexMEiafA3Qh6D9pgprfF4")
})(MapContainer)
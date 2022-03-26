import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { useGeolocation } from 'rooks'
import React from 'react'
import Typography from '@mui/material/Typography'

const MapContainer = props => {
  const location = useGeolocation()

  return (
    <>
      {location && location.isError && (
        <Typography>The feature is not possible without allowing Location permission</Typography>
      )}
      <Map
        initialCenter={{
          lat: 19.116216,
          lng: 72.839594
        }}
        center={
          location && {
            lat: location.lat,
            lng: location.lng
          }
        }
        google={props.google}
        zoom={14}
        style={{ width: '60%', height: '60%', position: 'relative' }}
      ></Map>
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCg1klgc0JnYbexMEiafA3Qh6D9pgprfF4'
})(MapContainer)

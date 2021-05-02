import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width:'100%',
  height:'600px',
};

const center = {
  lat: -30.8,
  lng: 130.0
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: '76f2bdf6ee680c6e',
    googleMapsApiKey: "AIzaSyBwABvxXWa0Qq7T9ZE2Pty0RfBoXVn4nnQ"
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
  
}

export default React.memo(MyComponent)
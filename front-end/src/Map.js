import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width:'100%',
  height:'600px',
};
const center = {
  lat: -30.8136,
  lng: 140.9631
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: '76f2bdf6ee680c6e',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
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
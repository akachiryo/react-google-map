import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useSwipeable } from "react-swipeable";

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 35.714298137051514,
  lng: 139.7120631411662
};

const infoWindowStyle = {
  position: "fixed",
  bottom: "0px"
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)
  const [imageUrl, setImageUrl] = React.useState(0)
  const [directions, setDirections] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [open, setOpen] = React.useState(false);

  const redIcon = {
    url: "./red-ping.png"
  };

  const bigRedIcon = {
    url: "./big-red-ping.png"
  };

  const blueIcon = {
    url: "./blue-ping.png"
  };

  const handleClick = (num) => {
      setImageUrl(num);
  };

  const handlers = useSwipeable({
    onSwiped: (event) => {
        if (event.dir == "Left") {
          if(imageUrl < 3){
            setImageUrl(prev => prev + 1);
          } else {
            setImageUrl(1)
          }
        }
        if (event.dir == "Right") {
          if(imageUrl !== 1) {
            setImageUrl(prev => prev - 1);
          }else {
            setImageUrl(3)
          }
        }
    },
    trackMouse: true, 
});

const directionsCallback = (response) => {
  if (response !== null) {
    setDirections(response);
  }
};

  const card = {
    backgroundColor: "#fff",
    boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={{ lat: 35.714298137051514, lng: 139.7120631411662 }}
        icon={blueIcon}
      />

      <Marker
        position={{ lat: 35.7144, lng: 139.7121 }}
        key="1"
        icon={imageUrl === 1 ? bigRedIcon : redIcon}
        onClick={() => {
          handleClick(1);
        }}
      />
      {imageUrl === 1 && (
          <div style={card} {...handlers}>
            <p>テスト１</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=35.7144,139.7121" target="_blank">目的地までのルートを表示する</a>
          </div>
      )}

      <Marker
      key="2"
        position={{ lat: 35.7134045, lng: 139.7118311 }}
        icon={imageUrl === 2 ? bigRedIcon : redIcon}
        onClick={() => {
          handleClick(2);
        }}
      />
      {imageUrl === 2 && (
          <div style={card} {...handlers}>
            <p>テスト2</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=35.7134045,139.7118311" target="_blank">目的地までのルートを表示する</a>
          </div>
      )}

      <Marker
        key="3"
        position={{ lat: 35.7132088, lng: 139.7111982 }}
        icon={imageUrl === 3 ? bigRedIcon : redIcon}
        onClick={() => {
          handleClick(3);
        }}
      />
      {imageUrl === 3 && (
          <div style={card} {...handlers}>
            <p>テスト3</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=35.7132088,139.7111982" target="_blank">目的地までのルートを表示する</a>
          </div>
      )}
  </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)

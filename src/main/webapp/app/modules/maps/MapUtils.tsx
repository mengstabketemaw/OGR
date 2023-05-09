import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, useMap, useMapEvents } from 'react-leaflet';
import MapTiles from './MapTiles';
import { point } from './icons';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import React from 'react';
import { Button, Label, Tooltip } from 'reactstrap';

const UserMarkerExp = forwardRef((props, ref) => {
  const [position, setPosition] = useState({ lat: 9.0079232, lng: 38.7678208 });
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.setView(e.latlng, map.getZoom());
    },
  });
  useEffect(() => {
    map.locate();
  }, []);

  useImperativeHandle(ref, () => ({
    save(callback) {
      callback(position.lat, position.lng);
    },
    reset() {
      map.locate();
    },
  }));

  return (
    <Marker
      position={position}
      icon={point}
      draggable={true}
      eventHandlers={{
        move(e) {
          setPosition(e['latlng']);
        },
        dragend(e) {
          map.setView(position);
        },
      }}
    ></Marker>
  );
});

const ChooseLocation = ({ setLocation }) => {
  const child = useRef();
  const handleReset = () => {
    // @ts-ignore
    child.current.reset();
  };
  const handleSave = () => {
    // @ts-ignore
    child.current.save(setLocation);
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <div
        style={{
          height: 'fit-content',
          padding: '30px',
          width: '700px',
          border: '2px solid black',
          flexGrow: 1,
        }}
      >
        <p>Choose Your Location</p>
        <Label variant="h6" color="InfoText">
          Drag the marker to Your Home Location
        </Label>
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              height: '300px',
              width: '500px',
              margin: '10px',
              border: '2px solid black',
            }}
          >
            <MapContainer style={{ height: '100%' }} center={[8, 38]} zoom={20} scrollWheelZoom={true}>
              <MapTiles />
              <UserMarkerExp ref={child} />
            </MapContainer>
          </div>
          <div>
            <Button onClick={handleReset}>RESET</Button>
            <Button onClick={handleSave} variant="contained">
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseLocation;

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, useMap, useMapEvents } from 'react-leaflet';
import MapTiles from './MapTiles';
import { point } from './icons';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import React from 'react';
import { Button, Label, Tooltip } from 'reactstrap';
import { Translate } from 'react-jhipster';

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
        <Label variant="h6" color="InfoText">
          <Translate contentKey={'map.chooseLocation'} />
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
            <MapContainer style={{ height: '100%' }} center={[9.0079232, 38.7678208]} zoom={15} scrollWheelZoom={true}>
              <MapTiles />
              <UserMarkerExp ref={child} />
            </MapContainer>
          </div>
          <div>
            <Button onClick={handleReset}>
              <Translate contentKey={'entity.action.rest'} />
            </Button>
            <Button onClick={handleSave} color="primary">
              <Translate contentKey={'entity.action.save'} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseLocation;

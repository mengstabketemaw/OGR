import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, useMap, useMapEvents } from 'react-leaflet';
import MapTiles from './MapTiles';
import { point } from './icons';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import React from 'react';
import { Button, Label, Tooltip } from 'reactstrap';
import { Translate } from 'react-jhipster';

const UserMarkerExp = forwardRef((props, ref) => {
  const [position, setPosition] = useState({ lat: -11.2027, lng: 17.8739 });
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
    <div
      style={{
        height: '500px',
      }}
    >
      <Label variant="h6" color="InfoText">
        <Translate contentKey={'map.chooseLocation'} />
      </Label>

      <MapContainer style={{ height: '100%' }} center={[-11.2027, 17.8739]} zoom={7} scrollWheelZoom={true}>
        <MapTiles />
        <UserMarkerExp ref={child} />
      </MapContainer>
      <div>
        <Button onClick={handleReset}>
          <Translate contentKey={'entity.action.rest'} />
        </Button>
        <Button onClick={handleSave} color="primary">
          <Translate contentKey={'entity.action.save'} />
        </Button>
      </div>
    </div>
  );
};

export default ChooseLocation;

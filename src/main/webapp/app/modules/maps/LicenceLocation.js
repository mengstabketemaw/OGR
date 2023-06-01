import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from './createRoutineMachineLayer';
import { point } from './icons';
import MapTiles from './MapTiles';
import { Button, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { GeoLocationChooser } from 'app/shared/common/dynamicFields';
import { useSearchParams } from 'react-router-dom';

const LicenceLocation = () => {
  const [me, setMe] = useState(null);
  const [locationModal, setLocationModal] = useState({ show: false, value: null });
  const [params] = useSearchParams();

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(e => {
      setMe([e.coords.latitude, e.coords.longitude]);
    });
  }, []);
  const handleClose = () => {
    setLocationModal({
      ...locationModal,
      show: false,
    });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '70vh',
        width: '100%',
        border: '2px solid black',
      }}
    >
      {me === null ? (
        <>
          <div className="d-flex justify-content-center flex-column">
            <h4 className="text-info">
              <Translate contentKey={'map.permissionNotGranted'} />
            </h4>
            <Button onClick={() => setLocationModal({ ...locationModal, show: true })} color={'primary'}>
              <Translate contentKey={'map.enterLocationManually'} />
            </Button>
          </div>
        </>
      ) : (
        <>
          <MapContainer style={{ height: '100%', width: '100%' }} center={me} zoom={8}>
            <MapTiles />
            <Marker position={me} icon={point}>
              <Popup>Your are here!</Popup>
            </Marker>
            <RoutingMachine me={me} patient={params.get('to').split(',')} />
          </MapContainer>
        </>
      )}
      <GeoLocationChooser
        showModal={locationModal.show}
        setLocation={(lat, lng) => {
          setMe([lat, lng]);
          handleClose();
        }}
        handleClose={handleClose}
      />
    </div>
  );
};

export default LicenceLocation;

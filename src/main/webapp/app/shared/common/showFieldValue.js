import React, { useState } from 'react';
import { Button, Col, Modal, ModalFooter, ModalHeader, Row } from 'reactstrap';
import moment from 'moment';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import MapTiles from 'app/modules/maps/MapTiles';
import DoctorsIcon, { point } from 'app/modules/maps/icons';

const ShowFieldValue = ({ data }) => {
  const [locationModal, setLocationModal] = useState({ show: false, value: '' });
  const getFieldValue = field => {
    switch (field.fieldType.name) {
      case 'location':
        return (
          <a className="cursor-pointer hover-blue underline-hover" onClick={() => setLocationModal({ show: true, value: field.text })}>
            {field.text}
          </a>
        );
      case 'text':
        return field.text;
      case 'select':
        return field.dropDown;
      case 'date':
        return moment(field.date).format('MMMM do YYYY');
      case 'datetime-local':
        return moment(field.dateAndTime).format('MMMM Do YYYY, h:mm:ss a');
      case 'checkbox':
        return field.checkBoxId === 1;
      case 'file':
        return 'download';
    }
    return 'Data Type is not found';
  };

  return data.map(field => {
    return (
      <>
        <Row xs="2">
          <Col>
            <p style={{ textAlign: 'end' }}>{field.label}</p>
          </Col>
          <Col>
            <p className="font-weight-bold">{getFieldValue(field)}</p>
          </Col>
        </Row>
        <ShowLocationModal
          show={locationModal.show}
          value={locationModal.value}
          handleClose={() => setLocationModal({ show: false, value: '' })}
        ></ShowLocationModal>
      </>
    );
  });
};

const ShowLocationModal = ({ show, value, handleClose }) => {
  let location = value.split(',');

  if (location.length < 2) return <></>;

  return (
    <Modal isOpen={show}>
      <ModalHeader>Geo-Locator</ModalHeader>
      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer style={{ height: '100%', width: '100%' }} center={location} zoom={20} scrollWheelZoom={true}>
          <MapTiles />
          <Marker position={location} icon={point}>
            <Popup>"Here!"</Popup>
          </Marker>
        </MapContainer>
      </div>
      <ModalFooter>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};
export default ShowFieldValue;

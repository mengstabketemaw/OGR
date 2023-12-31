import React, { useState } from 'react';
import { Button, Modal, ModalFooter, ModalHeader, Row } from 'reactstrap';
import moment from 'moment';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import MapTiles from 'app/modules/maps/MapTiles';
import { point } from 'app/modules/maps/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { ValidatedField } from 'react-jhipster';
import './showFieldValue.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';
function getValue(fieldData, fieldType) {
  switch (fieldType.name) {
    case 'location':
    case 'textarea':
    case 'text':
      return fieldData?.text;
    case 'select':
      return fieldData?.dropDown;
    case 'date':
      return fieldData?.date;
    case 'checkbox':
      return Number(fieldData?.checkBoxId);
    case 'datetime-local':
      return moment(fieldData?.dateAndTime).format('YYYY-MM-DDTHH:MM');
    case 'file':
      return fieldData?.file;
  }
  return undefined;
}
const ShowFieldValue = ({ data, form }) => {
  const [locationModal, setLocationModal] = useState({ show: false, value: '' });
  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const [visibleItems, setVisibleItems] = useState(8);

  const formFields = form.fields.filter(field => field.state.id === 0);
  const halfLength = Math.ceil((formFields.length > visibleItems ? visibleItems : formFields.length) / 2);
  const firstHalf = formFields.slice(0, halfLength);
  const secondHalf = formFields.slice(halfLength, visibleItems);
  const getFileName = name => {
    let fData = data.find(fData => fData.label === name);
    if (fData === undefined) {
      return <p>No file chosen</p>;
    }
    const fileName = fData.encodingFileType?.split('~')[0];
    const encodedType = fData.encodingFileType?.split('~')[1];

    return (
      <>
        {fileName && encodedType ? (
          <>
            <a
              className="cursor-pointer hover-blue underline-hover d-flex flex-row align-items-center text-wrap"
              download={fileName}
              href={`${encodedType},${fData.file}`}
            >
              <span className="pt-1 text-blue pb-1 d-inline-block text-break">
                {fileName} <FontAwesomeIcon icon={faDownload} color="#2DCEC8" size="1x" />
              </span>
            </a>
          </>
        ) : (
          <p className="cursor-pointer">No File</p>
        )}
      </>
    );
  };
  const handleLoadMore = e => {
    e.preventDefault();
    setVisibleItems(prev => prev + 100);
  };
  const InsideFieldValue = field => {
    let fData = data.find(fData => fData.label === field.label);

    const value = getValue(fData, field.fieldType);

    return field.fieldType.name === 'select' ? (
      <ValidatedField
        key={field.id}
        name={field.label}
        disabled={true}
        type={field.fieldType.name}
        value={value}
        label={currentLocale == 'pt-pt' ? field.portugueseLabel : field.label}
      >
        {field.options.map((a, i) => (
          <option key={i} value={a.name}>
            {a.name}
          </option>
        ))}
      </ValidatedField>
    ) : field.fieldType.name === 'location' ? (
      <ValidatedField
        name={field.label}
        disabled={true}
        key={field.id}
        label={currentLocale == 'pt-pt' ? field.portugueseLabel : field.label}
        autoComplete={'off'}
        value={value}
      />
    ) : field.fieldType.name === 'info' ? (
      <i>{currentLocale == 'pt-pt' ? field.portugueseLabel : field.label}</i>
    ) : field.fieldType.name === 'file' ? (
      <div className="mb-3 p-3">
        {currentLocale == 'pt-pt' ? field.portugueseLabel : field.label}
        {getFileName(field.label)}
      </div>
    ) : field.fieldType.name === 'checkbox' ? (
      <ValidatedField
        disabled={true}
        className="mb-0 d-flex flex-column custom-checkbox"
        key={field.id}
        type={field.fieldType.name}
        name={field.label}
        checked={value === 1}
        label={currentLocale == 'pt-pt' ? field.portugueseLabel : field.label}
      />
    ) : (
      <ValidatedField
        disabled={true}
        key={field.id}
        type={field.fieldType.name}
        name={field.label}
        value={value}
        label={currentLocale == 'pt-pt' ? field.portugueseLabel : field.label}
      />
    );
  };

  return (
    <>
      <Row md="2">
        <Row xs="1" className="p-3 mr-3">
          {firstHalf.map(field => {
            return InsideFieldValue(field);
          })}
        </Row>

        <Row xs="1" className="p-3">
          {secondHalf.map(field => {
            return InsideFieldValue(field);
          })}
        </Row>
        <a></a>
        {formFields.length > visibleItems && (
          <a href="#" onClick={handleLoadMore} className="text-right">
            Show all
          </a>
        )}
      </Row>
      <ShowLocationModal
        show={locationModal.show}
        value={locationModal.value}
        handleClose={() => setLocationModal({ show: false, value: '' })}
      ></ShowLocationModal>
    </>
  );
};

export const ShowLocationModal = ({ show, value, handleClose }) => {
  let location = value.split(',');

  if (location.length < 2) return <></>;

  return (
    <Modal isOpen={show}>
      <ModalHeader>Geo-Locator</ModalHeader>
      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer style={{ height: '100%', width: '100%' }} center={location} zoom={6} scrollWheelZoom={true}>
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

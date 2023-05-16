import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {isArray} from "lodash";
import {Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ChooseLocation from "app/modules/maps/MapUtils";
import axios from "axios";
import ShowFieldValue from "app/shared/common/showFieldValue";
import moment from "moment/moment";
import {convertFileToBase64} from "app/shared/common/formatValue";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const FormDataUpdate = () => {
  const { id } = useParams();
  const [data, setDate] = useState({ loading: true, data: {} });

  useEffect(() => {
    axios
      .get('/api/licence/' + id)
      .then(({ data }) => setDate({ loading: false, data }))
      .catch(console.log);
  }, [id]);

  return (
        <Container className="p--5 d-flex flex-column justify-content-center">
          {data.loading ? (
            <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
              Loading...
            </Spinner>
          ) : (
            <>
              <UpdateDynamicFields data={data.data} />
            </>
          )}
        </Container>
  );
}

async function getValue(fieldData) {

  switch (fieldData.fieldType.name) {
    case 'location':
    case 'text':
      return fieldData.text
    case 'select':
      return fieldData.dropDown
    case 'date':
      return fieldData.date
    case 'checkbox':
      return Number(fieldData.checkBoxId)
    case 'datetime-local':
      return fieldData.dateAndTime
    case 'file':
      const fileName = fieldData.encodingFileType?.split('~')[0];
      const encodedType = fieldData.encodingFileType?.split('~')[1];

      return (
        <>
          {fileName && encodedType ? (
            <>
              <a
                className="cursor-pointer hover-blue underline-hover d-flex flex-row align-items-center"
                download={fileName}
                href={`${encodedType},${field.file}`}
              >
                <p className="mr-2">{fileName}</p>
                <FontAwesomeIcon icon={faDownload} color="#2DCEC8" size="2x" />
              </a>
            </>
          ) : (
            <p className="cursor-pointer">No File</p>
          )}
        </>
      );
  }
  return undefined;
}

const UpdateDynamicFields = ({data}) =>{
  const nav = useNavigate();
  const [locationModal,setLocationModal] = useState({show: false, value:""});

  const defaultValue = () => {
    return data.data.map(fieldData=>{
      let key = fieldData.label;
      let value = getValue(fieldData);
    })
  }
  const handleSubmit = () => {}
  const formatValue = () => {}


  const handleValue = async (value) => {
    const formattedValue = await formatValue(value, fields);
    handleSubmit(formattedValue);
  }

  return(<>
      <ValidatedForm onSubmit={handleValue} defaultValues={defaultValue}>
        {data.form.fields.map(field => field.fieldType.name === "select" ?
          <ValidatedField
            type={field.fieldType.name}
            name={field.label}
            label={field.label}//{translate('global.form.username.label')}
            //placeholder="add label"//{translate('global.form.username.placeholder')}
            required={field.required}
          >
            {field.options.map((a, i) => (<option key={i} value={a.name}>{a.name}</option>))}
          </ValidatedField>
          :
          field.fieldType.name === "location" ?
            <ValidatedField
              name={field.label}
              label={field.label}
              autoComplete={"off"}
              value={locationModal.value}
              placeholder={"Click here to add location"}
              required={field.required}
              onClick={() => setLocationModal({...locationModal, show: true})}
            />
            :
            <ValidatedField
              type={field.fieldType.name}
              name={field.label}
              label={field.label}//{translate('global.form.username.label')}
              //placeholder="add label"//{translate('global.form.username.placeholder')}
              required={field.required}
            />
        )
        }
        <Button onClick={() => {
          nav(-1)
        }} replace color="info">
          <FontAwesomeIcon icon="arrow-left"/>
          &nbsp;
          <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
        </Button>
        &nbsp;
        <Button color="primary" type="submit">
          <FontAwesomeIcon icon="save"/>
          &nbsp;
          <Translate contentKey="entity.action.save">Save</Translate>
        </Button>
      </ValidatedForm>
      <GeoLocationChooser showModal={locationModal.show} setValue={setLocationModal} handleClose={()=>setLocationModal({
          ...locationModal,
          show: false,
        })
      }/>
    </>
  )
}
const GeoLocationChooser = ({showModal, handleClose,setValue}) => {

  return (
    <Modal
      isOpen={showModal}
      toggle={handleClose}
      backdrop="static"
      autoFocus={false}
      className={"geo-locator-modal col-lg-12"}
    >
      <ModalHeader>Geo-Locator</ModalHeader>
      <ModalBody>
        <ChooseLocation setLocation={(lat,lon)=>{
          setValue(prev=>{
            return {show:false, value: lat + "," + lon}
          })
        }}/>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

export default FormDataUpdate;

import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {Translate, ValidatedBlobField, ValidatedField, ValidatedForm} from "react-jhipster";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ChooseLocation from "app/modules/maps/MapUtils";
import axios from "axios";
import {convertFileToBase64} from "app/shared/common/formatValue";
import moment from "moment";
import {toast} from "react-toastify";

function getFieldValueName(type){
  switch (type) {
    case "textarea":
    case 'location':
    case 'text':
      return "text"
    case 'select':
      return "dropDown"
    case 'date':
      return "date"
    case 'checkbox':
      return "checkBoxId"
    case 'datetime-local':
      return "dateAndTime"
    case 'file':
      return "file"
  }
}
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
              <UpdateDynamicFields data={data.data}/>
            </>
          )}
        </Container>
  );
}

function getValue(fieldData) {

  switch (fieldData?.fieldType.name) {
    case 'location':
    case 'textarea':
    case 'text':
      return fieldData.text
    case 'select':
      return fieldData.dropDown
    case 'date':
      return fieldData.date
    case 'checkbox':
      return Number(fieldData.checkBoxId)
    case 'datetime-local':
      return moment(fieldData.dateAndTime).format("YYYY-MM-DDTHH:MM")
    case 'file':
      return fieldData.file
  }
  return undefined;
}

export const UpdateDynamicFields = ({data}) =>{
  const [fieldData, setFieldData] = useState(data.data)
  const nav = useNavigate();
  const [locationModal,setLocationModal] = useState({show: false, label:undefined});

  const getFieldDataTemplate = (name) => {
    let field = data.form.fields.find(formFields => formFields.label === name)
    return {
      id:null,
      fieldType: field.fieldType,
      label: name,
      text: undefined,
      dropDown: undefined,
      date: undefined,
      dateAndTime: undefined,
      checkBoxId: undefined,
      file: undefined,
      encodingFileType: undefined,
    }
  }
  const getFieldValue = (name) => {
    let fData = fieldData.find(fData => fData.label === name);

    if(fData === undefined){ //This means a new field is added.
      setFieldData(prev => [...prev, getFieldDataTemplate(name)])
    }
    return getValue(fData);
  }

  const handleSubmit = () => {
    axios.put("/api/licence/" + data.id, {
      ...data,
      data: fieldData
    }).then(()=> {
      toast.success(<Translate contentKey={'toaster.success'}/>);
      nav(-1);
    }).catch(e=>{
      toast.error(<Translate contentKey={'toaster.error'}/>);
    })
    // console.log(fieldData)
  }

  const getOnChangeHandler = name => {
    let fData = fieldData.find(fData => fData.label === name);
    return event => {
      setFieldData(prev => {
        let newFieldData = prev.map(prevFieldData=> {
          if(prevFieldData.label === fData.label)
            return {...prevFieldData, [getFieldValueName(prevFieldData.fieldType.name)] : fData.fieldType.name === "datetime-local" ? moment(event.target.value).format() : event.target.value};
          return {...prevFieldData};
        })
        return newFieldData;
      })
    }
  }
  const getOnChangeHandlerForCheckbox = name => {
    let fData = fieldData.find(fData => fData.label === name);
    return event => {
      setFieldData(prev => {
        let newFieldData = prev.map(prevFieldData=> {
          if(prevFieldData.label === fData.label)
            return {...prevFieldData, [getFieldValueName(prevFieldData.fieldType.name)] : event.target.checked ? 1 : 0};
          return {...prevFieldData};
        })
        return newFieldData;
      })
    }
  }
  const getOnChangeHandlerForFile = name => {
    let fData = fieldData.find(fData => fData.label === name);
    return async event => {
      const file = await convertFileToBase64(event.target.files[0]);
      let encodingFileType =  event.target.files[0].name + '~' + file.split(',')[0];

      setFieldData(prev => {
        return prev.map(prevFieldData => {
          if (prevFieldData.label === fData.label)
            return {...prevFieldData, file, encodingFileType};
          return {...prevFieldData};
        });
      })
    }
  }

  const setLocationValue = (value) => {
    //If Label is undefined don't do anything.
    if(!locationModal.label)
      return;
    let setLocationValue = getOnChangeHandler(locationModal.label);
    setLocationValue({target:{value}});
    setLocationModal({show: false, label: undefined})
  }

  const getFileName = name => {
    let fData = fieldData.find(fData => fData.label === name);
    if(fData === undefined) {
      setFieldData(prev => [...prev, getFieldDataTemplate(name)])
      return "No file chosen";
    }
    return fData.encodingFileType?.split('~')[0];
  }


  return(<>

    <ValidatedForm>
        {
          data.form.fields.filter(field => field.state?.id === 0)
            .map(
            field => field.fieldType.name === "select" ?
              <ValidatedField
                key={field.id}
                type={field.fieldType.name}
                value={getFieldValue(field.label)}
                label={field.label}
                required={field.required}
                onChange={getOnChangeHandler(field.label)}
              >
                {field.options.map((a, i) => (<option key={i} value={a.name} >{a.name}</option>))}
              </ValidatedField>

            :field.fieldType.name === "location" ?
                <ValidatedField
                  key={field.id}
                  label={field.label}
                  autoComplete={"off"}
                  value={getFieldValue(field.label)}
                  placeholder={"Click here to add location"}
                  required={field.required}
                  onClick={() => setLocationModal({label: field.label, show: true})}
                />

            :field.fieldType.name === "info" ?
                  <i>{field.label}</i>

            :field.fieldType.name === "file" ?
                  <>
                    <ValidatedBlobField
                      className="mb-0"
                      key={field.id}
                      type={field.fieldType.name}
                      label={field.label}
                      required={false}
                      onChange={getOnChangeHandlerForFile(field.label)}
                    />
                      <p className="mb3" style={{fontSize:"0.6em", color:"grey", marginLeft:"50px"}}>File chosen: {getFileName(field.label)}</p>
                  </>

            :field.fieldType.name === "checkbox" ?
              <ValidatedField
                className="mb-0 d-flex flex-column custom-checkbox"
                key={field.id}
                type={field.fieldType.name}
                name={field.label}
                checked={getFieldValue(field.label) === 1}
                label={field.label}
                required={field.required}
                onChange={getOnChangeHandlerForCheckbox(field.label)}
              />

            :<ValidatedField
              key={field.id}
              type={field.fieldType.name}
              name={field.label}
              value={getFieldValue(field.label)}
              label={field.label}
              required={field.required}
              onChange={getOnChangeHandler(field.label)}
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
        <Button color="primary" onClick={handleSubmit}>
          <FontAwesomeIcon icon="save"/>
          &nbsp;
          <Translate contentKey="entity.action.save">Save</Translate>
        </Button>
    </ValidatedForm>
      <GeoLocationChooser showModal={locationModal.show} setValue={setLocationValue} handleClose={()=>setLocationModal({
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
          setValue(lat + "," + lon)
        }}/>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

export default FormDataUpdate;

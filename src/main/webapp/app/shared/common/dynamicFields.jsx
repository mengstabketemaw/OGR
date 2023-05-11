import React, {useState} from 'react';
import {Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import ChooseLocation from "app/modules/maps/MapUtils";
import {isArray} from "lodash";
// import 'leaflet/dist/leaflet.css'

const DynamicFields = props =>{
  const [locationModal,setLocationModal] = useState({show: false, value:""});
  const {fields, defaultValue, handleSubmit,formatValue} = props;

  const handlevalue = async (value) => {
    const formattedValue = await formatValue(value, fields);
    handleSubmit(formattedValue);
  }


  if(fields?.length === 0 || !isArray(fields))
    return <p>There is No Form</p>

  return(<>
      <GeoLocationChooser showModal={locationModal.show} setValue={setLocationModal} handleClose={()=>setLocationModal({
        ...locationModal,
        show: false,
      })
      }/>
    <ValidatedForm onSubmit={handlevalue} defaultValues={defaultValue} >
      {fields && fields.map( f => f.fieldType.name === "select" ?
        <ValidatedField
          type={f.fieldType.name}
          name={f.label}
          label={f.label}//{translate('global.form.username.label')}
          //placeholder="add label"//{translate('global.form.username.placeholder')}
          required={f.required}
        >
          {f.options.map((a,i)=>(<option key={i} value={a.name}>{a.name}</option>))  }
        </ValidatedField>
         :
        f.fieldType.name === "location" ?
         <ValidatedField
            name={f.label}
            label={f.label}
            autoComplete={"off"}
            value={locationModal.value}
            placeholder={"Click here to add location"}
            required={f.required}
            onClick={()=>setLocationModal({...locationModal, show: true})}
          />
          :
        <ValidatedField
          type={f.fieldType.name}
          name={f.label}
          label={f.label}//{translate('global.form.username.label')}
          //placeholder="add label"//{translate('global.form.username.placeholder')}
          required={f.required}
        />
      )
      }
      <Button tag={Link} to="/admin/user-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />
        &nbsp;
        <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
      </Button>
      &nbsp;
      <Button color="primary" type="submit" >
        <FontAwesomeIcon icon="save" />
        &nbsp;
        <Translate contentKey="entity.action.save">Save</Translate>
      </Button>
    </ValidatedForm>
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
export default DynamicFields;

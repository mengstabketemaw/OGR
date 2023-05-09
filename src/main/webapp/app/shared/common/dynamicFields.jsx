import React, {useState} from 'react';
import {Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import ChooseLocation from "app/modules/maps/MapUtils";
// import 'leaflet/dist/leaflet.css'

const DynamicFields = props =>{
  const [locationModal,setLocationModal] = useState({show: false, value:""});
  const {fields, defaultValue, handleSubmit,formatValue} = props;
  const handlevalue = (value) =>{
    //console.log(value,fields)
    formatValue(value,fields)
    handleSubmit(formatValue(value,fields))
  }

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
         <> <ValidatedField
            name={f.label}
            label={f.label}
            value={locationModal.value}
            onClick={()=>setLocationModal({...locationModal, show: true})}
          >
          </ValidatedField>
         </>
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
    const position = [51.505, -0.09]

    return (
    <Modal fullscreen={"lg"} isOpen={showModal} toggle={handleClose} backdrop="static" id="form-page" autoFocus={false} style={{width:"500px", height:"500px"}}>
    <ModalBody style={{ width: '800px', height: '600px', backgroundColor:"white" }}>
    <ChooseLocation setLocation={(lat,lon)=>{
    setValue(prev=>{
    return {show:false, value: lat + "," + lon}
  })
  }}/>;
    </ModalBody>
    </Modal>
    )
  }
export default DynamicFields;

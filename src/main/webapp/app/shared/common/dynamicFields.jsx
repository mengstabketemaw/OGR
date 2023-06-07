import React, {useState} from 'react';
import {translate, Translate, ValidatedBlobField, ValidatedField, ValidatedForm} from "react-jhipster";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Link,useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import ChooseLocation from "app/modules/maps/MapUtils";
import {isArray} from "lodash";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
// import 'leaflet/dist/leaflet.css'

const DynamicFields = props =>{
  const nav = useNavigate();
  const [locationModal,setLocationModal] = useState({show: false, value:""});
  const {fields,
          defaultValue,
          handleSubmit,
          formatValue,
          currentFields= null,
          licence_id = null,
          backButtonShow= true,
          saveButtonShow = true,
          backButtonName = null,
          saveButtonName = null,
          saveButtonClass = null,
          backButtonClass = null,
          moreReqButtonShow = false,
          moreReqButtonName = null,
          moreReqButtonClass = null,
          saveButtonAction = null,
          backButtonAction=null,
          moreReqButtonAction=null,
          saveButtonIcon = null,
          backButtonIcon = null,
          moreReqButtonIcon = null
          } = props;

  const handlevalue = async (value) => {
    const formattedValue = await formatValue(value, fields,currentFields,licence_id);
    handleSubmit(formattedValue);
  }

  const getFileName = name => {

    const fileName = name + ".pdf";
    const encodedType = "data:application/pdf;base64text/plain";

    return (
      <>
          <>
            <a
              className="cursor-pointer hover-blue underline-hover d-flex flex-row align-items-center"
              download={fileName}
              href={`${encodedType},"QW5kcjBtM2Q0"`}
            >
                  <span className="pt-1 text-blue pb-1">
                    {fileName} <FontAwesomeIcon icon={faDownload} color="#2DCEC8" size="1x" />
                  </span>
            </a>
          </>

      </>
    );
  }

  if(fields?.length === 0 || !isArray(fields))
    return <p>There is No Form</p>

  return(<>
      <GeoLocationChooser showModal={locationModal.show} setLocation={(lat,lon)=> setLocationModal(prev=> ({show:false, value: lat + "," + lon}) ) } handleClose={()=>setLocationModal({...locationModal,show: false,}) }/>
    <ValidatedForm onSubmit={handlevalue} defaultValues={defaultValue} >
      {fields && fields.map( f => f.fieldType.name === "select" ?
        <ValidatedField
          key = {f.label}
          type={f.fieldType.name}
          name={f.label}
          label={f.required ? f.label+' *':f.label}//{translate('global.form.username.label')}
          //placeholder="add label"//{translate('global.form.username.placeholder')}
          required={f.required}
        >
          {f.options.map((a,i)=>(<option key={i} value={a.name}>{a.name}</option>))  }
        </ValidatedField>

        :f.fieldType.name === "location" ?
            <ValidatedField
              key = {f.label}
              name={f.label}
              label={f.required ? f.label+' *':f.label}
              autoComplete={"off"}
              value={locationModal.value}
              placeholder={translate('map.addLocation')}
              required={f.required}
              onClick={()=>setLocationModal({...locationModal, show: true})}
            />

         :(f.fieldType.name === "file" && backButtonName) ?
            <>
              <ValidatedField
                key = {f.label}
                type={f.fieldType.name}
                name={f.label}
                label={f.required ? f.label+' *':f.label}
                required={f.required}
                placeholder={f.placeholder}
              />
              <div className="mb-3 border-info border-bottom border-left border-right p-1 rounded-bottom">{getFileName(f.label)}</div>

            </>
          :f.fieldType.name === "info" ?
            <i>{f.label}</i>

          :f.fieldType.name === "checkbox" ?
            <ValidatedField
              key = {f.label}
              className="mb-0 d-flex flex-column custom-checkbox"
              type={f.fieldType.name}
              name={f.required ? f.label+' *':f.label}
              label={f.label}
              required={f.required}
            />

          :<ValidatedField
              key = {f.label}
              type={f.fieldType.name}
              name={f.label}
              label={f.required ? f.label+' *':f.label}
              required={f.required}
              placeholder={f.placeholder}
            />

      )
      }
      {backButtonShow && <><Button
                                  onClick={ backButtonAction ?  backButtonAction : ()=>{nav(-1)}}
                                  replace
                                   className={backButtonClass ? "btn "+backButtonClass: "btn bg-translucent-primary text-primary"}>
        <FontAwesomeIcon icon={backButtonIcon ? backButtonIcon :"arrow-left"} />
        &nbsp;
        <span className="d-none d-md-inline">
                  <Translate contentKey={backButtonName ? backButtonName:"entity.action.back"}>Back</Translate>
                </span>
      </Button>
        &nbsp;</>
      }
      {moreReqButtonShow && <><Button
        onClick={ moreReqButtonAction ?  moreReqButtonAction : ()=>{nav(-1)}}
        replace
        className={moreReqButtonClass ? "btn "+moreReqButtonClass: "btn bg-translucent-primary text-primary"}>
        <FontAwesomeIcon icon={moreReqButtonIcon ? moreReqButtonIcon :"arrow-left"} />
        &nbsp;
        <span className="d-none d-md-inline">
                  <Translate contentKey={moreReqButtonName ? moreReqButtonName:"entity.action.back"}>Back</Translate>
                </span>
      </Button>
        &nbsp;</>
      }

      {saveButtonShow && <Button className={saveButtonClass ? "btn "+saveButtonClass: "btn bg-translucent-primary text-primary"}
                                 type="submit" >
        <FontAwesomeIcon icon={saveButtonIcon ? saveButtonIcon : "save"} />
        &nbsp;
        <Translate contentKey={saveButtonName ? saveButtonName:"entity.action.save"}>Save</Translate>
      </Button>}
    </ValidatedForm>
    </>
  )
}
export const GeoLocationChooser = ({showModal, handleClose,setLocation}) => {

  return (
    <Modal
      isOpen={showModal}
      toggle={handleClose}
      backdrop="static"
      autoFocus={false}
    >
      <ModalHeader><Translate contentKey="map.geoLocator">Save</Translate></ModalHeader>
      <ModalBody>
        <ChooseLocation setLocation={setLocation}/>
    </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}><Translate contentKey="entity.action.cancel">Cancel</Translate></Button>
      </ModalFooter>
    </Modal>
  )
}
export default DynamicFields;

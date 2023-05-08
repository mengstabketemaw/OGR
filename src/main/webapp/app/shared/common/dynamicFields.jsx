import React from 'react';
import {Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DynamicFields = props =>{
  const {fields, defaultValue, handleSubmit} = props;
  console.log(fields)
  return(
    <ValidatedForm onSubmit={handleSubmit} defaultValues={defaultValue} >
      {fields && fields.map( f => f.fieldType.name === "select" ? (
        <ValidatedField
          type={f.fieldType.name}
          name={f.label}
          label={f.label}//{translate('global.form.username.label')}
          //placeholder="add label"//{translate('global.form.username.placeholder')}
          required={f.required}
        >
          {f.options.map((a,i)=>(<option key={i} value={a.name}>{a.name}</option>))  }
        </ValidatedField>
        ) :
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
  )
}

export default DynamicFields;

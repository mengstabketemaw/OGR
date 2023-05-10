import React, {useEffect, useState} from 'react';
import {Badge, Button, Table} from "reactstrap";
import {useAppDispatch, useAppSelector} from "app/config/store";
import {getLicenceByForm} from "app/modules/licence/license.reducer";

const ExplorationLicenceList=()=>{
  const dispatch = useAppDispatch();
  const pageKey = 1
  const forms = useAppSelector(state => state.licence.licenses);
  useEffect(() => {
    dispatch(
      getLicenceByForm(1)
    );
  }, []);

  return (
    <div>

      <Table responsive striped>
        <thead>
        <tr>

          <th className="hand" onClick={}>
            Created By
          </th>
          <th className="hand" onClick={}>
            Type
          </th>

          <th className="hand" onClick={}>
            Status
          </th>

          <th />
        </tr>
        </thead>
        <tbody>
        {forms?.map( (form) =>(
            <tr id={form.id} key={form.id} onClick={()=>editField(form.id)}>
              <td>{form.user.login}</td>
              <td>{form.form.title}</td>
              <td>{form?.status ? (<Button color="success">
                Approved
              </Button>):<Button color="success">
                In-progress
              </Button>}</td>
            </tr>
          )
        )}
        </tbody>

      </Table>
    </div>
  )
}

export default ExplorationLicenceList;

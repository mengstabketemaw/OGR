import React from 'react';
import {CardHeader, Row, Col, Card} from "reactstrap";
import FormDataUpdate from "app/shared/form/form-data-update";


const FormUpdateLandingPage = () =>{
  return(<>
      <Row className="d-flex justify-content-center">
        <Col md="6">
          <Card className="shadow p-4">
            <CardHeader className="border-0 pl-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Edit Data</h3>
                </div>
              </Row>
            </CardHeader>
            <FormDataUpdate/>
        </Card>
      </Col>
      </Row>
  </>

  )

}

export default FormUpdateLandingPage;

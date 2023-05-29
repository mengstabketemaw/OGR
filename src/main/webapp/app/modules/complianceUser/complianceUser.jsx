// Form is based on Formik
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {Col, Spinner} from "reactstrap";
import {Translate} from "react-jhipster";
import ComplianceHistoryUser from "app/modules/complianceUser/complianceHistoryUser";


export function ComplianceUser() {
  const [param] = useSearchParams();
  const [compliance, setCompliance] = useState({loading: true, data: {}});

  const fetchData = () => {
    // Construct the URL with the page query parameter
    const url = `/api/compliance/user/${param.get('licence')}/${param.get('submittedDate')}`;

    axios
      .get(url)
      .then(({data}) => {
        setCompliance({loading: false, data});
      })
      .catch(console.log);
  };

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchData();

  }, []);


  return (
    <>
      {compliance.loading ? (
          <div className={"d-flex justify-content-center align-content-center"}>
            <Spinner
              className=" align-self-center"
              color="primary"
              style={{
                height: '3rem',
                width: '3rem',
              }}
              type="grow"
            >
              Loading...
            </Spinner>
          </div>
        ) :
        (

          <Col md="8" className={"container"}>
            <div className="d-flex ">
              <h1>{param.get('title')} {"  "}<Translate contentKey={"compliance.inspections"}/></h1>
            </div>

            <div className="d-flex flex-column col-6 mt-3 form-group">
              <div className="company d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.companyName"}/></h3>
                <p className={"col-6"}>{compliance.data?.company?.login}</p>
              </div>
              <div className="licence d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.table.licenceType"}/></h3>
                <p className={"col-6"}>{compliance.data?.customForm?.title}</p>
              </div>
              <div className="status d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.table.status"}/></h3>
                {
                  `${compliance.data?.status}` == 'Non-Compliant'
                    ?
                    <p className={"text-danger col-6"}>{compliance.data?.status}</p>
                    :
                    `${compliance.data?.status}` == 'Not Inspected'
                      ?
                      <p className={"col-6"}>{compliance.data?.status}</p>
                      :
                      <p className={"text-success col-6"}>{compliance.data?.status}</p>


                }

              </div>
            </div>
            <ComplianceHistoryUser complianceId={compliance.data?.id}/>
          </Col>
        )
      }
    </>
  );
}

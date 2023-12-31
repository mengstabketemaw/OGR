// Form is based on Formik
import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import axios from "axios";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {Button, Col, Spinner} from "reactstrap";
import {Translate} from "react-jhipster";
import ComplianceHistory from "app/modules/compliance/complianceHistory";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward} from "@fortawesome/free-solid-svg-icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";



export function InspectionReport() {
  const [param] = useSearchParams();
  const [compliance, setCompliance] = useState({ loading: true, data: {} });

  const fetchData = () => {
    // Construct the URL with the page query parameter
    const url = `/api/compliance/complianceHistory/${param.get('inspection')}`;

    axios
      .get(url)
      .then(({data}) => {
        setCompliance({ loading: false, data });
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
          <Col  md="8" className={"container"} >
            <div className="d-flex  ">
              <Link tag={"a"} to={`/complianceHistory?compliance=${param.get('compliance')}`} > <FontAwesomeIcon  className={ "h1 cursor-pointer rounded-circle bg-translucent-primary text-primary p-2 mr-3"} icon={faArrowLeft}/> </Link>
              <h1><Translate contentKey={"compliance.inspectionReport"}/></h1>
            </div>

            <div className="d-flex flex-column col-12 form-group border-top-bottom mt-3">
              <div className="company d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.companyName"}/> </h3>
                <p className={"col-8"}>{compliance.data.compliance.company.firstName}</p>
              </div>
              <div className="licence d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.table.licenceType"}/> </h3>
                <p className={"col-8"}>{compliance.data.compliance.customForm.title}</p>
              </div>
              <div className="licence d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.form.inspectionDate"}/> </h3>
                <p className={"col-8"}>{compliance.data.date}</p>
              </div>
              <div className="licence d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.inspector"}/> </h3>
                <p className="col-8">{compliance.data.inspector.lastName}</p>
              </div>
              <div className="licence d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.table.findings"}/> </h3>
                <p  className={"col-8"}>{compliance.data.finding}</p>
              </div>
              <div className="status d-flex flex-row justify-content-between">
                <h3 className={""}>  <Translate contentKey={"compliance.table.status"}/>  </h3>
                {
                  `${compliance.data.status}` == 'Non-Compliant'
                    ?
                    <p className={"text-danger col-8"}>{compliance.data.status}</p>
                    :
                    `${compliance.data.status}` == 'Not Inspected'
                      ?
                      <p className={"col-8"}>{compliance.data.status}</p>
                      :
                      <p className={"text-success col-8"}>{compliance.data.status}</p>

                }

              </div>
              <div className="licence d-flex flex-row justify-content-between">
                <h3 className={""}><Translate contentKey={"compliance.report"}/> </h3>
                <p className={"col-8"}>{compliance.data.report}</p>
              </div>
            </div>
          </Col>
        )
      }
    </>
  );
}

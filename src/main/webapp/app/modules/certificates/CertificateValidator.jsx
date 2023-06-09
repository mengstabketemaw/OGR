import React, {useEffect, useState} from 'react'
import {translate, Translate} from "react-jhipster";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Spinner} from "reactstrap";
import {UpdateDynamicFields} from "app/shared/form/form-data-update";
import ReactToPrint from "react-to-print";
import moment from "moment/moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";
import Certificate from "app/modules/certificates/certificate";

const CertificateValidator = () => {
  const {id} = useParams();
  const [data, setDate] = useState({ loading: true, data: {} });

  useEffect(() => {
    axios
      .get('/api/licence/' + id)
      .then(({ data }) => setDate({ loading: false, data }))
      .catch(console.log);
  }, [id])
  useEffect(()=>{

  },[])
  return (
    <div className="d-flex flex-column justify-content-center p-3">

      {data.loading ? (
        <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
          Loading...
        </Spinner>
      ) : (
        <div>

          {data.data?.status === 'Authorized' ? (
            <div className="d-flex flex-column" >
              <div className="alert alert-success" role="alert">
                <Translate contentKey="cert.validCert"/> <Link to={""}>Show more info</Link>
              </div>
              <div style={{transform: 'scale(0.8)', transformOrigin: 'top left'}}>
                <Certificate
                  data={{
                    title: translate('userDashboard.' + data.data?.form?.title),
                    companyName: data.data.user.firstName,
                    location: "Cabinda",
                    fromDate:  moment(data.data.apporvedDate).format('YYYY-MM-DD'),
                    type: data.data?.form?.id,
                    display: "display",
                    link: window.location.href
                  }}

                />
              </div>
            </div>
          ):
            <div className="alert alert-warning" role="alert">
              <Translate contentKey="cert.invalidCert"/>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default CertificateValidator;

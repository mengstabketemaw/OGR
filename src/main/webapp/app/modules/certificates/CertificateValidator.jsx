import React, {useEffect, useState} from 'react'
import {translate, Translate} from "react-jhipster";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Spinner} from "reactstrap";
import moment from "moment/moment";
import Certificate from "app/modules/certificates/certificate";
import {useAppSelector} from "app/config/store";
import {hasAnyAuthority} from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";

const CertificateValidator = () => {
  const {id} = useParams();
  const [data, setDate] = useState({ loading: true, data: {} });
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));

  useEffect(() => {
    axios
      .get('/api/licence/' + id)
      .then(({ data }) => setDate({ loading: false, data }))
      .catch(()=>setDate({ loading: false, data:{}}));
  }, [id])
  useEffect(()=>{

  },[])


  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 850;
  const divStyle = {
    transform: 'scale(0.8)',
    transformOrigin: 'top left',
    ...(isMobile && isTablet && {
      transform: 'scale(0.3)',
    } || isTablet && {transform: 'scale(0.5)'}
    ),
  };

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
              {isAdmin ?
              <div className="alert alert-success" role="alert">
                <Translate contentKey="cert.validCert"/> <Link to={""}>Show more info</Link>
              </div>
                :
                <div className="alert alert-success" role="alert">
                  {data.data.user.firstName + '\'s  ' + data.data?.form?.title}
                </div>
              }
              <div style={divStyle}>
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

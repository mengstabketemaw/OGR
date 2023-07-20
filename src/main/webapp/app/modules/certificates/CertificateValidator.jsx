import React, {useEffect, useState} from 'react'
import {translate, Translate} from "react-jhipster";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table} from "reactstrap";
import moment from "moment/moment";
import Certificate from "app/modules/certificates/certificate";
import {useAppSelector} from "app/config/store";
import {hasAnyAuthority} from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";
import ShowFieldValue from "app/shared/common/showFieldValue";
import {ShowRemarkModal} from "app/modules/home/showRemarkModal";

const CertificateValidator = () => {
  const {id} = useParams();
  const [data, setDate] = useState({ loading: true, data: {} });
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const [detailModal, setDetailModal] = useState(false);
  const currentDate = moment().format('YYYY-MM-DD');
  const handleClose = () => {
    setDetailModal(false);
  };
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

  const getDataBasedOnState = () => {
    if (data.data.data.length) {
      return data.data.data.filter(fieldData =>
        data.data?.form.fields.some(field => field.label === fieldData.label && field.state?.id === 0)
      );
    }
    return [];
  };

  return (
    <>
    <div className="d-flex flex-column justify-content-center p-3">

      {data.loading ? (
        <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
          Loading...
        </Spinner>
      ) : (
        <div>

          {data.data?.status === 'Approved' || data.data?.status === 'Expired' ? (
            <>
              {
                data.data?.status === 'Expired' ?
                  (
                  <span style={{fontSize:"23px"}} className="text-danger text-uppercase form-group font-weight-bold d-flex justify-content-center">
                  <Translate  contentKey="cert.expiredCert"/>
                  </span>
                  )
                  :
                  (
                <span style={{fontSize:"23px"}} className="text-success text-uppercase form-group font-weight-bold d-flex justify-content-center">
               <Translate  contentKey="cert.validCert"/>
                </span>
                  )
              }
            </>
            )
          :  (
           <span style={{fontSize:"23px"}} className="text-danger text-uppercase form-group font-weight-bold d-flex justify-content-center">
            <Translate  contentKey="cert.invalidCert"/>
            </span>
           )
          }
           <Card className={"mb-4"}>
             <Table>
               <thead>
               </thead>
               <tbody>
               <tr>
                 <td><Translate contentKey={'cert.licenceNo'} /></td>
                 <td>{data.data.form?.title?.slice(0,2).toUpperCase()}{data.data?.id}496</td>
               </tr>
               <tr>
                 <td>  <Translate contentKey={'compliance.companyName'} /></td>
                 <td>{data.data?.user?.firstName}</td>
               </tr>
               <tr>
                 <td><Translate contentKey={'compliance.table.licenceType'} /></td>
                 <td>{data.data?.form?.title}</td>
               </tr>
               <tr>
                 <td><Translate contentKey={'cert.issuedOn'} /></td>
                 <td>{moment(data.data?.approvedDate || data.data?.submittedDate).format('YYYY-MM-DD')}</td>
               </tr>
               <tr>
                 <td><Translate contentKey={'cert.location'} /></td>
                 <td>Cabinda</td>
               </tr>
               { data.data?.status != 'Approved' || moment(currentDate).isAfter(moment(data.data?.approvedDate || data.data?.submittedDate).add(3, 'years').format('YYYY-MM-DD'))  ?

                  <></>
                   :
                   <>
                     <tr>
                   <td><Translate contentKey={'cert.validUntil'} /></td>
                   <td>{moment(data.data?.approvedDate|| data.data?.submittedDate).add(3, 'years').format('YYYY-MM-DD')}</td>
                      </tr>
                   </>
                 }
               </tbody>
             </Table>
             <span onClick={()=>{setDetailModal(true)}} className="text-blue d-flex justify-content-end" role="button"><Translate contentKey={'cert.seeMore'} /></span>
           </Card>

          {data.data?.status === 'Approved' || data.data?.status === 'Expired'  ? (
              <div style={divStyle}>
                <Certificate
                  data={{
                    title: translate('userDashboard.' + data.data?.form?.title),
                    companyName: data.data.user.firstName,
                    location: "Cabinda",
                    fromDate:  moment(data.data?.approvedDate || data.data?.submittedDate).format('YYYY-MM-DD'),
                    type: data.data?.form?.id,
                    display: "display",
                    link: window.location.href,
                    licenceId: `${data?.data.form?.title?.slice(0,2).toUpperCase()}`+`${data?.data?.id}`+`496`,
                  }}
                />
              </div>
          ): ('')
          }
        </div>
      )}
    </div>


      <Modal isOpen={detailModal} onClosed={handleClose}>
        <ModalHeader toggle={handleClose}>
          <h3><Translate contentKey={'table.applicationNumber'} />: {data.data.form?.title?.slice(0,2).toUpperCase()}{data.data?.id}496</h3>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column justify-content-center">
            {data.loading ? (
              <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
                Loading...
              </Spinner>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-end">
                  <span className="" style={{color:"rgb(82, 95, 127)"}}><Translate style={{color:"rgb(82, 95, 127)"}} contentKey={"userManagement.firstName"}/>: <span style={{color:"rgb(82, 95, 127)"}}>{data.data.user.firstName}</span></span>
                  <span className="" style={{color:"rgb(82, 95, 127)"}}><Translate style={{color:"rgb(82, 95, 127)"}} contentKey={'table.submittedDate'} />: <span style={{color:"rgb(82, 95, 127)"}}>{moment(data.data.submittedDate).format('MMM DD, YYYY')}</span></span>
                </div>
                <ShowFieldValue data={getDataBasedOnState()} form={data?.data.form} />
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>
            <Translate contentKey={'table.close'} />
          </Button>
        </ModalFooter>
      </Modal>

      </>
  );
}

export default CertificateValidator;

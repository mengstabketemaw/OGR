import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Button, Card, CardHeader, Col, Row, Spinner, Table } from 'reactstrap';
import CustomPagination from 'app/shared/common/CustomPagination';
import { isArray } from 'lodash';
import moment from 'moment';
import { translate, Translate } from 'react-jhipster';
import { useNavigate } from 'react-router-dom';
import DeleteLicenceModal from 'app/modules/permit/DeleteLicenceModal';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import ReportForm from 'app/shared/common/reportForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNodes, faFilePdf, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import Certificate from 'app/modules/certificates/certificate';
import { ShowAmendmentModal } from 'app/modules/home/showAmendmentModal';
import { trans } from 'app/shared/common/translator';

const PAGE_SIZE = 7;
export const AdminDashboardTable = ({ title }) => {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [licences, setLicences] = useState({ loading: true, data: { content: [] } });
  const [deleteLicence, setDeleteLicence] = useState({ id: -1, show: false, name: '' });
  const [printData, setPrintData] = useState(null);
  const certRef = useRef();
  const [amendmentModal, setAmendmentModal] = useState({ id: -1, show: false, remark: '' });

  const handleBeforeGetContent = data => {
    setPrintData(data);
    return Promise.resolve();
  };

  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/licence/formByTitle?title=${title}&page=${page}&size=${PAGE_SIZE}&sort=submittedDate,desc`;

    axios
      .get(url)
      .then(({ data }) => {
        // Update the state with the new data and total pages
        setLicences({ loading: false, data });
        setTotalPages(Math.ceil(data.totalElements / PAGE_SIZE));
      })
      .catch(console.log);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber - 1);
    fetchData(pageNumber - 1);
  };

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchData(currentPage);
  }, []);

  const tableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const showRemarkModal = (value, id) => {
    setAmendmentModal({ show: true, id, remark: value });
  };

  const isMobile = window.innerWidth <= 850;
  return (
    <>
      <Col className="mb-5 mb-xl-0" xl="6">
        <Card className="shadow ">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col d-flex justify-content-between">
                <h3 className="mb-0">
                  {title === 'Exploration licence' ? (
                    <Translate contentKey="licence.types.exploration" />
                  ) : title === 'Pipeline Licence' ? (
                    <Translate contentKey="licence.types.pipeline" />
                  ) : title === 'Air Permit' ? (
                    <Translate contentKey="permit.types.air" />
                  ) : (
                    <Translate contentKey="permit.types.drilling" />
                  )}
                </h3>
                <button className="border-0 bg-white" onClick={handlePrint}>
                  <FontAwesomeIcon color={'#2dce89'} size={'1x'} icon={faPrint} />
                </button>
                <ReportForm ref={tableRef} data={licences.data?.content} />
              </div>
            </Row>
          </CardHeader>

          {licences.loading ? (
            <Spinner
              className="align-self-center"
              color="primary"
              style={{
                height: '3rem',
                width: '3rem',
              }}
              type="grow"
            >
              Loading...
            </Spinner>
          ) : !isArray(licences.data.content) || licences.data?.content.length === 0 ? (
            <>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className={'pr-0'}>
                      <Translate contentKey={'table.submittedDate'} />{' '}
                    </th>
                    <th scope="col" className={'pl-0'}>
                      <Translate contentKey={'table.user'} />
                    </th>

                    <th scope="col" className={'pl-0 pr-1'}>
                      <Translate contentKey={'table.stage'} />
                    </th>
                    <th scope="col" className={'pl-0 pr-0'}>
                      <Translate contentKey={'table.status'} />
                    </th>
                    <th scope="col">
                      <Translate contentKey={'table.actions'} />
                    </th>
                  </tr>
                </thead>
              </Table>
              <p className="align-self-center">
                <Translate contentKey={'table.noData'} />
              </p>
            </>
          ) : (
            <>
              <Table className="d-block  d-table  table-flush table-hover" responsive style={{ overflowY: 'scroll' }}>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className={'pr-0'}>
                      <Translate contentKey={'table.submittedDate'} />{' '}
                    </th>
                    <th scope="col" className={'pl-0'}>
                      <Translate contentKey={'table.user'} />
                    </th>

                    <th scope="col" className={'pl-0 pr-1'}>
                      <Translate contentKey={'table.stage'} />
                    </th>
                    <th scope="col" className={'pl-0 pr-0'}>
                      <Translate contentKey={'table.status'} />
                    </th>
                    <th scope="col">
                      <Translate contentKey={'table.actions'} />
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {licences.data?.content.map(data => (
                    <tr
                      key={data.id}
                      // onClick={() => {
                      //   if (!(data.status === 'Approved' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                      // }}
                    >
                      <th
                        onClick={() => {
                          if (!(data.status === 'Approved' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pr-0'}
                      >
                        {moment(data.submittedDate).format('MMM DD, YYYY')}
                      </th>

                      <th
                        onClick={() => {
                          if (!(data.status === 'Approved' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0'}
                      >
                        {data.applicantUsername}
                      </th>

                      <th
                        onClick={() => {
                          if (!(data.status === 'Approved' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0 pr-1'}
                      >
                        {data.stage?.name || 'Form'}
                      </th>
                      <th
                        onClick={() => {
                          if (!(data.status === 'Approved' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0 pr-0'}
                      >
                        {data.status === 'Inprogress' ? (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className="font-weight-bold  text-warning">{trans('status', data.status)}</span>
                          </p>
                        ) : data.status === 'Approved' ? (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className={'font-weight-bold text-success'}>{trans('status', data.status)}</span>
                          </p>
                        ) : data.status === 'Denied' || data.status === 'Expired' ? (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className={' font-weight-bold text-danger'}>{trans('status', data.status)}</span>
                          </p>
                        ) : data.status === 'undefined' ? (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className={'font-weight-bold  text-gray'}>Inprogress</span>
                          </p>
                        ) : (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className={' font-weight-bold text-warning'}>{trans('status', data.status)}</span>
                          </p>
                        )}
                      </th>
                      <th>
                        <Button
                          color={data.status === 'Approved' || data.status === 'Denied' ? 'light' : 'black'}
                          onClick={() => {
                            nav(`/sequence/${data.form.id}/${data.id}`);
                          }}
                          hidden={data.status === 'Approved' || data.status === 'Denied'}
                          size={'sm'}
                        >
                          <FontAwesomeIcon
                            color={data.status === 'Approved' || data.status === 'Denied' ? 'white' : 'blue'}
                            // size="1x"
                            style={{ fontSize: '16px' }}
                            icon={faCogs}
                          />
                          {/*<Translate contentKey={'workflow.moreaction'} />*/}
                        </Button>
                        <Button
                          color={!(data.stage?.id === 0 || data.stage === null) ? 'light' : 'black'}
                          onClick={() => setDeleteLicence({ id: data.id, show: true, name: data.form.title })}
                          hidden={!(data.stage?.id === 0 || data.stage === null)}
                          size="sm"
                        >
                          {/*<Translate contentKey={'entity.action.delete'} />*/}
                          <FontAwesomeIcon
                            color={!(data.stage?.id === 0 || data.stage === null) ? 'white' : 'red'}
                            // size="1x"
                            style={{ fontSize: '15px' }}
                            icon={faTrash}
                          />
                        </Button>
                        {data?.status === 'Approved' || data?.status === 'Expired' ? (
                          <>
                            {isMobile ? (
                              <Button
                                color="black"
                                tag={'a'}
                                size="sm"
                                href={window.location.origin + `/certificate-validator/${data?.id}`}
                                className="ml-0 mt-1 mr-0"
                              >
                                <FontAwesomeIcon style={{ fontSize: '20px' }} color="teal" size="1x" icon={faFilePdf} />
                              </Button>
                            ) : (
                              <ReactToPrint
                                onBeforeGetContent={async () => {
                                  await handleBeforeGetContent({
                                    title: translate('userDashboard.' + data?.form?.title),
                                    companyName: data.user.firstName,
                                    location: 'Cabinda',
                                    fromDate: moment(data.approvedDate || data.submittedDate).format('YYYY-MM-DD'),
                                    type: data?.form?.id,
                                    link: window.location.origin + `/certificate-validator/${data?.id}`,
                                    licenceId: `${data.form?.title?.slice(0, 2).toUpperCase()}` + `${data?.id}` + `496`,
                                  });
                                }}
                                trigger={() => (
                                  // <button className="border-0 bg-white">button</button>
                                  <Button color="black" size="sm" className="ml-0 mt-1 pt-0 pb-0 pl-1 pr-1">
                                    <FontAwesomeIcon
                                      size="2x"
                                      // style={{fontSize:"25px"}}
                                      icon={faFilePdf}
                                    />
                                  </Button>
                                )}
                                content={() => certRef.current}
                              />
                            )}
                            {printData && <Certificate data={printData} ref={certRef} />}
                          </>
                        ) : (
                          ''
                        )}
                        {data.amendment && data.amendment !== '' && (data.status === 'Approved' || data.status === 'Denied') && (
                          <Button className="ml-0 mt-1 " color="black" onClick={() => showRemarkModal(data.amendment, data.id)} size="sm">
                            <FontAwesomeIcon style={{ fontSize: '15px' }} color={'blue'} icon={faCircleNodes} />
                          </Button>
                        )}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <CustomPagination currentPage={currentPage + 1} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </Card>
      </Col>
      <DeleteLicenceModal
        id={deleteLicence.id}
        show={deleteLicence.show}
        name={deleteLicence.name}
        handleClose={() => setDeleteLicence({ id: -1, show: false, name: '' })}
        updateTable={() =>
          setLicences({
            ...licences,
            data: { content: licences.data.content.filter(license => license.id !== deleteLicence.id) },
          })
        }
      />
      <ShowAmendmentModal
        id={amendmentModal.id}
        showModal={amendmentModal.show}
        content={amendmentModal.remark}
        handleClose={() => {
          setAmendmentModal({ id: -1, remark: '', show: false });
        }}
      />
    </>
  );
};

export default AdminDashboardTable;

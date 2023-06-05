import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Button, Card, CardHeader, Col, Row, Spinner, Table } from 'reactstrap';
import CustomPagination from 'app/shared/common/CustomPagination';
import { isArray } from 'lodash';
import moment from 'moment';
import { Translate } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { DetailModal } from 'app/modules/home/user-home';
import { useNavigate } from 'react-router-dom';
import DeleteLicenceModal from 'app/modules/permit/DeleteLicenceModal';
import { useReactToPrint } from 'react-to-print';
import ReportForm from 'app/shared/common/reportForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faWarning } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

const PAGE_SIZE = 7;
export const AdminDashboardTable = ({ title }) => {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [licences, setLicences] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1 });
  const [deleteLicence, setDeleteLicence] = useState({ id: -1, show: false, name: '' });
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
                      //   if (!(data.status === 'Authorized' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                      // }}
                    >
                      <th
                        onClick={() => {
                          if (!(data.status === 'Authorized' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pr-0'}
                      >
                        {moment(data.submittedDate).format('MMM DD, YYYY')}
                      </th>

                      <th
                        onClick={() => {
                          if (!(data.status === 'Authorized' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0'}
                      >
                        {data.applicantUsername}
                      </th>

                      <th
                        onClick={() => {
                          if (!(data.status === 'Authorized' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0 pr-1'}
                      >
                        {data.stage?.name || 'Form'}
                      </th>
                      <th
                        onClick={() => {
                          if (!(data.status === 'Authorized' || data.status === 'Denied')) nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0 pr-0'}
                      >
                        {data.status === 'Inprogress' ? (
                          <Button className="btn btn-sm shadow-none border-0 bg-translucent-warning">
                            <span className="font-weight-bold  text-warning">{data.status}</span>
                          </Button>
                        ) : data.status === 'Authorized' ? (
                          <Button className="btn btn-sm shadow-none border-0 bg-translucent-success">
                            <span className={'font-weight-bold text-success'}>{data.status}</span>
                          </Button>
                        ) : data.status === 'Denied' ? (
                          <Button className="btn btn-sm shadow-none border-0 bg-translucent-danger">
                            <span className={' font-weight-bold text-danger'}>{data.status}</span>
                          </Button>
                        ) : data.status === 'undefined' ? (
                          <Button className="btn btn-sm shadow-none border-0 bg-translucent-gray">
                            <span className={'font-weight-bold  text-gray'}>Inprogress</span>
                          </Button>
                        ) : (
                          <Button className="btn btn-sm shadow-none border-0 bg-translucent-info">
                            <span className={' font-weight-bold text-info'}>{data.status}</span>
                          </Button>
                        )}
                      </th>
                      <th>
                        <Button
                          color={data.status === 'Authorized' || data.status === 'Denied' ? 'light' : 'white'}
                          onClick={() => {
                            nav(`/sequence/${data.form.id}/${data.id}`);
                          }}
                          disabled={data.status === 'Authorized' || data.status === 'Denied'}
                          size={'sm'}
                        >
                          <FontAwesomeIcon
                            color={data.status === 'Authorized' || data.status === 'Denied' ? 'white' : 'blue'}
                            size="1x"
                            icon={faCogs}
                          />
                          {/*<Translate contentKey={'workflow.moreaction'} />*/}
                        </Button>
                        <Button
                          color={!(data.stage?.id === 0 || data.stage === null) ? 'light' : 'white'}
                          onClick={() => setDeleteLicence({ id: data.id, show: true, name: data.form.title })}
                          disabled={!(data.stage?.id === 0 || data.stage === null)}
                          size="sm"
                        >
                          {/*<Translate contentKey={'entity.action.delete'} />*/}
                          <FontAwesomeIcon
                            color={!(data.stage?.id === 0 || data.stage === null) ? 'white' : 'red'}
                            size="1x"
                            icon={faTrash}
                          />
                        </Button>
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
    </>
  );
};

export default AdminDashboardTable;

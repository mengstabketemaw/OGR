import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardHeader, Col, Row, Spinner, Table } from 'reactstrap';
import { isArray } from 'lodash';
import moment from 'moment/moment';
import CustomPagination from 'app/shared/common/CustomPagination';
import { DetailModal } from 'app/modules/home/user-home';
import { Translate } from 'react-jhipster';
import DeleteLicenceModal from 'app/modules/permit/DeleteLicenceModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

const FormData = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [licences, setLicences] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });
  const [param] = useSearchParams();
  const nav = useNavigate();
  const [deleteLicence, setDeleteLicence] = useState({ id: -1, show: false, name: '' });

  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/licence/form/${param.get('pageKey')}?page=${page}&size=${10}&sort=submittedDate,desc`;

    axios
      .get(url)
      .then(({ data }) => {
        // Update the state with the new data and total pages
        setLicences({ loading: false, data });
        setTotalPages(Math.ceil(data.totalElements / 10));
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

  return (
    <Row className="d-flex justify-content-center">
      <Col md="8">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h2 className="mb-0 ">{param.get('name')}</h2>
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
              <Table className="align-items-center table-flush table-hover" responsive>
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
                    <tr key={data.id}>
                      <th
                        onClick={() => {
                          if (data.status !== 'Authorized' && data.status !== 'Denied') nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={' pr-0'}
                      >
                        {moment(data.submittedDate).format('MMM DD, YYYY')}
                      </th>
                      <th
                        onClick={() => {
                          if (data.status !== 'Authorized' && data.status !== 'Denied') nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0'}
                      >
                        {data.applicantUsername}
                      </th>

                      <th
                        onClick={() => {
                          if (data.status !== 'Authorized' && data.status !== 'Denied') nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0 pr-1'}
                      >
                        {data.stage?.name || 'Form'}
                      </th>
                      <th
                        onClick={() => {
                          if (data.status !== 'Authorized' && data.status !== 'Denied') nav(`/sequence/${data.form.id}/${data.id}`);
                        }}
                        className={'pl-0 pr-0'}
                      >
                        {data.status === 'Inprogress' ? (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className="font-weight-bold  text-warning">{data.status}</span>
                          </p>
                        ) : data.status === 'Authorized' ? (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className={'font-weight-bold text-success'}>{data.status}</span>
                          </p>
                        ) : data.status === 'Denied' ? (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className={' font-weight-bold text-danger'}>{data.status}</span>
                          </p>
                        ) : data.status === 'undefined' ? (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className={'font-weight-bold  text-gray'}>Inprogress</span>
                          </p>
                        ) : (
                          <p className="btn btn-sm shadow-none border-0 ">
                            <span className={' font-weight-bold text-info'}>{data.status}</span>
                          </p>
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
      <DetailModal id={detailModal.id} show={detailModal.show} handleClose={() => setDetailModal({ ...detailModal, show: false })} />
      <DeleteLicenceModal
        id={deleteLicence.id}
        show={deleteLicence.show}
        name={deleteLicence.name}
        handleClose={() => setDeleteLicence({ id: -1, show: false, name: '' })}
        updateTable={() =>
          setLicences({ ...licences, data: { content: licences.data.content.filter(license => license.id !== deleteLicence.id) } })
        }
      />
    </Row>
  );
};
export default FormData;

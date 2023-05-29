import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import loading = toast.loading;
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { isArray } from 'lodash';
import moment from 'moment/moment';
import CustomPagination from 'app/shared/common/CustomPagination';
import ShowFieldValue from 'app/shared/common/showFieldValue';
import { DetailModal } from 'app/modules/home/user-home';
import { Translate } from 'react-jhipster';

const FormData = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [licences, setLicences] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });
  const [param] = useSearchParams();
  const nav = useNavigate();

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

  const handleShowUpdateModal = id => {};

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
                <h3 className="mb-0">{param.get('name')}</h3>
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
                    <th scope="col">
                      <Translate contentKey={'table.submittedDate'} />{' '}
                    </th>
                    <th scope="col">
                      <Translate contentKey={'table.user'} />
                    </th>
                    <th scope="col">
                      <Translate contentKey={'table.type'} />
                    </th>
                    <th scope="col">
                      <Translate contentKey={'table.stage'} />
                    </th>
                    <th scope="col">
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      <Translate contentKey={'table.submittedDate'} />{' '}
                    </th>
                    <th scope="col">
                      <Translate contentKey={'table.user'} />
                    </th>
                    <th scope="col">
                      <Translate contentKey={'table.type'} />
                    </th>
                    <th scope="col">
                      <Translate contentKey={'table.stage'} />
                    </th>
                    <th scope="col">
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
                      <th>{moment(data.submittedDate).format('MMMM Do YYYY, h:mm:ss a')}</th>
                      <th>{data.user.firstName}</th>
                      <th>{data.form.title}</th>
                      <th>{data.stage?.name || 'Form'}</th>
                      <th>
                        {data.status === 'Inprogress' ? (
                          <Button className={'btn btn-sm bg-warning text-white'}>{data.status}</Button>
                        ) : data.status === 'Authorized' ? (
                          <Button className={'btn btn-sm bg-gradient-success text-white'}>{data.status}</Button>
                        ) : data.status === 'Denied' ? (
                          <Button className={'btn btn-sm bg-danger text-white'}>{data.status}</Button>
                        ) : (
                          <Button className={'btn btn-sm bg-gradient-info text-white'}>{data.status}</Button>
                        )}
                      </th>
                      <th>
                        <Button
                          color="primary"
                          onClick={() => {
                            nav(`/sequence/${data.form.id}/${data.id}`);
                          }}
                          size="sm"
                        >
                          <Translate contentKey={'workflow.moreaction'} />
                        </Button>

                        <Button
                          color="secondary"
                          onClick={e => nav('/dataUpdate/' + data.id)}
                          disabled={!(data.stage?.id === 0 || data.stage === null)}
                          size="sm"
                        >
                          Update
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
      <DetailModal
        id={detailModal.id}
        formId={detailModal.formId}
        show={detailModal.show}
        handleClose={() => setDetailModal({ ...detailModal, show: false })}
      />
    </Row>
  );
};
export default FormData;

import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import CustomPagination from 'app/shared/common/CustomPagination';
import { isArray } from 'lodash';
import moment from 'moment';
import ShowFieldValue from 'app/shared/common/showFieldValue';
import { Translate } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { DetailModal } from 'app/modules/home/user-home';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = ITEMS_PER_PAGE;
export const AdminDashboardTable = ({ type }) => {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [licences, setLicences] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1 });
  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/licence/formByType?type=${type}&page=${page}&size=${PAGE_SIZE}&sort=submittedDate,desc`;

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

  return (
    <>
      <Col className="mb-5 mb-xl-0" xl="6">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">
                  {type === 'permit' ? <Translate contentKey="permit.title" /> : <Translate contentKey="licence.title" />}
                </h3>
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
                          disabled={data.status === 'Authorized' || data.status === 'Denied'}
                          size="sm"
                        >
                          <Translate contentKey={'workflow.moreaction'} />
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
    </>
  );
};

export default AdminDashboardTable;

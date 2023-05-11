import './home.scss';
import React, { useEffect, useState } from 'react';

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Progress,
  CardHeader,
  NavLink,
  NavItem,
  Container,
  Nav,
  Table,
  Spinner,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import { useAppSelector } from 'app/config/store';
import classnames from 'classnames';
import Header from '../../argon/components/Headers/Header.js';

import { chartExample1, chartExample2 } from '../../argon/variables/charts.js';
import axios from 'axios';
import { isArray } from 'lodash';
import moment from 'moment/moment';
import CustomPagination from 'app/shared/common/CustomPagination';

const PAGE_SIZE = 5;
export const AdminHome = () => {
  const account = useAppSelector(state => state.authentication.account);
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState('data1');

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data('data' + index);
  };

  const [licences, setLicences] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1 });

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchData(currentPage);
  }, []);

  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/licence/formByType?type=licence&page=${page}&size=${PAGE_SIZE}&sort=submittedDate,desc`;

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
    // Update the current page state and fetch the new data
    setCurrentPage(pageNumber - 1);
    fetchData(pageNumber - 1);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Licences</h3>
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
                <p>There is no Data</p>
              ) : (
                <>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Submitted Date</th>
                        <th scope="col">User</th>
                        <th scope="col">Type</th>
                        <th scope="col">Stage</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {licences.data?.content.map(data => (
                        <tr key={data.id}>
                          <th>{moment(data.submittedDate).format('MMMM Do YYYY, h:mm:ss a')}</th>
                          <th>{data.user.firstName}</th>
                          <th>{data.form.title}</th>
                          <th>{data.stage}</th>
                          <th>{data.status}</th>
                          <th>
                            <Button color="primary" href="#pablo" onClick={e => setDetailModal({ show: true, id: data.id })} size="sm">
                              View
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
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Permit</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress max="100" value="60" barClassName="bg-gradient-danger" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress max="100" value="70" barClassName="bg-gradient-success" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress max="100" value="75" barClassName="bg-gradient-info" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress max="100" value="30" barClassName="bg-gradient-warning" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHome;

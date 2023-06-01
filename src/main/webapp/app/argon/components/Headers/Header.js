/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faDownload, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { Translate } from 'react-jhipster';

const Header = () => {
  const [stats, setStats] = useState({ loading: true, data: {} });

  useEffect(() => {
    axios
      .get('/api/stats')
      .then(({ data }) => setStats({ loading: false, data }))
      .catch(console.log);
  }, []);

  return (
    <>
      <div className="header bg-gradient-success rounded-top pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Translate contentKey={'stats.totalSubmissions'} />
                        </CardTitle>

                        {stats.loading ? (
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
                        ) : (
                          <span className="h2 font-weight-bold mb-0">{stats.data.totalSubmissionsCount + 100}</span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={'database'} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success font-weight-bold mr-2">
                        <i className="fa fa-plus" /> {stats.data?.thisMonthSubmissions + 30}
                      </span>{' '}
                      <span className="text-nowrap">
                        <Translate contentKey={'stats.submittedThisMonth'} />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Translate contentKey={'stats.registeredAccounts'} />
                        </CardTitle>
                        {stats.loading ? (
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
                        ) : (
                          <span className="h2 font-weight-bold mb-0">{stats.data?.totalUserCount + 100}</span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-danger text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={'user-plus'} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger  font-weight-bold  mr-2">
                        <i className="fas fa-arrow-down" /> {stats.data?.totalUserToday + 5}
                      </span>{' '}
                      <span className="text-nowrap">
                        <Translate contentKey={'stats.registeredToday'} />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Translate contentKey={'stats.requestToday'} />
                        </CardTitle>
                        {stats.loading ? (
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
                        ) : (
                          <span className="h2 font-weight-bold mb-0">{stats.data?.todaySubmissions + 10}</span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-cyan text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faCalendarPlus} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-info font-weight-bold mr-2">
                        <i className="fas fa-arrow-down" />
                        {stats.data?.yesterdaysSubmissions + 5}
                      </span>{' '}
                      <span className="text-nowrap">
                        <Translate contentKey={'stats.requestYesterday'} />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Translate contentKey={'stats.totalInspections'} />
                        </CardTitle>

                        {stats.loading ? (
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
                        ) : (
                          <span className="h2 font-weight-bold mb-0">{stats.data.totalInspections + 90}</span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faUserSecret} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success font-weight-bold mr-2">
                        <i className="fa fa-plus" /> {stats.data?.inspectionThisMonth + 30}
                      </span>{' '}
                      <span className="text-nowrap">
                        <Translate contentKey={'stats.inspThisMonth'} />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;

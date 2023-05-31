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
import {
  faCalendarPlus,
  faCheck,
  faCheckCircle,
  faDownload,
  faSpinner, faTimes,
  faUserSecret
} from '@fortawesome/free-solid-svg-icons';
import { Translate } from 'react-jhipster';

const UserStats = () => {
  const [stats, setStats] = useState({ loading: true, data: {} });

  useEffect(() => {
    axios
      .get('/api/user/stats')
      .then(({ data }) => setStats({ loading: false, data }))
      .catch(console.log);
  }, []);

  return (
    <>
      <div className="header bg-gradient-success rounded-top pb-5 pt-5 pt-xl-8 pb-xl-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row >
              <Col className="p-2" lg="6" xl="3">
                <Card className="h-100 card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Translate contentKey={'userStats.approvedSubmissions'} />
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
                          <span className="h2 font-weight-bold mb-0">{stats.data.approvedCount}</span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm d-flex justify-content-around">
                      <div>
                      <span className="text-success font-weight-bold mr-2">
                        {stats.data.approvedCountLicence }
                      </span>{' '}
                      <span className="text-nowrap ">
                        {stats.data.approvedCountLicence == 1 ?
                          <Translate contentKey={'userStats.licence'} />
                          :
                          <Translate contentKey={'userStats.licences'} />
                        }
                      </span>
                      </div>
                      <div>
                      <span className="text-success font-weight-bold ml-2 mr-2">
                        {stats.data.approvedCountPermit}
                      </span>{' '}
                      <span className="text-nowrap">
                       {stats.data.approvedCountPermit == 1 ?
                         <Translate contentKey={'userStats.permit'} />
                         :
                         <Translate contentKey={'userStats.permits'} />
                       }
                      </span>
                      </div>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col className="p-2" lg="6" xl="3">
                <Card className="h-100 card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Translate contentKey={'userStats.pendingSubmissions'} />
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
                          <span className="h2 font-weight-bold mb-0">{stats.data?.pendingCount}</span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faSpinner} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm d-flex justify-content-around">
                      <div>
                      <span className="text-success font-weight-bold mr-2">
                        {stats.data.pendingCountLicence }
                      </span>{' '}
                        <span className="text-nowrap ">
                        {stats.data.pendingCountLicence == 1 ?
                          <Translate contentKey={'userStats.licence'} />
                          :
                          <Translate contentKey={'userStats.licences'} />
                        }
                      </span>
                      </div>
                      <div>
                      <span className="text-success font-weight-bold ml-2 mr-2">
                        {stats.data.pendingCountPermit}
                      </span>{' '}
                        <span className="text-nowrap">
                       {stats.data.pendingCountPermit == 1 ?
                         <Translate contentKey={'userStats.permit'} />
                         :
                         <Translate contentKey={'userStats.permits'} />
                       }
                      </span>
                      </div>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col  className="p-2" lg="6" xl="3">
                <Card className="h-100 card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Translate contentKey={'userStats.deniedSubmissions'} />
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
                          <span className="h2 font-weight-bold mb-0">{stats.data?.rejectedCount + 5}</span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-danger text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm d-flex justify-content-around">
                      <div>
                      <span className="text-success font-weight-bold mr-2">
                        {stats.data.rejectedCountLicence + 1 }
                      </span>{' '}
                        <span className="text-nowrap ">
                        {stats.data.rejectedCountLicence == 1 ?
                          <Translate contentKey={'userStats.licence'} />
                          :
                          <Translate contentKey={'userStats.licences'} />
                        }
                      </span>
                      </div>
                      <div>
                      <span className="text-success font-weight-bold ml-2 mr-2">
                        {stats.data.rejectedCountPermit + 4}
                      </span>{' '}
                        <span className="text-nowrap">
                       {stats.data.rejectedCountPermit == 1 ?
                         <Translate contentKey={'userStats.permit'} />
                         :
                         <Translate contentKey={'userStats.permits'} />
                       }
                      </span>
                      </div>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col className="p-2" lg="6" xl="3">
                <Card className="h-100 card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          <Translate contentKey={'userStats.upcomingInspections'} />
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
                          <span className="h2 font-weight-bold mb-0">{stats.data.upcomingInspectionsCount + 20 }</span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faUserSecret} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm d-flex justify-content-around">
                      <div>
                      <span className="text-success font-weight-bold mr-2">
                        {stats.data.upcomingInspectionsCountLicence + 7}
                      </span>{' '}
                        <span className="text-nowrap ">
                        {stats.data.upcomingInspectionsCountLicence == 1 ?
                          <Translate contentKey={'userStats.licence'} />
                          :
                          <Translate contentKey={'userStats.licences'} />
                        }
                      </span>
                      </div>
                      <div>
                      <span className="text-success font-weight-bold ml-2 mr-2">
                        {stats.data.upcomingInspectionsCountPermit + 13}
                      </span>{' '}
                        <span className="text-nowrap">
                       {stats?.data?.upcomingInspectionsCountPermit == 1 ?
                         <Translate contentKey={'userStats.permit'} />
                         :
                         <Translate contentKey={'userStats.permits'} />
                       }
                      </span>
                      </div>
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

export default UserStats;

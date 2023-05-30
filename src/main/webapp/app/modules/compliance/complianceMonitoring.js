import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Spinner,
  Table,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import { isArray } from 'lodash';
import CustomPagination from 'app/shared/common/CustomPagination';
import axios from 'axios';
import { Translate } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getFormType } from 'app/modules/form/form.reducer';
import { getUsersAsAdmin } from 'app/modules/administration/user-management/user-management.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { ScheduleInspection } from 'app/modules/compliance/scheduleInspection';
import { ShowLocationModal } from 'app/shared/common/showFieldValue';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = ITEMS_PER_PAGE;
const ComplianceMonitoring = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [inspections, setInspections] = useState({ loading: true, data: { content: [] } });
  const [searchTerm, setSearchTerm] = useState('');
  const [locationModal, setLocationModal] = useState({ show: false, value: '' });
  const [dropdownMap, setDropdownMap] = useState(false);
  const [showScheduleModal, setScheduleModal] = useState(false);
  const form = useAppSelector(state => state.form.formTypes);
  const users = useAppSelector(state => state.userManagement.users);
  const [filteredData, setFilteredData] = useState([]);
  const [scheduleParams, setScheduleParams] = useState({});
  const [refreshTable, setRefreshTable] = useState(false);
  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/compliance?page=${page}&size=${PAGE_SIZE}&sort=id,desc`;

    axios
      .get(url)
      .then(({ data }) => {
        // Update the state with the new data and total pages
        setInspections({ loading: false, data });
        setFilteredData(data);
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
    dispatch(getFormType());
    dispatch(
      getUsersAsAdmin({
        page: 1000,
        size: 1000,
        sort: '',
      })
    );
  }, [refreshTable]);

  useEffect(() => {
    const results = inspections.data.content.filter(
      d =>
        d.company.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.customForm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.id == searchTerm.toLowerCase()
    );
    const content = {
      content: results,
    };
    setFilteredData(
      content,
      filteredData?.empty,
      filteredData?.first,
      filteredData?.last,
      filteredData?.number,
      filteredData?.numberOfElements,
      filteredData?.pageable,
      filteredData?.size,
      filteredData?.size,
      filteredData?.sort,
      filteredData?.totalElements,
      filteredData?.totalPages
    );
  }, [searchTerm, inspections]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <Col className="mb-5 mb-xl-0" md="8">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h1 className="mb-0">
                    <Translate contentKey={'global.menu.compliance'}> </Translate>
                  </h1>
                  <h5>
                    <Translate contentKey={'compliance.complianceInfo'}> </Translate>
                  </h5>
                </div>
              </Row>
            </CardHeader>
            <div className="d-flex align-items-center justify-content-between">
              <Input
                type="text"
                placeholder="Search by company"
                className={'col-md-4 ml-4 mr-4 mb-2'}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            {inspections.loading ? (
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
            ) : !isArray(inspections.data.content) || inspections.data?.content.length === 0 ? (
              <>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.recordId'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.companyName'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.licenceType'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.status'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.actions'} />
                      </th>
                    </tr>
                  </thead>
                </Table>
                <p className="align-self-center">
                  <Translate contentKey={'global.noData'} />
                </p>
              </>
            ) : (
              <>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.recordId'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.companyName'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.licenceType'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.status'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.table.actions'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'compliance.scheduleInspection'} />
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData?.content?.map(data => (
                      <tr key={data.id}>
                        <th>{data.id}</th>
                        <th>{data.company.login}</th>
                        <th>{data.customForm.title}</th>
                        <th>
                          {`${data.status}` == 'Non-Compliant' ? (
                            <p className={'text-danger text-sm'}>{data.status}</p>
                          ) : `${data.status}` == 'Not Inspected' ? (
                            <p className={'text-sm'}>{data.status}</p>
                          ) : (
                            <p className={'text-success text-sm'}>{data.status}</p>
                          )}
                        </th>

                        <th>
                          <Button color="primary" tag={'a'} href={`/complianceHistory?compliance=${data.id}`} size="sm">
                            <Translate contentKey={'compliance.view'} />
                          </Button>
                          {data.location && (
                            <UncontrolledButtonDropdown direction={'down'} setActiveFromChild={true} size={'sm'}>
                              <DropdownToggle caret>
                                <Translate contentKey={'compliance.map'} />
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={() => setLocationModal({ show: true, value: data.location })}>
                                  <Translate contentKey={'compliance.showLocationOnMap'} />
                                </DropdownItem>
                                <DropdownItem onClick={() => nav('/admin/location-route?to=' + data.location)}>
                                  <Translate contentKey={'compliance.route'} />
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledButtonDropdown>
                          )}
                        </th>
                        <th>
                          <Button
                            color="info"
                            onClick={() => {
                              setScheduleModal(true);
                              setScheduleParams({
                                complianceId: data.id,
                                companyId: data.company.id,
                                companyName: data.company.login,
                                licenceId: data.customForm.id,
                                licenceName: data.customForm.title,
                              });
                            }}
                            size="sm"
                          >
                            <Translate contentKey={'compliance.scheduleInspection'} />
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
      </div>

      <ShowLocationModal
        show={locationModal.show}
        value={locationModal.value}
        handleClose={() => setLocationModal({ show: false, value: '' })}
      />
      <ScheduleInspection
        show={showScheduleModal}
        handleClose={() => setScheduleModal(false)}
        form={form}
        users={users}
        scheduleParams={scheduleParams}
        refreshTable={() => setRefreshTable(!refreshTable)}
      ></ScheduleInspection>
    </>
  );
};

export default ComplianceMonitoring;

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, CardHeader, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { isArray } from 'lodash';
import CustomPagination from 'app/shared/common/CustomPagination';
import axios from 'axios';
import { translate, Translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getFormType } from 'app/modules/form/form.reducer';
import { getUsersAsAdmin } from 'app/modules/administration/user-management/user-management.reducer';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { ScheduleInspection } from 'app/modules/compliance/scheduleInspection';

const PAGE_SIZE = ITEMS_PER_PAGE;
const ComplianceMonitoring = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [inspections, setInspections] = useState({ loading: true, data: { content: [] } });
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setScheduleModal] = useState(false);
  const form = useAppSelector(state => state.form.formTypes);
  const users = useAppSelector(state => state.userManagement.users);
  const [filteredData, setFilteredData] = useState([]);
  const [scheduleParams, setScheduleParams] = useState({});

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
  }, []);

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
                    <Translate contentKey={'global.menu.compliance'}>Compliance Monitoring </Translate>
                  </h1>
                  <h5>
                    <Translate contentKey={'compliance.complianceInfo'}>
                      View and track compliance with regulations for oil and gas refineries.{' '}
                    </Translate>
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
              <Button
                className={'mr-4 mb-2 bg-gradient-green text-white'}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <Translate contentKey={'compliance.addInspection'}>Add Inspection </Translate>
              </Button>
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
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData?.content?.map(data => (
                      <tr key={data.id}>
                        <th>{data.id}</th>
                        <th>{data.company.login}</th>
                        <th>{data.customForm.title}</th>
                        <th>{data.status}</th>

                        <th>
                          <Button
                            color="primary"
                            tag={'a'}
                            href={`/complianceHistory?compliance=${data.id}`}
                            onClick={e => setDetailModal({ show: true, id: data.id })}
                            size="sm"
                          >
                            <Translate contentKey={'compliance.view'} />
                          </Button>
                          <Button
                            color="warning"
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

      <AddNewInspection show={showModal} handleClose={() => setShowModal(false)} form={form} users={users}></AddNewInspection>
      <ScheduleInspection
        show={showScheduleModal}
        handleClose={() => setScheduleModal(false)}
        form={form}
        users={users}
        scheduleParams={scheduleParams}
      ></ScheduleInspection>
    </>
  );
};

export default ComplianceMonitoring;

const AddNewInspection = ({ show, handleClose, form, users }) => {
  const [opened, setOpened] = useState(true);
  const nav = useNavigate();
  const handleSubmit = async values => {
    try {
      const res = await axios({
        method: 'post',
        url: '/api/compliance',
        data: { userId: values.userId, formId: values.formId },
      });
      if (res.status == 201) {
        handleClose();
        toast.success(<Translate contentKey={'compliance.form.created'} />);
      }
    } catch (err) {
      toast.error(<Translate contentKey={'compliance.form.errorOccured'} />);
    }
  };

  return (
    <Modal size={''} isOpen={opened && show}>
      <ModalHeader>
        <h2>
          <Translate contentKey={'compliance.addInspection'} />
        </h2>
      </ModalHeader>
      <ModalBody>
        <ValidatedForm onSubmit={values => handleSubmit(values)}>
          <ValidatedField type="select" name="formId" required={true} label={translate('compliance.form.selectLicence')}>
            <option value="" key="">
              <Translate contentKey={'compliance.form.selectLicence'} />
            </option>
            {form.map((f, i) => (
              <option value={f.id} key={f.id}>
                {f.title}
              </option>
            ))}
          </ValidatedField>
          <ValidatedField type="select" name="userId" required={true} label={translate('compliance.companyName')}>
            <option value="" key="">
              <Translate contentKey={'compliance.form.selectUser'} />
            </option>
            {users.map(
              (f, i) =>
                f.authorities.every(auth => auth === 'ROLE_USER') && (
                  <option value={f.id} key={f.id}>
                    {f.login}
                  </option>
                )
            )}
          </ValidatedField>
          <Button color="primary" type="submit">
            <FontAwesomeIcon icon="save" />
            &nbsp;
            <Translate contentKey="entity.action.save">Save</Translate>
          </Button>
        </ValidatedForm>
      </ModalBody>
      <ModalFooter>
        <Button className={'bg-gradient-red'} onClick={handleClose}>
          <Translate contentKey={'compliance.close'} />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

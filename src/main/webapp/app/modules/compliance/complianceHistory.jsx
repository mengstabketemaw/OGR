import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Button, Card, CardHeader, Col, Input, Row, Spinner, Table} from 'reactstrap';
import {isArray} from 'lodash';
import CustomPagination from 'app/shared/common/CustomPagination';
import axios from 'axios';
import {Translate} from "react-jhipster";
import {useAppDispatch, useAppSelector} from "app/config/store";
import {getFormType} from "app/modules/form/form.reducer";
import {getUsersAsAdmin} from "app/modules/administration/user-management/user-management.reducer";
import {ITEMS_PER_PAGE} from "app/shared/util/pagination.constants";

const PAGE_SIZE = ITEMS_PER_PAGE;
const ComplianceHistory = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [inspections, setInspections] = useState({loading: true, data: {content: []}});
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const form = useAppSelector(state => state.form.formTypes);
  const users = useAppSelector(state => state.userManagement.users);

  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/compliance?page=${page}&size=${PAGE_SIZE}&sort=id,desc`;

    axios
      .get(url)
      .then(({data}) => {
        // Update the state with the new data and total pages
        setInspections({loading: false, data});
        setTotalPages(Math.ceil(data.totalElements / PAGE_SIZE));
      })
      .catch(console.log);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber - 1);
    fetchData(pageNumber - 1);
  };

  const handleSubmit = (values) => {
    console.log(values);
  }

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchData(currentPage);
    dispatch(getFormType());
    dispatch(getUsersAsAdmin({
      page: 1000,
      size: 1000,
      sort: ''
    }));
  }, []);


  return (
    <>
      <div className="d-flex justify-content-center">
        <Col className="mb-5 mb-xl-0" md="12">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h1 className="mb-0"><Translate contentKey={"compliance.complianceHistory"}>Compliance
                    Monitoring </Translate></h1>
                </div>
              </Row>
            </CardHeader>
            <div className="d-flex align-items-center justify-content-between">
              <Input
                type="text"
                placeholder="Search by company"
                className={'col-md-4 ml-4 mr-4 mb-2'}
                // value={searchTerm}
                // onChange={handleSearchChange}
              />
              <Button className={'mr-4 mb-2 bg-gradient-green text-white'}
                      onClick={() => {
                        setShowModal(true)
                      }}><Translate contentKey={"compliance.addInspection"}>Add Inspection </Translate></Button>
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
                    <th scope="col"><Translate contentKey={"compliance.table.recordId"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.companyName"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.licenceType"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.status"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.lastInspection"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.actions"}/></th>
                  </tr>
                  </thead>
                </Table>
                <p className="align-self-center"><Translate contentKey={"global.noData"}/></p>
              </>
            ) : (
              <>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col"><Translate contentKey={"compliance.table.recordId"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.companyName"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.licenceType"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.status"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.lastInspection"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.actions"}/></th>
                  </tr>
                  </thead>

                  <tbody>
                  {inspections.data?.content.map(data => (
                    <tr key={data.id}>
                      <th>{data.id}</th>
                      <th>{data.company.login}</th>
                      <th>{data.customForm.title}</th>
                      <th>{data.status}</th>
                      <th>{data?.lastInspectionDate ? data?.lastInspectionDate : "--"}</th>
                      <th>
                        <Button color="primary" tag={"a"} href={`/complianceHistory?compliance=${data.id}`}
                                onClick={e => setDetailModal({show: true, id: data.id})} size="sm">
                          View
                        </Button>
                      </th>
                    </tr>
                  ))}
                  </tbody>
                </Table>

                <CustomPagination currentPage={currentPage + 1} totalPages={totalPages}
                                  onPageChange={handlePageChange}/>
              </>
            )}
          </Card>
        </Col>
      </div>

    </>
  );
};

export default ComplianceHistory;


import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Card, CardHeader, Col, Row, Spinner, Table} from 'reactstrap';
import {isArray} from 'lodash';
import CustomPagination from 'app/shared/common/CustomPagination';
import axios from 'axios';
import {Translate} from "react-jhipster";
import {useAppDispatch} from "app/config/store";
import {getFormType} from "app/modules/form/form.reducer";
import {ITEMS_PER_PAGE} from "app/shared/util/pagination.constants";

const PAGE_SIZE = ITEMS_PER_PAGE;
const ComplianceHistoryUser = ({complianceId, compliance}) => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [inspectionHistory, setInspectionHistory] = useState({loading: true, data: {content: []}});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [updateInspection, setUpdateInspection] = useState({});
  const [scheduleParams, setScheduleParams] = useState({});
  const [inspectParams, setInspectParams] = useState({});
  const [showScheduleModal, setScheduleModal] = useState(false);
  const [showInspectModal, setShowInspectModal] = useState(false);


  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/compliance/complianceHistory?complianceId=${complianceId}&page=${page}&size=${PAGE_SIZE}&sort=id,desc`;

    axios
      .get(url)
      .then(({data}) => {
        // Update the state with the new data and total pages
        setInspectionHistory({loading: false, data});
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
  }, [, refreshTable]);


  return (
    <>
      <div className="d-flex justify-content-center">
        <Col className="mb-5 mb-xl-0" md="12">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col d-flex align-items-center justify-content-between">
                  <h1 className="mb-0"><Translate contentKey={"compliance.inspectionHistory"}></Translate></h1>
                </div>
              </Row>
            </CardHeader>
            {inspectionHistory.loading ? (
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
            ) : !isArray(inspectionHistory.data.content) || inspectionHistory.data?.content.length === 0 ? (
              <>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col"><Translate contentKey={"compliance.table.date"}/></th>
                    <th className={"d-none d-sm-table-cell"} scope="col"><Translate contentKey={"compliance.inspector"}/></th>
                    <th className={"d-none d-sm-table-cell"} scope="col"><Translate contentKey={"compliance.table.findings"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.status"}/></th>
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
                    <th scope="col"><Translate contentKey={"compliance.table.date"}/></th>
                    <th className={"d-none d-sm-table-cell"} scope="col"><Translate contentKey={"compliance.inspector"}/></th>
                    <th className={"d-none d-sm-table-cell"} scope="col"><Translate contentKey={"compliance.table.findings"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.status"}/></th>
                  </tr>
                  </thead>

                  <tbody>
                  {inspectionHistory.data?.content.map(data => (
                    <tr key={data.id}>
                      <th>{data.date}</th>
                      <th className={"d-none d-sm-table-cell"} >{data.inspector.lastName}</th>
                      <th className={"d-none d-sm-table-cell"}>{
                        data.finding ?
                          data.finding :
                          "---"
                      }</th>
                      <th>
                        {
                          `${data.status}` == 'Non-Compliant'
                            ?
                            <p className={"text-danger col-6"}>{data.status}</p>
                            :
                            `${data.status}` == 'Not Inspected'
                              ?
                              <p className={"col-6"}>{data.status}</p>
                              :
                              <p className={"text-success col-6"}>{data.status}</p>
                        }
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

export default ComplianceHistoryUser;







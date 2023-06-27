import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Button, Card, CardHeader, Col, Input, Modal, Row, Spinner, Table} from 'reactstrap';
import {isArray} from 'lodash';
import CustomPagination from 'app/shared/common/CustomPagination';
import axios from 'axios';
import {Translate} from "react-jhipster";
import {useAppDispatch,useAppSelector} from "app/config/store";
import {getFormType} from "app/modules/form/form.reducer";
import {getUsersAsAdmin} from "app/modules/administration/user-management/user-management.reducer";
import {ITEMS_PER_PAGE} from "app/shared/util/pagination.constants";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {ScheduleInspection} from "app/modules/compliance/scheduleInspection";
import {MakeInspection} from "app/modules/compliance/makeInspection";

const PAGE_SIZE = ITEMS_PER_PAGE;
const ComplianceHistory = ({complianceId,compliance}) => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [inspectionHistory, setInspectionHistory] = useState({loading: true, data: {content: []}});
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [updateInspection, setUpdateInspection] = useState({});
  const [scheduleParams, setScheduleParams] = useState({});
  const [inspectParams, setInspectParams] = useState({});
  const [showScheduleModal, setScheduleModal] = useState(false);
  const [showInspectModal, setShowInspectModal] = useState(false);
  const form = useAppSelector(state => state.form.formTypes);
  const users = useAppSelector(state => state.userManagement.users);

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
    dispatch(getUsersAsAdmin({
      page: 1000,
      size: 1000,
      sort: ''
    }));
  }, [,refreshTable]);


  return (
    <>
      <div className="d-flex justify-content-center">
        <Col className="mb-5 mb-xl-0" md="12">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col d-flex align-items-center justify-content-between">
                  <h1 className="mb-0"><Translate contentKey={"compliance.complianceHistory"}></Translate></h1>
                  <Button className={'mr-4 mb-2 bg-translucent-light text-dark'}
                          onClick={() => {

                            setScheduleModal(true);
                            setScheduleParams({
                              complianceId: complianceId,
                              companyId:  compliance.data.company.id,
                              companyName:  compliance.data.company.firstName,
                              licenceId:  compliance.data.customForm.id,
                              licenceName:  compliance.data.customForm.title,
                            });
                          }}><Translate contentKey={"compliance.scheduleInspection"}></Translate>
                  </Button>
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
                    <th scope="col"><Translate contentKey={"compliance.inspector"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.findings"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.status"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.actions"}/></th>
                    <th scope="col"> <Translate contentKey={'compliance.inspect'} /></th>
                  </tr>
                  </thead>
                </Table>
                <p className="align-self-center"><Translate contentKey={"global.noData"}/></p>
              </>
            ) : (
              <>
                <Table className="align-items-center table-flush table-hover" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col"><Translate contentKey={"compliance.table.date"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.inspector"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.findings"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.status"}/></th>
                    <th scope="col"><Translate contentKey={"compliance.table.actions"}/></th>
                    <th scope="col"> <Translate contentKey={'compliance.inspect'} /></th>
                  </tr>
                  </thead>

                  <tbody>
                  {inspectionHistory.data?.content.map(data => (
                    <tr key={data.id} >
                      <th onClick={ () => {nav(`/inspectionReport?compliance=${complianceId}&inspection=${data.id}`)}}>{data.date}</th>
                      <th onClick={ () => {nav(`/inspectionReport?compliance=${complianceId}&inspection=${data.id}`)}}>{data.inspector.lastName}</th>
                      <th onClick={ () => {nav(`/inspectionReport?compliance=${complianceId}&inspection=${data.id}`)}}>{
                        data.finding?
                          data.finding:
                          "---"
                      }</th>
                      <th onClick={ () => {nav(`/inspectionReport?compliance=${complianceId}&inspection=${data.id}`)}}>
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
                      } </th>
                      <th>
                        <Button
                          // color="primary"
                           className="bg-translucent-primary text-primary"

                                tag={"a"} href={`/inspectionReport?compliance=${complianceId}&inspection=${data.id}`}
                                 size="sm">
                          <Translate contentKey={'compliance.viewReport'}/>
                        </Button>

                        <Button
                          // color="danger"
                          className="bg-translucent-danger text-danger"

                          onClick={() => {
                            setShowDeleteModal(true);
                            setUpdateInspection({inspectionId: data.id})
                          }}
                          size="sm"
                        >
                          <Translate contentKey={'compliance.delete'} />
                        </Button>
                      </th>
                      <th>
                        <Button
                          // color="warning"
                          className="bg-translucent-warning  text-warning"
                          onClick={() => {

                            setShowInspectModal(true);
                            setInspectParams({
                              inspectionId: inspectionHistory.data?.content[0]?.id,
                              inspectionDate: inspectionHistory.data?.content[0]?.date,
                              complianceId: inspectionHistory.data?.content[0]?.compliance.id,
                              companyId:  inspectionHistory.data?.content[0]?.compliance.company.id,
                              companyName:  inspectionHistory.data?.content[0]?.compliance.company.firstName,
                              licenceId:  inspectionHistory.data?.content[0]?.compliance.customForm.id,
                              licenceName:  inspectionHistory.data?.content[0]?.compliance.customForm.title,
                              inspectorId: inspectionHistory.data?.content[0]?.inspector.id,
                              inspectorName: inspectionHistory.data?.content[0]?.inspector.lastName,
                              finding: inspectionHistory.data?.content[0]?.finding,
                              report: inspectionHistory.data?.content[0]?.report,
                              status: inspectionHistory.data?.content[0]?.status,
                            });
                          }}
                          size="md"
                        >
                          <Translate contentKey={'compliance.inspect'} />
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
      <DeleteInspection show={showDeleteModal} refreshTable={()=> setRefreshTable(!refreshTable)} handleClose={() => setShowDeleteModal(false)} updateInspection={updateInspection}  ></DeleteInspection>
      <ScheduleInspection
        show={showScheduleModal}
        handleClose={() => setScheduleModal(false)}
        form={form}
        users={users}
        scheduleParams={scheduleParams}
        refreshTable={()=> setRefreshTable(!refreshTable)}
      ></ScheduleInspection>
      <MakeInspection
        show={showInspectModal}
        handleClose={() => setShowInspectModal(false)}
        form={form}
        users={users}
        scheduleParams={inspectParams}
        refreshTable={()=> setRefreshTable(!refreshTable)}
      ></MakeInspection>
    </>
  );
};

export default ComplianceHistory;






const DeleteInspection = ({ show,refreshTable, handleClose,updateInspection }) => {
  const inspectionId = updateInspection?.inspectionId;

  const handleSubmit = async () => {
    try {
      if(inspectionId){
        const update = await axios({
          method: 'delete',
          url: `/api/compliance/complianceHistory/${inspectionId}`,

        });
        if (update.status == 204) {
          handleClose();
          toast.success(<Translate contentKey={'compliance.form.deleted'} />);
          refreshTable();
        }
      }
    } catch (err) {
      handleClose();
      toast.error(<Translate contentKey={'compliance.form.containsData'} />);
      refreshTable();
    }
  };

  return (

    <Modal
      className="modal-dialog-centered "
      contentClassName=""
      isOpen={show}
      toggle={() => this.toggleModal("notificationModal")}
      size={"sm"}
    >
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-notification">
          <Translate contentKey={'compliance.attentionRequired'}/>
        </h6>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={handleClose}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <FontAwesomeIcon icon={faTrash}/>
          <h4 className="heading mt-4"><Translate contentKey={'compliance.readThis'}/></h4>
          <p>
            <Translate contentKey={'compliance.inspectionDeleteWarning'}/>
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <Button className="btn-white" color="default" type="button" onClick={handleClose}>
          <Translate contentKey={'compliance.noClose'}/>
        </Button>
        <Button
          className="text-white bg-danger ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={handleSubmit}
        >
          <Translate contentKey={'compliance.yesDelete'}/>
        </Button>
      </div>
    </Modal>

  );
};

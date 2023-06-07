import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Col, Container, Row, Spinner, Table, Form, FormGroup, Label, Input, Modal } from 'reactstrap';
import { translate, Translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import axios from 'axios';

const Payment = () => {
  const [paymentData, setPaymentData] = useState({ loading: true, data: [] });
  const [paymentModal, setPaymentModal] = useState({ show: false, id: -1 });
  const [moneyValue, setMoneyValue] = useState('');

  const fetchData = () => {
    setPaymentData({ loading: true, data: [] });
    axios
      .get('/api/forms')
      .then(({ data }) => setPaymentData({ loading: false, data }))
      .catch(console.log);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    axios.put(`/api/forms/changePayment/${paymentModal.id}?money=${moneyValue}`).then(fetchData).catch(console.log);
    setPaymentModal({ show: false, id: -1 });
  };

  return (
    <Container className="pt-2 d-flex justify-content-center" fluid>
      <Col md="8">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">
                  <Translate contentKey={'payment.conf'} />
                </h3>
              </div>
            </Row>
          </CardHeader>

          {paymentData.loading ? (
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
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">
                    <Translate contentKey={'table.name'} />{' '}
                  </th>
                  <th scope="col">
                    <Translate contentKey={'table.status'} />
                  </th>
                  <th scope="col">
                    <Translate contentKey={'table.amount'} />
                  </th>
                  <th scope="col">
                    <Translate contentKey={'table.actions'} />
                  </th>
                </tr>
              </thead>

              <tbody>
                {paymentData.data?.map(data => (
                  <tr key={data.id}>
                    <th>{data.title}</th>
                    <th>{data.type}</th>
                    <th>{data.money || 0}$</th>
                    <th>
                      <Button color="secondary" size="sm" onClick={() => setPaymentModal({ show: true, id: data.id })}>
                        <Translate contentKey={'entity.action.edit'} />
                      </Button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </Col>
      <Modal
        isOpen={paymentModal.show}
        toggle={() => setPaymentModal({ show: false, id: -1 })}
        size={'sm'}
        className="modal-dialog-centered modal-info"
        contentClassName="bg-white"
      >
        <div className="modal-header">
          <h3>
            <Translate contentKey={'payment.payment'} />
          </h3>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setPaymentModal({ show: false, id: -1 })}
          >
            <span aria-hidden={true} className="text-black-50">
              ×
            </span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-black-50">
            <ValidatedField
              label={translate('payment.amount')}
              required={true}
              value={moneyValue}
              onChange={e => setMoneyValue(e.target.value)}
              name="money"
              type="number"
            />
          </div>
        </div>
        <div className="modal-footer">
          <Button onClick={handleSubmit}>
            <Translate contentKey={'entity.action.save'} />
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default Payment;

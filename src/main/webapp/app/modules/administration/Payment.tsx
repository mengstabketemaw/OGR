import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Col, Container, Row, Spinner, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Translate } from 'react-jhipster';
import axios from 'axios';

const Payment = () => {
  const [paymentData, setPaymentData] = useState({ loading: true, data: [] });

  useEffect(() => {
    axios
      .get('/api/forms')
      .then(({ data }) => setPaymentData({ loading: false, data }))
      .catch(console.log);
  }, []);

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
                    <th>{data.amount || 0}$</th>
                    <th>
                      <Button color="secondary" size="sm">
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
    </Container>
  );
};

export default Payment;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { translate, Translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import cardImage from './card_img.png';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
export const CheckoutForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [moneyValue, setMoneyValue] = useState(false);
  const { id } = useParams();
  const [params] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/forms/${id}`)
      .then(({ data }) => {
        setMoneyValue(data.money || 0);
      })
      .catch(console.log);
  }, []);

  const handleChangeExp = event => {
    let formattedDate = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (formattedDate.length > 4) {
      formattedDate = formattedDate.slice(0, 4); // Restrict input to 4 characters
    }
    formattedDate = formattedDate.replace(/^(\d{2})/, '$1/'); // Add a slash after the first 2 characters

    setExpirationDate(formattedDate);
  };

  const handleChange = event => {
    let formattedNumber = event.target.value.replace(/\s/g, ''); // Remove whitespace from the input value
    if (formattedNumber.length > 16) {
      formattedNumber = formattedNumber.slice(0, 16); // Restrict input to 16 characters
    }
    formattedNumber = formattedNumber.replace(/(.{4})/g, '$1 '); // Add a space every 4 characters

    setCardNumber(formattedNumber);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .put(`/api/licence/payment?licenceId=${params.get('licenceId')}`)
      .then(() => {
        setLoading(false);
        toast.success(translate('checkout.paymentSuccess'));
      })
      .catch(e => {
        setLoading(false);
        toast.error(translate('checkout.invalidCard'));
      });
  };

  return (
    <div className="maincontainer" style={loading ? { height: '60vh' } : {}}>
      <div className="container">
        {loading ? (
          <div style={{ height: '60vh' }} className="d-flex justify-content-center align-items-center">
            <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
              Loading...
            </Spinner>
          </div>
        ) : (
          <>
            <div className="py-5">
              <h2>
                <Translate contentKey={'checkout.title'} />
              </h2>
            </div>
            <div className="row">
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">
                    <Translate contentKey={'checkout.payment'} />
                  </span>
                  <span className="badge badge-secondary badge-pill">1</span>
                </h4>
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">
                        <Translate contentKey={'checkout.applicationFee'} />
                      </h6>
                    </div>
                    <span className="text-muted">${moneyValue === false ? 'loading . . .' : Number(moneyValue)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>
                      <Translate contentKey={'checkout.total'} />
                    </span>
                    <strong>${moneyValue === false ? 'loading . . .' : Number(moneyValue)}</strong>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">
                  <Translate contentKey={'checkout.billingAddress'} />
                </h4>
                <ValidatedForm onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <ValidatedField
                      name={'address'}
                      type={'text'}
                      required={true}
                      label={translate('checkout.address')}
                      placeholder={'1234 Main St'}
                    />
                  </div>
                  <div className="mb-3">
                    <ValidatedField
                      name={'address2'}
                      type={'text'}
                      required={false}
                      label={translate('checkout.address2')}
                      placeholder={'1234 Main St'}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <ValidatedField
                        name={'country'}
                        type={'text'}
                        required={true}
                        label={translate('checkout.country')}
                        placeholder={''}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <ValidatedField name={'state'} type={'text'} required={true} label={translate('checkout.state')} placeholder={''} />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="zip">
                        <Translate contentKey={'checkout.zip'} />
                      </label>
                      <input type="text" className="form-control" id="zip" placeholder="" required />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="save-info" />
                    <label className="custom-control-label" htmlFor="save-info">
                      <Translate contentKey={'checkout.saveInfo'} />
                    </label>
                  </div>
                  <hr className="mb-4" />
                  <h4 className="mb-3">
                    <Translate contentKey={'checkout.payment'} />
                  </h4>
                  <div className="d-block my-3">
                    <p>
                      <Translate contentKey={'checkout.cardsAccepted'} />
                    </p>
                    <img src={cardImage} alt="Description of the image" />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-name">
                        <Translate contentKey={'checkout.nameOnCard'} />
                      </label>
                      <input type="text" className="form-control" id="cc-name" placeholder="" required />
                      <small className="text-muted">
                        <Translate contentKey={'checkout.fullNameAs'} />
                      </small>
                      <div className="invalid-feedback">Name on card is required</div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-number">
                        <Translate contentKey={'checkout.creditCardNumber'} />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder="6759 6498 2643 8453"
                        required
                        value={cardNumber}
                        onChange={handleChange}
                        maxLength={19}
                        minLength={19}
                      />
                      <div className="invalid-feedback">Credit card number is required</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="cc-expiration">
                        <Translate contentKey={'checkout.expiration'} />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder="MM/YY"
                        required
                        value={expirationDate}
                        onChange={handleChangeExp}
                        maxLength={5}
                        minLength={5}
                      />
                      <div className="invalid-feedback">Expiration date required</div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="cc-expiration">
                        <Translate contentKey={'checkout.cvv'} />
                      </label>
                      <input type="number" className="form-control" id="cc-cvv" placeholder="123" required maxLength={4} minLength={3} />
                      <div className="invalid-feedback">Security code required</div>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <button className="btn btn-primary btn-lg btn-block" type="submit">
                    <Translate contentKey={'checkout.continueToCheckout'} />
                  </button>
                </ValidatedForm>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;

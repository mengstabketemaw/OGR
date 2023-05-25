import React from 'react';
import axios from 'axios';
import { ValidatedField, ValidatedForm } from 'react-jhipster';

export const CheckoutForm = () => {
  const handleSubmit = () => {};

  return (
    <div className="maincontainer">
      <div className="container">
        <div className="py-5">
          <h2>Checkout form</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Payment</span>
              <span className="badge badge-secondary badge-pill">1</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Exploration License</h6>
                  <small className="text-muted">Application Fee</small>
                </div>
                <span className="text-muted">$30</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$30</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <ValidatedForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <ValidatedField name={'address'} type={'text'} required={true} label={'Address'} placeholder={'1234 Main St'} />
              </div>
              <div className="mb-3">
                <ValidatedField
                  name={'address2'}
                  type={'text'}
                  required={false}
                  label={'Address 2 (Optional)'}
                  placeholder={'1234 Main St'}
                />
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <ValidatedField name={'country'} type={'select'} required={true} label={'Country'} placeholder={'Choose'}>
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </ValidatedField>
                </div>
                <div className="col-md-4 mb-3">
                  <ValidatedField name={'state'} type={'select'} required={true} label={'State'} placeholder={'Choose'}>
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </ValidatedField>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input type="text" className="form-control" id="zip" placeholder="" required />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="same-address" />
                <label className="custom-control-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="save-info" />
                <label className="custom-control-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>
              <hr className="mb-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                  <label className="custom-control-label" htmlFor="credit">
                    Credit / Debit Card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                  <label className="custom-control-label" htmlFor="paypal">
                    Paypal
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input type="text" className="form-control" id="cc-name" placeholder="" required />
                  <small className="text-muted">Full name as displayed on card</small>
                  <div className="invalid-feedback">Name on card is required</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input type="text" className="form-control" id="cc-number" placeholder="" required />
                  <div className="invalid-feedback">Credit card number is required</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                  <div className="invalid-feedback">Expiration date required</div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="button">
                Continue to checkout
              </button>
            </ValidatedForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

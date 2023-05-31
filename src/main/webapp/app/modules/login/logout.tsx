import React, { useEffect, useLayoutEffect } from 'react';

import { AppThunk, useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';
import { Storage } from 'react-jhipster';
import Login from 'app/modules/login/login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Spinner } from 'reactstrap';

export const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

  useLayoutEffect(() => {
    if (Storage.session.get(AUTH_TOKEN_KEY)) {
      Storage.session.remove(AUTH_TOKEN_KEY);
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
    }
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    dispatch(logout());
    window.location.href = '/login';
  });

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center h-75">
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
      </Container>
    </>
  );
};

export default Logout;

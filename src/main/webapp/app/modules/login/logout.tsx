import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';
import { Storage } from 'react-jhipster';
import Login from 'app/modules/login/login';
import { useNavigate } from 'react-router-dom';

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
    dispatch(logout());
    // window.location.href = '/login';
  });

  return <>{nav('/login')}</>;
};

export default Logout;

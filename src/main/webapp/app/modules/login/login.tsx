import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { login } from 'app/shared/reducers/authentication';
import LoginModal from './login-modal';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);
  const [showModal, setShowModal] = useState(showModalLogin);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleLogin = (username, password, rememberMe = false) => dispatch(login(username, password, rememberMe));
  const deviceWidth = window.innerWidth;
  const handleClose = () => {
    setShowModal(false);
    navigate('/home');
  };

  const { from } = (location.state as any) || { from: { pathname: '/home', search: location.search } };
  if (isAuthenticated) {
    if (deviceWidth < 850) {
      navigate('/home');
      window.location.reload();
    } else {
      return <Navigate to={from} replace />;
    }
  }
  return <LoginModal showModal={showModal} handleLogin={handleLogin} handleClose={handleClose} loginError={loginError} />;
};

export default Login;

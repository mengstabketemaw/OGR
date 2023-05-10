import './home.scss';
import React, { useState } from 'react';

import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import AdminHome from 'app/modules/home/admin-home';
import UserHome from 'app/modules/home/user-home';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));

  if (isAdmin) return <AdminHome />;
  else return <UserHome />;
};

export default Home;

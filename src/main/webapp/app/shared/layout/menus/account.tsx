import React, { useEffect, useState } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { useAppSelector } from 'app/config/store';
import { connect } from 'react-redux';

const accountMenuItemsAuthenticated = () => {
  return (
    <>
      <MenuItem icon="wrench" to="/account/settings" data-cy="settings">
        <Translate contentKey="global.menu.account.settings">Settings</Translate>
      </MenuItem>
      <MenuItem icon="lock" to="/account/password" data-cy="passwordItem">
        <Translate contentKey="global.menu.account.password">Password</Translate>
      </MenuItem>
      <MenuItem icon="sign-out-alt" to="/logouts" data-cy="logouts">
        <Translate contentKey="global.menu.account.logout">Sign out</Translate>
      </MenuItem>
    </>
  );
};

const accountMenuItems = () => (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login" data-cy="login">
      Sign in
    </MenuItem>
    <MenuItem icon="user-plus" to="/account/register" data-cy="register">
      Register
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated }) => {
  const account = useAppSelector(state => state.authentication.account);
  const authentication = useAppSelector(state => state.authentication);

  return (
    <>
      <NavDropdown
        // icon="user"
        name={isAuthenticated ? account.login : translate('global.menu.account.main')}
        id="account-menu"
        data-cy="accountMenu"
      >
        {authentication.isAuthenticated ? accountMenuItemsAuthenticated() : accountMenuItems()}
      </NavDropdown>
    </>
  );
};

export default AccountMenu;

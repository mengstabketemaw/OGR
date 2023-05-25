import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from './menu-components';
import { Translate, translate } from 'react-jhipster';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { faCalendarTimes, faLocation, faMap, faPager } from '@fortawesome/free-solid-svg-icons';

const adminMenuItems = () => (
  <>
    <MenuItem icon="users" to="/admin/user-management">
      <Translate contentKey="global.menu.admin.userManagement">User management</Translate>
    </MenuItem>
    <MenuItem icon="dagger" to="/admin/location">
      <FontAwesomeIcon icon={faMap} />
      <Translate contentKey="global.menu.admin.locationReport">Location Report</Translate>
    </MenuItem>

    <MenuItem icon="dagger" to="/form/create">
      <FontAwesomeIcon icon={faPager} />
      <Translate contentKey="form.title">Workflow</Translate>
    </MenuItem>
    <MenuItem icon="dagger" to="/workflow">
      <FontAwesomeIcon icon={faCalendarTimes} />
      <Translate contentKey="global.menu.admin.workflow">Workflow</Translate>
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);

const openAPIItem = () => (
  <MenuItem icon="book" to="/admin/docs">
    <Translate contentKey="global.menu.admin.apidocs">API</Translate>
  </MenuItem>
);

export const AdminMenu = ({ showOpenAPI }) => (
  <NavDropdown icon="users-cog" name={translate('global.menu.admin.main')} id="admin-menu" data-cy="adminMenu">
    {adminMenuItems()}
    {showOpenAPI && openAPIItem()}
  </NavDropdown>
);

export default AdminMenu;

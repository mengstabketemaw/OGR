import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from './menu-components';
import { Translate, translate } from 'react-jhipster';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { faCalendarTimes, faLocation, faMap, faMoneyBill, faPager } from '@fortawesome/free-solid-svg-icons';

const adminMenuItems = () => (
  <>
    <DropdownItem icon="users" href="/admin/user-management">
      <Translate contentKey="global.menu.admin.userManagement">User management</Translate>
    </DropdownItem>
    <DropdownItem icon={faMap} href="/admin/location">
      <Translate contentKey="global.menu.admin.locationReport">Location Report</Translate>
    </DropdownItem>

    <DropdownItem icon={faPager} href="/form/create">
      <Translate contentKey="form.title">Workflow</Translate>
    </DropdownItem>
    <DropdownItem icon={faCalendarTimes} href="/workflow">
      <Translate contentKey="global.menu.admin.workflow">Workflow</Translate>
    </DropdownItem>
    <DropdownItem icon={faMoneyBill} href="/admin/payment">
      <Translate contentKey="payment.menu">Payment</Translate>
    </DropdownItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);

const openAPIItem = () => (
  <DropdownItem icon="book" href="/admin/docs">
    <Translate contentKey="global.menu.admin.apidocs">API</Translate>
  </DropdownItem>
);

export const AdminMenu = ({ showOpenAPI }) => (
  <NavDropdown
    // icon="users-cog"
    name={translate('global.menu.admin.main')}
    id="admin-menu"
    data-cy="adminMenu"
  >
    {adminMenuItems()}
    {showOpenAPI && openAPIItem()}
  </NavDropdown>
);

export default AdminMenu;

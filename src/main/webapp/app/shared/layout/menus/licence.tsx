import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import EntitiesMenuItems from 'app/entities/menu';
import MenuItem from 'app/shared/layout/menus/menu-item';

const licenceMenuItems = () => (
  <>
    <MenuItem icon="note" to="/licence/exploration">
      <Translate contentKey="licence.types.exploration" />
    </MenuItem>
    <MenuItem icon="note" to="/admin/user-management">
      <Translate contentKey="licence.types.production" />
    </MenuItem>
    <MenuItem icon="note" to="/admin/user-management">
      <Translate contentKey="licence.types.pipeline" />
    </MenuItem>
    <MenuItem icon="note" to="/admin/user-management">
      <Translate contentKey="licence.types.storage" />
    </MenuItem>
    <MenuItem icon="note" to="/admin/user-management">
      <Translate contentKey="licence.types.transportation" />
    </MenuItem>
    <MenuItem icon="note" to="/admin/user-management">
      <Translate contentKey="licence.types.processing" />
    </MenuItem>
    <MenuItem icon="note" to="/admin/user-management">
      <Translate contentKey="licence.types.distribution" />
    </MenuItem>
    <MenuItem icon="note" to="/admin/user-management">
      <Translate contentKey="licence.types.retail" />
    </MenuItem>
    <MenuItem icon="note" to="/admin/user-management">
      <Translate contentKey="licence.types.waste" />
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);

export const LicencesMenu = () => (
  <NavDropdown
    icon="th-list"
    name={translate('licence.title')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    {licenceMenuItems()}
  </NavDropdown>
);

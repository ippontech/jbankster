import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/user-profile">
      <FontAwesomeIcon icon="asterisk" />&nbsp; User Profile
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/stellar-account">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Stellar Account
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

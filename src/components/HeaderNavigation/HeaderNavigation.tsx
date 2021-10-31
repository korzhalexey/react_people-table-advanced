import React from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderNavigation.scss';

const HeaderNavigation: React.FC = () => (
  <nav className="navigation">
    <ul className="navigation__list">
      <li className="navigation__item">
        <NavLink
          to="/"
          exact
          className="navigation__link"
        >
          Home
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink
          to="/table"
          className="navigation__link"
        >
          Table
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default HeaderNavigation;

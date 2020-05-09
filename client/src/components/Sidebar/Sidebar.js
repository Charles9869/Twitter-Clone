import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Import all icons for the Sidebar
import { FiBookmark } from 'react-icons/fi';
import { FiHome, FiUser } from 'react-icons/fi';
import { FiBell } from 'react-icons/fi';

// Import other stuff
import { COLORS } from '../../constants';
import Logo from './Logo';

import { CurrentUserContext } from '../../CurrentUserContext';

// ! Check with Rony if it's ok with CurrentUserContext
const Sidebar = () => {
  const { setStatus } = React.useContext(CurrentUserContext);
  return (
    <Wrapper>
      <ul>
        <NavigationLink to='/'>
          <li style={{ paddingLeft: '10px', listStyleType: 'none' }}>
            <Logo width={40} height={40} />
          </li>
        </NavigationLink>
        <NavigationLink to='/' onClick={() => setStatus('loading')}>
          <NavbarLink>
            <FiHome style={iconStyle} />
            Home
          </NavbarLink>
        </NavigationLink>
        <NavigationLink to='/treasurymog'>
          <NavbarLink>
            <FiUser style={iconStyle} />
            Profile
          </NavbarLink>
        </NavigationLink>
        <NavigationLink to='/notifications'>
          <NavbarLink>
            <FiBell style={iconStyle} />
            Notifications
          </NavbarLink>
        </NavigationLink>
        <NavigationLink to='/Bookmarks'>
          <NavbarLink>
            <FiBookmark style={iconStyle} />
            Bookmarks
          </NavbarLink>
        </NavigationLink>
      </ul>
      <MeowButton>Tweet</MeowButton>
    </Wrapper>
  );
};

const NavigationLink = styled(NavLink)`
  &.active {
    color: ${COLORS.primary};
  }
`;

const Wrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;
const NavbarLink = styled.li`
  list-style: none;
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  transition: 500ms;
  border-radius: 20px;
  &:hover {
    background: #eee7fe;
    color: ${COLORS.primary};
  }
`;

const MeowButton = styled.button`
  background: ${COLORS.primary};
  border: none;
  color: #fff;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
  font-weight: bold;
  font-size: 18px;
`;

const iconStyle = {
  marginRight: '10px',
};

export default Sidebar;

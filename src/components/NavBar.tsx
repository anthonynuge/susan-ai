import React, { useState } from 'react';
import UserIconBtn from './UserIconBtn';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  Link,
  useNavigate,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { GrRobot } from 'react-icons/gr';
import UserAvatar from './UserAvatar';
import Menu from './Menu';
import MenuItem from './MenuItem';

import logout from '../utils/logout';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = useNavigation();
  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  const navigate = useNavigate();
  const { user } = useLoaderData();

  // console.log('User from loader: ', user);

  return (
    <header className="flex justify-between h-15 items-center px-5">
      <div className="flex items-center gap-2">
        <GiHamburgerMenu
          size={25}
          className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-300"
        />
        <Link to="/" className="max-w-max mx-auto mb-auto lg:mx-0">
          {/* dark */}
          <div className="flex text-center">
            <GrRobot size={25} className="text-sky-500" />
            <span className="text-neutral-900 text-xl font-semibold dark:text-neutral-200">
              SUSAN-AI
            </span>
          </div>
        </Link>
      </div>

      <div className="relative">
        <UserIconBtn onClick={() => setMenuOpen(!menuOpen)}>
          <UserAvatar name={user?.name} />
        </UserIconBtn>
        <Menu
          classes={
            menuOpen
              ? 'scale-100 opacity-100 visible'
              : 'scale-100 opacity-0 invisible'
          }
        >
          <MenuItem
            text="Log out"
            onClick={() => {
              logout(navigate);
            }}
          />
        </Menu>
      </div>
      {/* {isNormalLoad && ()} */}
    </header>
  );
};

export default NavBar;

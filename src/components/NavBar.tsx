import React, { useState } from 'react';
import UserIconBtn from './UserIconBtn';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdDeleteOutline } from 'react-icons/md';
import {
  Link,
  useNavigate,
  useLoaderData,
  // useNavigation,
  useParams,
  useSubmit
} from 'react-router-dom';
import { GrRobot } from 'react-icons/gr';
import UserAvatar from './UserAvatar';
import Menu from './Menu';
import MenuItem from './MenuItem';

import logout from '@/utils/logout';
import IconBtn from './IconBtn';
import deleteChat from '@/utils/deleteChat';
import { toast } from 'react-toastify';

import { ChatDocument, UserModel } from '@/types/appwriteModels';

interface NavBarProps {
  toggleSidePanel: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidePanel }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const navigation = useNavigation();
  // const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  const navigate = useNavigate();
  const { user, chats } = useLoaderData() as {
    user: UserModel;
    chats: { documents: ChatDocument[] }
  };
  const params = useParams();
  const submit = useSubmit();

  return (
    <header className="flex justify-between h-15 items-center px-5">
      <div className="flex items-center gap-2">
        <GiHamburgerMenu
          size={25}
          className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-300"
          onClick={toggleSidePanel}
        />
        <Link to="/" className="max-w-max mx-auto mb-auto lg:mx-0">
          {/* dark */}
          <div className="flex text-center lg:hidden">
            <GrRobot
              size={25}
              className="text-sky-500"
              onClick={toggleSidePanel}
            />
            <span className="text-neutral-900 text-xl font-semibold dark:text-neutral-200">
              SUSAN-AI
            </span>
          </div>
        </Link>
      </div>

      <div className="relative flex">
        {params.chatId && (
          <IconBtn
            icon={<MdDeleteOutline size={20} />}
            className='lg:hidden '
            onClick={() => {
              const chat = chats.documents.find((chat) => params.chatId === chat.$id);

              if (!chat) {
                console.warn("Chat not found");
                toast.error(`Error: Chat not found.`)
                return
              }

              deleteChat({
                chatId: params.chatId as string,
                title: chat.title,
                submit: submit
              })
            }}
          />
        )}

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

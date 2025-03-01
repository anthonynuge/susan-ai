import React from 'react';
import LogoLink from './LogoLink';
import { FaPlus } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { Link, NavLink, useLoaderData, useSubmit } from 'react-router-dom';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import Footer from './Footer';
import deleteChat from '../utils/deleteChat';

interface SidePanelProps {
  sidePanelOpen: boolean;
  toggleSidePanel: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  sidePanelOpen,
  toggleSidePanel,
}) => {
  const { chats: { documents: chatData }
  } = useLoaderData() || {};

  const submit = useSubmit();

  return (
    <>
      <div className={`sidePanel ${sidePanelOpen ? 'open' : ''}`}>
        <div className="sidePanel-menu">
          <div className="px-3 my-3">
            <LogoLink />
          </div>

          <div className="bg-sky-200 hover:bg-sky-300 dark:bg-sky-700 dark:hover:bg-sky-600 w-[124px] rounded-2xl overflow-hidden transition-colors duration-300 px-3 py-2">
            <Link to={'/'} className="flex items-center">
              <span className="mr-1">
                <FaPlus size={15} onClick={toggleSidePanel} />
              </span>
              <span className="text-sm font-semibold">New Chat</span>
            </Link>
          </div>

          <div className="overflow-y-auto mr-2 px-3">
            <p className="items-center text-xs my-2">History</p>

            {/* <hr className="text-neutral-600" /> */}

            <nav>
              {chatData.map((item) => (
                <div key={item.$id} className="relative group">
                  <NavLink
                    to={item.$id}
                    className={({ isActive }) =>
                      `sidePanel-link flex items-center justify-between transition-colors duration-300
                      ${isActive ? "bg-sky-400/50 dark:bg-sky-800" : ""}`
                    }
                    title={item.title}
                  >
                    <div className='flex items-center gap-1 w-[85%]'>
                      <IoChatbubbleEllipsesOutline size={16} />
                      <span className="truncate text-sm">{item.title}</span>
                      <div className="state-layer"></div>
                    </div>

                    <button
                      className='opacity-0 group-hover:opacity-90 cursor-pointer transition-[colors,opacity] 
                        duration-300 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 hover:dark:text-neutral-200 p-1'

                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        deleteChat({
                          chatId: item.$id,
                          title: item.title,
                          submit: submit
                        })
                      }}
                    >
                      <MdDeleteOutline size={16} className='' />
                    </button>
                  </NavLink>
                </div>
              ))}
            </nav>
          </div>

          <Footer />
        </div >
      </div >

      <div
        className={`overlay ${sidePanelOpen ? 'open' : ''}`}
        onClick={toggleSidePanel}
      ></div>
    </>
  );
};

export default SidePanel;

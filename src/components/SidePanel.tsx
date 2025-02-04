import React from 'react';
import LogoLink from './LogoLink';
import { FaPlus } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import IconBtn from './IconBtn';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import Footer from './Footer';

interface SidePanelProps {
  sidePanelOpen: boolean;
  toggleSidePanel: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  sidePanelOpen,
  toggleSidePanel,
}) => {
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
              <div className="relative group">
                <NavLink
                  to="new-chat"
                  className="sidePanel-link flex items-center"
                  title=""
                >
                  <IoChatbubbleEllipsesOutline size={16} />
                  <span className="truncate text-sm">Start a convo</span>
                  <div className="state-layer"></div>
                </NavLink>

                <IconBtn
                  icon={<MdDeleteOutline />}
                  size="lg"
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 opacity-0 group-hover:opacity-90 transition-[colors,opacity] duration-300 group:focus-within:opacity-90 hidden lg:block"
                />
              </div>
            </nav>
          </div>

          <Footer />
        </div>
      </div>

      <div
        className={`overlay ${sidePanelOpen ? 'open' : ''}`}
        onClick={toggleSidePanel}
      ></div>
    </>
  );
};

export default SidePanel;

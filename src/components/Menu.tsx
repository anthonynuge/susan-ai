import React from 'react';

type MenuProps = {
  children: React.ReactNode;
  classes?: string;
};

const Menu: React.FC<MenuProps> = ({ classes, children }) => {
  return (
    <div
      className={`absolute bg-neutral-300 dark:bg-neutral-800 rounded-lg
    top-10 right-0 min-w-[120px] text-sm max-w-[250px] py-2 z-25 shadow-2xl origin-top-right transition-[transform,opacity,visibility] duration-400 ease-in-out ${classes}`}
    >
      {children}
    </div>
  );
};

export default Menu;

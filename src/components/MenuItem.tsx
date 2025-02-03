import React from 'react';

type MenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ text, ...rest }) => {
  return (
    <button className="px-2" {...rest}>
      <span>{text}</span>
    </button>
  );
};

export default MenuItem;

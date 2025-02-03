import React from 'react';

type UserIconBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
  children: React.ReactNode;
};

const UserIconBtn: React.FC<UserIconBtnProps> = ({
  icon,
  children,
  ...rest
}) => {
  return (
    <button className="" {...rest}>
      {children}
    </button>
  );
};

export default UserIconBtn;

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  classes?: string;
  variant?: 'valid' | 'inValid'; //
  // color?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  classes = '',
  variant = 'valid',
  // color = "primary",
  children,
  ...rest
}) => {
  return (
    <button className={`btn ${variant} ${classes}`} {...rest}>
      {children}
      <div className=""></div>
    </button>
  );
};

export default Button;

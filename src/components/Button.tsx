import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  classes?: string;
  variant?: "primary" | "secondary"; //
  color?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  classes = "",
  variant = "full",
  color = "primary",
  children,
  ...rest
}) => {
  return (
    <button className={`btn ${variant} ${color} ${classes}`} {...rest}>
      {children}
      <div className="state-layer"></div>
    </button>
  );
};

export default Button;

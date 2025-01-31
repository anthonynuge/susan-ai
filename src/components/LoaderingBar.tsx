import React from 'react';

type LoadingBarProps = {
  classes?: string;
  size?: string;
};

const LoaderingBar: React.FC<LoadingBarProps> = ({ classes, size }) => {
  return (
    <div
      className={`${classes} ${size} loadingbar border-4 rounded-full border-r-transparent border-current dark:border-current dark:border-r-transparent h-6 w-6 animate-spin`}
    ></div>
  );
};

export default LoaderingBar;

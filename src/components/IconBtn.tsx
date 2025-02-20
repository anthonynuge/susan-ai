import React from 'react';

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
  className?: string;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const;

const variantClasses = {
  default:
    'text-gray-700 hover:text-gray-900 dark:text-neutral-200 dark:hover:text-neutral-100',
  ghost: 'hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2 transition',
} as const;

const IconBtn: React.FC<IconBtnProps> = ({
  icon,
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center ${sizeClasses[size]} ${
        variantClasses[variant] // ✅ Now TypeScript understands `variant` is valid
      } ${className}`}
      {...props}
    >
      {React.cloneElement(icon, {
        className: `w-auto h-auto ${icon.props.className || ''}`,
      })}
      {/* {icon} */}
    </button>
  );
};

export default IconBtn;

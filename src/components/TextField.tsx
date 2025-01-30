import React from 'react';

// extend and also let type script know there are also input lements also
type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  classes?: string;
  helperTxt?: string;
  label: string; // essential
  name: string; // essential
  placeholder?: string;
  fieldClasses?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  classes,
  helperTxt,
  label,
  name,
  placeholder = ' ',
  fieldClasses = ' ',
  ...rest
}) => {
  return (
    <div className={`input-wrapper flex flex-col mb-2 ${classes}`}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        className={`input-field ${fieldClasses}`}
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
      />

      {helperTxt && <p className="helper">{helperTxt}</p>}
    </div>
  );
};

export default TextField;

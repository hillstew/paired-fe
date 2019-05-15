import React from 'react';
import PropTypes from 'prop-types';

export const Dropdown = ({ options, label, handleChange, required, className }) => {
  const conditionalClassName = className || 'Dropdown--select';
  return (
    <div className='Dropdown--div'>
      <label htmlFor={label} className='Dropdown--label'>
        {label}
        {required && <span>*</span>}
      </label>
      <select
        className={conditionalClassName}
        name={label}
        onChange={event => handleChange(event)}>
        <option value=''>Please choose an option</option>
        {options.map(optionItem => (
          <option key={'option' + optionItem} value={optionItem}>
            {optionItem}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array
};

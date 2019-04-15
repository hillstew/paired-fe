import React from 'react';
import PropTypes from 'prop-types';

export const Dropdown = ({ options, label, handleChange }) => {
  return (
    <div className='Dropdown--div'>
      <label htmlFor={label}>{label}</label>
      <select
        className='Dropdown--select'
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
  options: PropTypes.array,
};
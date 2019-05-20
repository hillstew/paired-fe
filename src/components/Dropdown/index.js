import React from 'react';
import PropTypes from 'prop-types';

export const Dropdown = props => {
  const {
    options,
    label,
    handleChange,
    required,
    className,
    selectedItem
  } = props;
  const conditionalClassName = className || 'Dropdown--select';
  return (
    <div className='Dropdown--div'>
      <label htmlFor={label} className='Dropdown--label'>
        {label}
        {required && <span className='Dropdown--asterisk'>*</span>}
      </label>
      <select
        className={conditionalClassName}
        name={label}
        onChange={event => handleChange(event)}
        value={selectedItem}
      >
        <option value=''>Please choose an option</option>
        {options.map(optionItem => (
          <option
            key={'option' + optionItem}
            value={optionItem}
          >
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

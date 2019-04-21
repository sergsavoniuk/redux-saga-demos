import React from 'react';
import { string, bool, func } from 'prop-types';

import useTimeField from './hooks/useTimeField';
import { Wrapper, TimeInput } from './TimeField.components';

function TimeField({ name, label = '', value, disabled = false, onChange }) {
  const { inputRef, handleKeyDown, handleChange } = useTimeField(
    name,
    onChange,
  );

  return (
    <Wrapper>
      <TimeInput
        ref={inputRef}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span>{label}</span>
    </Wrapper>
  );
}

TimeField.propTypes = {
  name: string.isRequired,
  label: string,
  value: string.isRequired,
  disabled: bool,
  onChange: func.isRequired,
};

export default TimeField;

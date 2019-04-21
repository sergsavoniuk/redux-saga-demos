import React from 'react';

import { Wrapper, TimeInput } from './TimeField.components';
import useTimeField from './hooks/useTimeField';

function TimeField({ name, label, value, disabled, onChange }) {
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

export default TimeField;

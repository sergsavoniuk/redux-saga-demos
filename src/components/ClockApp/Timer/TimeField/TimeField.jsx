import React, { useState, useEffect, useRef } from 'react';

import { TimeInput } from './TimeField.components';

const BACKSPACE_CODE = 8;
const DELETE_CODE = 46;
const CODE_OF_0 = 48;
const CODE_OF_9 = 57;

function TimeField({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  function handleKeyDown(event) {
    console.log(event.target.selectionStart);
    event.target.setSelectionRange(3, 4);
    const keyId = event.keyCode;
    switch (keyId) {
      case BACKSPACE_CODE:
      case DELETE_CODE: {
        // onChange()
        break;
      }
      case keyId < CODE_OF_0 && keyId > CODE_OF_9: {
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  }

  function handleChange(event) {
    // debugger;
    // inputRef.current.selectionStart = inputRef.current.selectionEnd = 5;
    setValue(event.target.value);
    // onChange(event.target.value);
  }

  useEffect(() => {
    inputRef.current.selectionStart = 1;
    inputRef.current.selectionEnd = 1;
  });

  return (
    <TimeInput
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default TimeField;

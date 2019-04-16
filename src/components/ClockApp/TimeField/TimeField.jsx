import React, { useEffect, useRef } from 'react';

import { Wrapper, TimeInput } from './TimeField.components';

const BACKSPACE_CODE = 8;
const DELETE_CODE = 46;
const CODE_OF_0 = 48;
const CODE_OF_9 = 57;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

function TimeField({ name, label, value, disabled, status, onChange }) {
  const inputRef = useRef(null);
  const cursorPosition = useRef(null);
  const backspacePressed = useRef(null);
  const deletePressed = useRef(null);

  function handleKeyDown(event) {
    const keyId = event.keyCode;

    if (keyId === BACKSPACE_CODE) {
      backspacePressed.current = true;
    } else if (keyId === DELETE_CODE) {
      deletePressed.current = true;
    } else if (
      (keyId < CODE_OF_0 || keyId > CODE_OF_9) &&
      (keyId !== LEFT_ARROW && keyId !== RIGHT_ARROW)
    ) {
      backspacePressed.current = false;
      deletePressed.current = false;
      event.preventDefault();
    } else {
      backspacePressed.current = false;
      deletePressed.current = false;
    }
  }

  function handleChange(event) {
    const action = {
      type: `SET_${name.toUpperCase()}`,
      payload: {
        name,
      },
    };
    const newValue = event.target.value;
    cursorPosition.current = event.target.selectionStart;

    if (backspacePressed.current === true || deletePressed.current === true) {
      if (cursorPosition.current === 0) {
        action.payload.value = '0' + newValue;
        onChange(action);
      } else {
        action.payload.value = newValue + '0';
        onChange(action);
      }
    } else if (cursorPosition.current < 3) {
      action.payload.value =
        newValue.slice(0, cursorPosition.current) +
        newValue.slice(cursorPosition.current + 1);
      onChange(action);
    }
  }

  useEffect(() => {
    inputRef.current.selectionStart = inputRef.current.selectionEnd =
      cursorPosition.current;
  });

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

import React, { memo, useEffect, useRef } from 'react';

import { Wrapper, TimeInput } from './TimeField.components';

const BACKSPACE_CODE = 8;
const DELETE_CODE = 46;
const CODE_OF_0 = 48;
const CODE_OF_9 = 57;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

function TimeField({ name, value, onChange }) {
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
    const newValue = event.target.value;
    cursorPosition.current = event.target.selectionStart;

    if (backspacePressed.current === true || deletePressed.current === true) {
      if (cursorPosition.current === 0) {
        onChange('0' + newValue);
      } else {
        onChange(newValue + '0');
      }
    } else if (cursorPosition.current < 3) {
      onChange(
        newValue.slice(0, cursorPosition.current) +
          newValue.slice(cursorPosition.current + 1),
      );
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
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span>{name}</span>
    </Wrapper>
  );
}

export default memo(TimeField);

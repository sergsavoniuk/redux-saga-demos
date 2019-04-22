import { useEffect, useRef } from 'react';

const CHARACTERS_CODES = {
  BACKSPACE: 8,
  DELETE: 46,
  NUMBER_0: 48,
  NUMBER_9: 57,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
};

export default function useTimeField(name, onChange) {
  const inputRef = useRef(null);
  const cursorPositionRef = useRef(null);
  const backspacePressed = useRef(null);
  const deletePressed = useRef(null);

  function resetBackspaceAndDeletePressed() {
    backspacePressed.current = false;
    deletePressed.current = false;
  }

  function handleKeyDown(event) {
    const { keyCode } = event;

    if (keyCode === CHARACTERS_CODES.BACKSPACE) {
      backspacePressed.current = true;
    } else if (keyCode === CHARACTERS_CODES.DELETE) {
      deletePressed.current = true;
    } else if (
      (keyCode < CHARACTERS_CODES.NUMBER_0 ||
        keyCode > CHARACTERS_CODES.NUMBER_9) &&
      (keyCode !== CHARACTERS_CODES.LEFT_ARROW &&
        keyCode !== CHARACTERS_CODES.RIGHT_ARROW)
    ) {
      event.preventDefault();
      resetBackspaceAndDeletePressed();
    } else {
      resetBackspaceAndDeletePressed();
    }
  }

  function handleChange({ target }) {
    const action = {
      type: `SET_${name.toUpperCase()}`,
      payload: {
        name,
      },
    };

    const newValue = target.value;
    cursorPositionRef.current = target.selectionStart;

    if (backspacePressed.current === true || deletePressed.current === true) {
      if (cursorPositionRef.current === 0) {
        action.payload.value = '0' + newValue;
        onChange(action);
      } else {
        action.payload.value = newValue + '0';
        onChange(action);
      }
    } else if (cursorPositionRef.current < 3) {
      action.payload.value =
        newValue.slice(0, cursorPositionRef.current) +
        newValue.slice(cursorPositionRef.current + 1);
      onChange(action);
    }
  }

  useEffect(
    function updateCursorPosition() {
      const node = inputRef.current;

      if (node) {
        node.selectionStart = node.selectionEnd = cursorPositionRef.current;
      }
    },
    [inputRef.current, cursorPositionRef.current],
  );

  return {
    inputRef,
    handleKeyDown,
    handleChange,
  };
}

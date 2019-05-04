import { memo } from 'react';

export default function withMemo(Component, checkedProps) {
  function areEqual(prevProps, nextProps) {
    let isEqual = true;
    for (const checkedProp of checkedProps) {
      if (
        JSON.stringify(prevProps[checkedProp]) !==
        JSON.stringify(nextProps[checkedProp])
      ) {
        isEqual = false;
        break;
      }
    }
    return isEqual;
  }

  return memo(Component, areEqual);
}

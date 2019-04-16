import React from 'react';

import {
  Wrapper,
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
  Label,
} from './Checkbox.components';

export default function Checkbox({ checked = false, label, onChange }) {
  return (
    <Wrapper>
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} onChange={onChange} />
        <StyledCheckbox checked={checked}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      <Label>{label}</Label>
    </Wrapper>
  );
}

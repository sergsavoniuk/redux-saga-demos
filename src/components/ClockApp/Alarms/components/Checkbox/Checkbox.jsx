import React from 'react';
import { string, bool, func } from 'prop-types';

import {
  Wrapper,
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
  Label,
} from './Checkbox.components';

function Checkbox({
  name,
  label = '',
  disabled = false,
  checked = false,
  onChange,
}) {
  return (
    <Wrapper>
      <CheckboxContainer>
        <HiddenCheckbox
          checked={checked}
          name={name}
          disabled={disabled}
          onChange={onChange}
        />
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

Checkbox.propTypes = {
  name: string.isRequired,
  label: string,
  disabled: bool,
  checked: bool,
  onChange: func.isRequired,
};

export default Checkbox;

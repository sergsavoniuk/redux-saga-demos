import React from 'react';
import { mount } from 'enzyme';

import Loader from 'components/Loader';
import { AuthForm } from './AuthForm';
import { Input, SubmitButton, Form, ErrorMessage } from './AuthForm.components';

describe('<AuthForm />', () => {
  const username = 'testUser';
  const loginUser = jest.fn();

  function setup() {
    const props = {
      error: null,
      loading: false,
      login: loginUser,
    };

    const wrapper = mount(<AuthForm {...props} />);

    const find = wrapper.find.bind(wrapper);
    const setProps = wrapper.setProps.bind(wrapper);

    return {
      find,
      setProps,
    };
  }

  afterEach(() => {
    loginUser.mockClear();
  });

  test('renders auth form, handles input change and then submit form - success case', () => {
    const { find, setProps } = setup();

    expect(find(ErrorMessage)).toHaveLength(0);

    let submitButton = find(SubmitButton);
    expect(submitButton.prop('disabled')).toBe(true);

    // Testing styled component
    expect(submitButton).toHaveStyleRule('background-color', '#ffffff1a');
    expect(submitButton).toHaveStyleRule('border', 'none', {
      modifier: ':hover',
    });

    expect(submitButton.text()).toMatch('Continue');

    let input = find(Input);
    input.simulate('change', { target: { value: username } });

    input = find(Input);
    expect(input.prop('value')).toMatch(username);

    submitButton = find(SubmitButton);
    expect(submitButton.prop('disabled')).toBe(false);

    find(Form).simulate('submit', { preventDefault() {} });
    expect(loginUser).toHaveBeenCalled();
    expect(loginUser).toHaveBeenCalledWith(username);

    setProps({ loading: true });
    submitButton = find(SubmitButton);
    expect(submitButton.prop('disabled')).toBe(true);
    expect(submitButton.find(Loader)).toHaveLength(1);
  });

  test('renders auth form, handles input change and then submit form - failure case', () => {
    const { find, setProps } = setup();

    expect(find(ErrorMessage)).toHaveLength(0);

    let input = find(Input);
    input.simulate('change', { target: { value: username } });

    find(Form).simulate('submit', { preventDefault() {} });
    expect(loginUser).toHaveBeenCalled();
    expect(loginUser).toHaveBeenCalledWith(username);

    setProps({ error: 'User not found' });
    expect(find(ErrorMessage)).toHaveLength(1);
    expect(find(ErrorMessage).text()).toMatch('User not found');

    input = find(Input);
    expect(input.prop('value')).toMatch('');
  });
});

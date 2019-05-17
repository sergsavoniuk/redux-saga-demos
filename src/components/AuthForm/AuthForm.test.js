import React from 'react';
import { shallow, mount } from 'enzyme';

import Loader from 'components/Loader';
import { AuthForm } from './AuthForm';
import { Input, SubmitButton, Form, ErrorMessage } from './AuthForm.components';

describe('Testing AuthForm component', () => {
  let props;
  const username = 'testUser';

  beforeEach(() => {
    props = {
      error: null,
      loading: false,
      login: jest.fn(),
    };
  });

  afterEach(() => {
    props.login.mockClear();
  });

  test('renders auth form, handles input change and then submit form - success', () => {
    const wrapper = mount(<AuthForm {...props} />);

    const find = wrapper.find.bind(wrapper);
    const setProps = wrapper.setProps.bind(wrapper);

    expect(find(ErrorMessage)).toHaveLength(0);

    let submitButton = find(SubmitButton);
    expect(submitButton.props().disabled).toBe(true);

    // Testing styled component
    expect(find(SubmitButton)).toHaveStyleRule('background-color', '#ffffff1a');
    expect(find(SubmitButton)).toHaveStyleRule('border', 'none', {
      modifier: ':hover',
    });

    expect(submitButton.text()).toMatch('Continue');

    let input = find(Input);
    input.simulate('change', { target: { value: username } });

    input = find(Input);
    expect(input.props().value).toMatch(username);

    submitButton = find(SubmitButton);
    expect(submitButton.props().disabled).toBe(false);

    find(Form).simulate('submit', { preventDefault: jest.fn() });
    setProps({ loading: true });
    submitButton = find(SubmitButton);
    expect(submitButton.props().disabled).toBe(true);
    expect(submitButton.find(Loader)).toHaveLength(1);

    expect(props.login).toHaveBeenCalled();
    expect(props.login).toHaveBeenCalledWith(username);

    setProps({ loading: false });
    submitButton = find(SubmitButton);
    expect(submitButton.props().disabled).toBe(true);
    expect(submitButton.find(Loader)).toHaveLength(0);
  });

  test('renders auth form, handles input change and then submit form - failure', () => {
    const wrapper = shallow(<AuthForm {...props} />);

    const find = wrapper.find.bind(wrapper);
    const setProps = wrapper.setProps.bind(wrapper);

    expect(find(ErrorMessage)).toHaveLength(0);

    let input = find(Input);
    input.simulate('change', { target: { value: username } });

    find(Form).simulate('submit', { preventDefault: jest.fn() });
    setProps({ error: 'User not found' });

    expect(find(ErrorMessage)).toHaveLength(1);
    expect(find(ErrorMessage).text()).toMatch('User not found');

    expect(props.login).toHaveBeenCalled();
    expect(props.login).toHaveBeenCalledWith(username);

    input = find(Input);
    expect(input.props().value).toMatch('');
  });
});

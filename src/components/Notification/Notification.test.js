import React from 'react';
import { shallow } from 'enzyme';

import { Notification } from './Notification';
import { Title, Body, CloseButton } from './Notification.components';

describe('<Notification />', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal" class="hidden"></div>
      <div id="root"></div>
    `;
  });

  test('should return null if no notifications', () => {
    const props = {
      notification: null,
      closeNotification: jest.fn(),
    };

    const wrapper = shallow(<Notification {...props} />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  test('should render a notification when notification object is not empty', () => {
    const props = {
      notification: { id: 1, title: '', body: '', mediaSrc: '' },
      closeNotification: jest.fn(),
    };

    const wrapper = shallow(<Notification {...props} />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
    expect(wrapper.find(Title)).toHaveLength(1);
    expect(wrapper.find(Body)).toHaveLength(1);
    expect(wrapper.find(CloseButton)).toHaveLength(1);
  });

  test('should close a notification when close button was clicked', () => {
    const props = {
      notification: { id: 1, title: '', body: '', mediaSrc: '' },
      closeNotification: jest.fn(),
    };

    const wrapper = shallow(<Notification {...props} />);
    expect(wrapper.isEmptyRender()).toBeFalsy();

    wrapper.find(CloseButton).simulate('click');
    expect(props.closeNotification).toHaveBeenCalled();

    wrapper.setProps({ notification: null });
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });
});

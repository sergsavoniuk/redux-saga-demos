import React from 'react';
import { shallow } from 'enzyme';

import AppCard from './AppCard';
import { ROUTES } from 'constants/routes';

const { ClockApp, CardGameApp } = ROUTES;

describe('<AppCard />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<AppCard />);

    expect(wrapper.children().length).toBeGreaterThanOrEqual(4);
    expect(wrapper.children().find({ to: ClockApp })).toHaveLength(1);
    expect(wrapper.children().find({ to: CardGameApp.Root })).toHaveLength(1);
  });
});

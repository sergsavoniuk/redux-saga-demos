import React from 'react';
import { shallow } from 'enzyme';

import InstructionsCard from './InstructionsCard';

describe('Testing InstructionsCard component', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'I',
      isFlipped: false,
      onCardClick: jest.fn(),
    };
  });

  test('renders correctly unflipped card', () => {
    const wrapper = shallow(<InstructionsCard {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('renders correctly flipped card', () => {
    props.isFlipped = true;

    const wrapper = shallow(<InstructionsCard {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should flip card after a click', () => {
    const wrapper = shallow(<InstructionsCard {...props} />);

    wrapper.simulate('click');
    expect(props.onCardClick).toHaveBeenCalledTimes(1);
    wrapper.setProps({ isFlipped: true });
    expect(wrapper.contains(<h2>Instructions</h2>)).toEqual(true);

    wrapper.simulate('click');
    expect(props.onCardClick).toHaveBeenCalledTimes(2);
    wrapper.setProps({ isFlipped: false });
    expect(wrapper.text()).toMatch(props.name);
  });
});

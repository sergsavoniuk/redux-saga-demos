import React from 'react';
import { shallow } from 'enzyme';

import PlayCard from './PlayCard';
import LevelButton from './LevelButton';

describe('Testing PlayCard component', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'P',
      isFlipped: false,
      onCardClick: jest.fn(),
    };
  });

  test('renders correctly unflipped card', () => {
    const wrapper = shallow(<PlayCard {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('renders correctly flipped card', () => {
    props.isFlipped = true;

    const wrapper = shallow(<PlayCard {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should flip card after a click', () => {
    const wrapper = shallow(<PlayCard {...props} />);

    wrapper.simulate('click');
    expect(props.onCardClick).toHaveBeenCalledTimes(1);
    wrapper.setProps({ isFlipped: true });
    expect(wrapper.find(LevelButton)).toHaveLength(3);

    wrapper.simulate('click');
    expect(props.onCardClick).toHaveBeenCalledTimes(2);
    wrapper.setProps({ isFlipped: false });
    expect(wrapper.text()).toMatch(props.name);
  });
});

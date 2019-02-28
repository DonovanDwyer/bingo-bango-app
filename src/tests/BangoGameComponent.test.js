import React from 'react';
import BangoGameComponent from '../components/BangoGameComponent';
import {shuffleArray} from '../components/BangoGameComponent';
import { shallow } from 'enzyme';

test("renders without crashing", () => {
  shallow(<BangoGameComponent />);
});

it("shuffles an array of numbers properly", () => {
  const array = [1,2,3,4,5,6,7];
  expect(shuffleArray(array)).not.toBe([1,2,3,4,5,6,7]);
});

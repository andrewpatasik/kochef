/* eslint-disable no-undef */
import initState from '../data/initState';

test('stateOne returns zero', () => {
  const stateOne = initState(0);
  expect(stateOne.getState()).toEqual(0);
});

test('stateOne change value to 1', () => {
  const state = initState(0);
  state.setState(1);
  expect(state.getState()).toEqual(1);
});

test('stateOne value equals to [1, 2, 3]', () => {
  const array = [1, 2, 3];
  const state = initState(0);
  state.setState([...array]);
  expect(state.getState()).toEqual([1, 2, 3]);
});

test('stateOne value equals to [1, 2, 3, 4, 5] after concat', () => {
  const array = [4, 5];
  const state = initState([1, 2, 3]);
  state.setState([...state.getState().concat(array)]);
  expect(state.getState()).toEqual([1, 2, 3, 4, 5]);
});

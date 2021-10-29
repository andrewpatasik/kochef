/* eslint-disable no-undef */
import useState from '../data/useState';

describe('useState', () => {
  test('useState returns an array of two value', () => {
    const myState = useState(1);
    expect(myState.length).toEqual(2);
  });

  test('setter change value from 1 to 3', () => {
    const [myState, mySetter] = useState(1);
    mySetter(3);
    expect(myState()).toEqual(3);
  });

  test('useState takes object and return object', () => {
    const [myState, mySetter] = useState({ city: 'pinrang' });
    expect(myState()).toEqual({ city: 'pinrang' });

    mySetter({ city: 'jakarta' });
    expect(myState().city).toEqual('jakarta');
  });

  test('useState takes array and return concated array', () => {
    const [myState, mySetter] = useState([1, 2, 3]);
    mySetter([...myState(), 4, 5]);
    expect(myState()).toEqual([1, 2, 3, 4, 5]);

    const [myState2, mySetter2] = useState([1, 2, 3]);
    mySetter2(myState2().concat([4, 5]));
    expect(myState2()).toEqual([1, 2, 3, 4, 5]);
  });
});

// should be instantiated
// should takes one parameter as initial state
// should returns state value and a method to set the state
// should be modular

// should be instantiated
// should takes one parameter as initial state
// should returns state value and a method to set the state
// should be modular

const initState = (initValue) => {
  let state = initValue;

  const getState = () => state;

  const setState = (newValue) => {
    state = newValue;
  };

  return { getState, setState };
};

export default initState;

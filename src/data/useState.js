const useState = (initValue) => {
  let state = initValue;

  const getState = () => state;

  const setState = (newValue) => {
    state = newValue;
    return state;
  };

  return [getState, setState];
};

export default useState;

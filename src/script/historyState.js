const historyState = (() => {
  const historyStack = [];

  const getState = () => historyStack.pop();
  const setState = (state) => historyStack.push(state);
  const getStack = () => historyStack;

  return { getState, setState, getStack };
})();

export default historyState;

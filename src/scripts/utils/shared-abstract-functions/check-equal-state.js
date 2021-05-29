const checkEqualStates = (oldState, newState) => (
  Object.keys(newState).every(
    (key) => newState[key] === oldState[key],
  )
);

export default checkEqualStates;

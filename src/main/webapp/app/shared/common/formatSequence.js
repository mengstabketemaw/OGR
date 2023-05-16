export const formatSequence = arr => {
  const result = [0];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i].state.id);
    if (i === arr.length - 1) {
      result.push(arr[i].toState.id);
    }
  }
  return result;
};

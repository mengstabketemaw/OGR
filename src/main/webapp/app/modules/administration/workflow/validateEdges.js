export const ValidateEdges = arr => {
  let result = [];

  const first = arr.find(item => !arr.some(otherItem => otherItem.target === item.source));

  if (first) {
    result.push(first);

    for (let i = 0; i < arr.length - 1; i++) {
      const currentItem = result[i];
      const nextItem = arr.find(item => item.source === currentItem.target);

      if (nextItem) {
        result.push(nextItem);
      } else {
        result = [];
        break;
      }
    }
  } else {
    result = [];
  }
  return result;
};

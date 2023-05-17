export const ValidateEdges = arr => {
  let result = [];

  // Find the first item by searching for an object with a source value that does not appear as a target value in any other object
  const first = arr.find(item => !arr.some(otherItem => otherItem.target === item.source));

  if (first) {
    result.push(first);

    // Iterate over the remaining items and add them to the result array in the correct order
    for (let i = 0; i < arr.length - 1; i++) {
      const currentItem = result[i];
      const nextItem = arr.find(item => item.source === currentItem.target);

      if (nextItem) {
        result.push(nextItem);
      } else {
        // If no next item is found, set the result to null and exit the loop
        result = [];
        break;
      }
    }
  } else {
    // If no first item is found, set the result to null
    result = [];
  }
  return result;
};
